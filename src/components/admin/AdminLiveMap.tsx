import React, { useState, useEffect, useMemo } from 'react';
import { 
  Compass, 
  RefreshCw, 
  Layers, 
  MapPin, 
  Flame, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Users, 
  Car, 
  Zap, 
  Clock, 
  Send, 
  AlertTriangle, 
  CheckCircle2, 
  Sliders, 
  Radio, 
  BarChart3,
  Sun,
  Moon,
  Sunset
} from 'lucide-react';
import { InteractiveMap } from '../common/InteractiveMap';
import { useRide } from '../../context/RideContext';
import { DemandHeatmapZone } from '../../types';
import { INITIAL_DEMAND_ZONES, TIME_PRESETS, TimeOfDayPreset, simulateHeatmapTick } from '../../data/demandHeatmapData';

export const AdminLiveMap: React.FC = () => {
  const { activeRide, driver, showNotification } = useRide();

  // Heatmap State
  const [heatmapZones, setHeatmapZones] = useState<DemandHeatmapZone[]>(INITIAL_DEMAND_ZONES);
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>(INITIAL_DEMAND_ZONES[0].id);
  const [isHeatmapVisible, setIsHeatmapVisible] = useState<boolean>(true);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [selectedTimePreset, setSelectedTimePreset] = useState<TimeOfDayPreset>('evening_peak');
  const [isLiveSimulating, setIsLiveSimulating] = useState<boolean>(true);
  const [lastTickTime, setLastTickTime] = useState<string>('Just now');
  const [rebalancedZones, setRebalancedZones] = useState<Record<string, number>>({});

  // Real-time Mock Streaming Tick
  useEffect(() => {
    if (!isLiveSimulating) return;

    const interval = setInterval(() => {
      setHeatmapZones(prev => simulateHeatmapTick(prev, selectedTimePreset));
      const now = new Date();
      setLastTickTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 4000);

    return () => clearInterval(interval);
  }, [isLiveSimulating, selectedTimePreset]);

  // Selected Zone object
  const activeZone = useMemo(() => {
    return heatmapZones.find(z => z.id === selectedZoneId) || heatmapZones[0];
  }, [heatmapZones, selectedZoneId]);

  // Filtered zones for list/ranking
  const filteredZones = useMemo(() => {
    return heatmapZones.filter(z => {
      if (activeCategoryFilter === 'all') return true;
      if (activeCategoryFilter === 'surge') return z.surgeMultiplier >= 1.6;
      if (activeCategoryFilter === 'deficit') return z.activeRequests / (z.availableDrivers * 3.5) > 1.4;
      return z.category === activeCategoryFilter;
    }).sort((a, b) => b.surgeMultiplier - a.surgeMultiplier);
  }, [heatmapZones, activeCategoryFilter]);

  // Aggregate Metrics
  const aggregateMetrics = useMemo(() => {
    const totalRequests = heatmapZones.reduce((sum, z) => sum + z.activeRequests, 0);
    const totalDriversInZones = heatmapZones.reduce((sum, z) => sum + z.availableDrivers, 0);
    const highestSurgeZone = [...heatmapZones].sort((a, b) => b.surgeMultiplier - a.surgeMultiplier)[0];
    const avgWait = (heatmapZones.reduce((sum, z) => sum + z.avgWaitTimeMin, 0) / heatmapZones.length).toFixed(1);

    return {
      totalRequests,
      totalDriversInZones,
      highestSurgeZone,
      avgWait
    };
  }, [heatmapZones]);

  // Trigger Driver Rebalance Incentive
  const handleBroadcastRebalance = (zone: DemandHeatmapZone) => {
    const bonus = zone.recommendedIncentive || 50;
    
    // Simulate immediate driver response
    setHeatmapZones(prev => prev.map(z => {
      if (z.id === zone.id) {
        return {
          ...z,
          availableDrivers: z.availableDrivers + 6,
          surgeMultiplier: Math.max(1.1, Number((z.surgeMultiplier - 0.3).toFixed(1))),
          avgWaitTimeMin: Math.max(3.0, Number((z.avgWaitTimeMin - 2.2).toFixed(1)))
        };
      }
      return z;
    }));

    setRebalancedZones(prev => ({ ...prev, [zone.id]: (prev[zone.id] || 0) + 1 }));

    showNotification(
      `Fleet Rebalance Broadcasted!`,
      `Broadcasted +₱${bonus} surge incentive to 42 nearby idle drivers for ${zone.name}. ETA drop expected in 3 mins.`,
      'success'
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Top Header & Simulation Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-white font-display">Live Fleet Telemetry & Demand Heatmap</h2>
            <span className="flex items-center gap-1 text-[10px] bg-red-500/10 text-red-400 font-mono font-bold px-2.5 py-0.5 rounded-full border border-red-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
              REAL-TIME MOCK FEED
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Monitor real-time passenger request clusters, surge multipliers, and driver density across Metro Manila
          </p>
        </div>

        {/* Global Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Time of Day Preset Selector */}
          <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl p-1 text-xs font-mono">
            {TIME_PRESETS.map(preset => {
              const isSelected = selectedTimePreset === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => {
                    setSelectedTimePreset(preset.id);
                    setHeatmapZones(prev => simulateHeatmapTick(prev, preset.id));
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-amber-500 text-black shadow-md' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title={`${preset.label} (${preset.timeRange}): ${preset.desc}`}
                >
                  {preset.id === 'morning_rush' && '🌅 Morning'}
                  {preset.id === 'afternoon_steady' && '☀️ Midday'}
                  {preset.id === 'evening_peak' && '🌆 Evening'}
                  {preset.id === 'late_night' && '🌙 Night'}
                </button>
              );
            })}
          </div>

          {/* Heatmap Visibility Toggle */}
          <button
            id="btn-toggle-heatmap-overlay"
            onClick={() => setIsHeatmapVisible(prev => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold font-mono border transition-all cursor-pointer ${
              isHeatmapVisible
                ? 'bg-amber-500 text-black border-amber-400 shadow-md'
                : 'bg-zinc-900 hover:bg-zinc-800 text-slate-300 border-zinc-800'
            }`}
          >
            <Flame className={`w-3.5 h-3.5 ${isHeatmapVisible ? 'fill-black text-black' : 'text-slate-400'}`} />
            <span>{isHeatmapVisible ? 'Heatmap ON' : 'Heatmap OFF'}</span>
          </button>

          {/* Live Pause/Play Simulation */}
          <button
            onClick={() => setIsLiveSimulating(prev => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold font-mono border transition-colors cursor-pointer ${
              isLiveSimulating 
                ? 'bg-zinc-800 text-zinc-200 border-zinc-700' 
                : 'bg-zinc-900 text-slate-400 border-zinc-800'
            }`}
            title="Toggle simulated telemetry heartbeat"
          >
            <Radio className={`w-3.5 h-3.5 ${isLiveSimulating ? 'text-zinc-300' : 'text-slate-500'}`} />
            <span>{isLiveSimulating ? 'Streaming (4s)' : 'Paused'}</span>
          </button>
        </div>
      </div>

      {/* Aggregate Telemetry Metrics Header */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-zinc-900/90 border border-zinc-800 p-3.5 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-400 font-bold uppercase">Active Demand Flow</span>
            <Flame className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-xl font-black text-white font-mono mt-1">
            {aggregateMetrics.totalRequests.toLocaleString()}{' '}
            <span className="text-xs text-slate-400 font-normal">req/min</span>
          </p>
          <p className="text-[10px] text-slate-500 font-mono mt-0.5">Across {heatmapZones.length} tracked Metro hubs</p>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 p-3.5 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-400 font-bold uppercase">Peak Surge Hub</span>
            <Zap className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-xl font-black text-amber-400 font-mono mt-1">
            {aggregateMetrics.highestSurgeZone.surgeMultiplier.toFixed(1)}x Surge
          </p>
          <p className="text-[10px] text-slate-400 font-mono truncate mt-0.5">{aggregateMetrics.highestSurgeZone.name}</p>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 p-3.5 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-400 font-bold uppercase">Drivers in Clusters</span>
            <Car className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-xl font-black text-emerald-400 font-mono mt-1">
            {aggregateMetrics.totalDriversInZones}{' '}
            <span className="text-xs text-slate-400 font-normal">available</span>
          </p>
          <p className="text-[10px] text-slate-500 font-mono mt-0.5">2,315 Total fleet deployed</p>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 p-3.5 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-400 font-bold uppercase">Avg Regional Wait</span>
            <Clock className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-xl font-black text-white font-mono mt-1">
            {aggregateMetrics.avgWait}{' '}
            <span className="text-xs text-slate-400 font-normal">mins ETA</span>
          </p>
          <p className="text-[10px] text-emerald-400 font-mono mt-0.5">Within target dispatch SLA</p>
        </div>
      </div>

      {/* Main Map & Interactive Zone Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Map Canvas (8 Cols) */}
        <div className="lg:col-span-8 bg-zinc-950 border border-zinc-800 rounded-3xl p-4 flex flex-col gap-3 shadow-2xl relative overflow-hidden">
          {/* Map Sub-Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 z-10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-xs font-mono font-bold text-white">
                Interactive Heatmap Canvas
              </span>
              <span className="text-[10px] bg-zinc-900 border border-zinc-800 text-slate-400 px-2 py-0.5 rounded-md font-mono">
                Updated: {lastTickTime}
              </span>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-full">
              {[
                { id: 'all', label: 'All (10)' },
                { id: 'surge', label: '⚡ High Surge' },
                { id: 'deficit', label: '⚠️ Deficit Hubs' },
                { id: 'commercial', label: 'CBDs' },
                { id: 'airport', label: 'Airports' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setActiveCategoryFilter(f.id)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-colors cursor-pointer whitespace-nowrap ${
                    activeCategoryFilter === f.id
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-zinc-900 hover:bg-zinc-800 text-slate-400 border border-zinc-800'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Leaflet Map with Heatmap Overlay */}
          <div className="w-full relative rounded-2xl overflow-hidden min-h-[520px]">
            <InteractiveMap
              pickup={activeRide?.pickup}
              dropoff={activeRide?.dropoff}
              routeProgress={activeRide?.routeProgress}
              driverName={driver.name}
              driverPlate={driver.vehicle.plateNumber}
              height="h-[520px]"
              showHeatmap={isHeatmapVisible}
              heatmapZones={heatmapZones}
              selectedHeatmapZoneId={selectedZoneId}
              onSelectHeatmapZone={(zone) => setSelectedZoneId(zone.id)}
              showHeatmapLegend={true}
            />
          </div>

          {/* Heatmap Quick Tips / Information */}
          <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="text-amber-400 font-bold">💡 Tip:</span>
              <span>Click on any hotzone circle or badge on the map to inspect live driver ratios & trigger rebalance bonuses.</span>
            </div>
            <button
              onClick={() => setSelectedZoneId(heatmapZones[0].id)}
              className="text-amber-400 hover:text-amber-300 font-bold underline text-[11px] whitespace-nowrap cursor-pointer"
            >
              Reset to Primary CBD
            </button>
          </div>
        </div>

        {/* Right Column: Zone Telemetry Inspector & Hotspots Leaderboard (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Active Inspected Zone Detail Card */}
          {activeZone && (
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-amber-500/40 rounded-3xl p-5 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none"></div>

              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider px-2 py-0.5 bg-amber-500/10 rounded-md border border-amber-500/20">
                    {activeZone.category} hub • {activeZone.city}
                  </span>
                  <h3 className="text-base font-black text-white font-display mt-1.5 leading-tight">
                    {activeZone.name}
                  </h3>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-lg font-black text-amber-400 font-mono flex items-center justify-end gap-1">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>{activeZone.surgeMultiplier.toFixed(1)}x</span>
                  </div>
                  <span className="text-[9px] text-slate-400 font-mono">Surge Dynamic</span>
                </div>
              </div>

              {/* Real-time stats grid for selected zone */}
              <div className="grid grid-cols-2 gap-2.5 my-4">
                <div className="bg-zinc-950/80 border border-zinc-800 p-2.5 rounded-xl font-mono">
                  <div className="flex items-center justify-between text-slate-400 text-[10px]">
                    <span>Active Requests</span>
                    {activeZone.trend === 'up' ? (
                      <TrendingUp className="w-3 h-3 text-rose-400" />
                    ) : activeZone.trend === 'down' ? (
                      <TrendingDown className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Minus className="w-3 h-3 text-slate-400" />
                    )}
                  </div>
                  <p className="text-base font-black text-white mt-0.5">
                    {activeZone.activeRequests}{' '}
                    <span className="text-[10px] text-slate-400 font-normal">req/min</span>
                  </p>
                </div>

                <div className="bg-zinc-950/80 border border-zinc-800 p-2.5 rounded-xl font-mono">
                  <div className="flex items-center justify-between text-slate-400 text-[10px]">
                    <span>Available Drivers</span>
                    <Car className="w-3 h-3 text-slate-400" />
                  </div>
                  <p className="text-base font-black text-emerald-400 mt-0.5">
                    {activeZone.availableDrivers}{' '}
                    <span className="text-[10px] text-slate-400 font-normal">units</span>
                  </p>
                </div>

                <div className="bg-zinc-950/80 border border-zinc-800 p-2.5 rounded-xl font-mono">
                  <div className="flex items-center justify-between text-slate-400 text-[10px]">
                    <span>Avg Passenger Wait</span>
                    <Clock className="w-3 h-3 text-slate-400" />
                  </div>
                  <p className="text-base font-black text-white mt-0.5">
                    {activeZone.avgWaitTimeMin}{' '}
                    <span className="text-[10px] text-slate-400 font-normal">mins</span>
                  </p>
                </div>

                <div className="bg-zinc-950/80 border border-zinc-800 p-2.5 rounded-xl font-mono">
                  <div className="flex items-center justify-between text-slate-400 text-[10px]">
                    <span>Demand Deficit</span>
                    <AlertTriangle className="w-3 h-3 text-slate-400" />
                  </div>
                  <p className="text-base font-black text-amber-400 mt-0.5">
                    {Math.round((activeZone.activeRequests / (activeZone.availableDrivers * 3.5)) * 100)}%
                  </p>
                </div>
              </div>

              {/* Demand Intensity Meter */}
              <div className="space-y-1.5 mb-4 font-mono text-xs">
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Relative Density Intensity</span>
                  <span className="text-amber-400 font-bold">{Math.round(activeZone.intensity * 100)}%</span>
                </div>
                <div className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 transition-all duration-500"
                    style={{ width: `${Math.round(activeZone.intensity * 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Rebalance Incentive Dispatch Action */}
              <div className="pt-2 border-t border-zinc-800">
                <button
                  id={`btn-rebalance-${activeZone.id}`}
                  onClick={() => handleBroadcastRebalance(activeZone)}
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-500 hover:from-amber-400 to-orange-500 hover:to-orange-400 text-black font-extrabold rounded-xl text-xs font-mono flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-transform active:scale-95 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Broadcast Rebalance (+₱{activeZone.recommendedIncentive || 50} Incentive)</span>
                </button>
                {rebalancedZones[activeZone.id] && (
                  <p className="text-[10px] text-emerald-400 font-mono text-center mt-2 flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Incentive active ({rebalancedZones[activeZone.id]} dispatch rounds sent)</span>
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Hotspots Demand Ranking Leaderboard */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-4 space-y-3 shadow-xl font-mono">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-slate-400" />
                <span>Demand Clusters ({filteredZones.length})</span>
              </h4>
              <span className="text-[10px] text-slate-500">Sorted by Surge</span>
            </div>

            <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
              {filteredZones.map((zone, idx) => {
                const isSelected = selectedZoneId === zone.id;
                return (
                  <div
                    key={zone.id}
                    onClick={() => setSelectedZoneId(zone.id)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer select-none ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500/40 text-white shadow-md'
                        : 'bg-zinc-950/60 hover:bg-zinc-800/80 border-zinc-800/80 text-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-[11px] font-black text-slate-500 w-4">
                          #{idx + 1}
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-white truncate">{zone.name}</p>
                          <p className="text-[10px] text-slate-400">{zone.city}</p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className={`text-xs font-black px-2 py-0.5 rounded-full border ${
                          zone.surgeMultiplier >= 2.0 
                            ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' 
                            : zone.surgeMultiplier >= 1.5 
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' 
                            : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        }`}>
                          {zone.surgeMultiplier.toFixed(1)}x
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-800/60 text-[10px] text-slate-400">
                      <span>{zone.activeRequests} req/min</span>
                      <span className="text-emerald-400">{zone.availableDrivers} drivers</span>
                      <span>{zone.avgWaitTimeMin}m wait</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
