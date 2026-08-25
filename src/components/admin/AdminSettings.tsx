import React, { useState } from 'react';
import { 
  Settings, 
  DollarSign, 
  Percent, 
  ShieldCheck, 
  Zap, 
  CreditCard, 
  Sliders, 
  Save, 
  CheckCircle2, 
  RefreshCw,
  Bell,
  MapPin,
  Car
} from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const [baseFare, setBaseFare] = useState<number>(45);
  const [perKmRate, setPerKmRate] = useState<number>(15);
  const [perMinuteRate, setPerMinuteRate] = useState<number>(2.5);
  const [platformCommission, setPlatformCommission] = useState<number>(20);
  const [maxSurgeMultiplier, setMaxSurgeMultiplier] = useState<number>(3.0);
  const [driverDispatchRadiusKm, setDriverDispatchRadiusKm] = useState<number>(5.0);
  const [autoRebalanceIncentive, setAutoRebalanceIncentive] = useState<number>(50);
  const [cashEnabled, setCashEnabled] = useState<boolean>(true);
  const [gcashEnabled, setGcashEnabled] = useState<boolean>(true);
  const [mayaEnabled, setMayaEnabled] = useState<boolean>(true);
  const [cardEnabled, setCardEnabled] = useState<boolean>(true);
  const [autoVerifyNbi, setAutoVerifyNbi] = useState<boolean>(false);
  const [maxVehicleAgeYears, setMaxVehicleAgeYears] = useState<number>(7);

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [savedNotification, setSavedNotification] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSavedNotification('Platform configuration updated and propagated to dispatch servers.');
      setTimeout(() => setSavedNotification(null), 3500);
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-sans">
      {savedNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-900 border border-emerald-500/40 text-emerald-400 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-mono font-bold animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{savedNotification}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-zinc-900/90 border border-zinc-800 p-5 rounded-3xl">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white font-display">Platform Operations Settings</h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-zinc-800 text-slate-300 border border-zinc-700">
              PRODUCTION LIVE
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Configure fare algorithms, commission schedules, dispatch radii, and regulatory onboarding policies
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-bold rounded-xl text-xs font-mono transition-all shadow-md cursor-pointer"
        >
          {isSaving ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Updating Config...</span>
            </>
          ) : (
            <>
              <Save className="w-3.5 h-3.5" />
              <span>Save & Apply Settings</span>
            </>
          )}
        </button>
      </div>

      {/* Settings Grid */}
      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fare & Pricing Engine */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center gap-2.5 border-b border-zinc-800 pb-3">
            <div className="w-8 h-8 rounded-xl bg-zinc-800 text-slate-300 flex items-center justify-center border border-zinc-700/60">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-display">Base Fare & Distance Pricing</h3>
              <p className="text-[11px] text-slate-400 font-mono">Standard economy formula applied across Metro Manila</p>
            </div>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1 font-bold">Base Flagdown Rate (₱)</label>
                <input
                  type="number"
                  value={baseFare}
                  onChange={e => setBaseFare(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-bold">Rate Per Kilometer (₱/km)</label>
                <input
                  type="number"
                  value={perKmRate}
                  onChange={e => setPerKmRate(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1 font-bold">Traffic Rate (₱/minute)</label>
                <input
                  type="number"
                  step="0.5"
                  value={perMinuteRate}
                  onChange={e => setPerMinuteRate(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-bold">Max Surge Multiplier Cap</label>
                <input
                  type="number"
                  step="0.1"
                  value={maxSurgeMultiplier}
                  onChange={e => setMaxSurgeMultiplier(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Platform Revenue & Commission */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center gap-2.5 border-b border-zinc-800 pb-3">
            <div className="w-8 h-8 rounded-xl bg-zinc-800 text-slate-300 flex items-center justify-center border border-zinc-700/60">
              <Percent className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-display">Revenue Split & Commission</h3>
              <p className="text-[11px] text-slate-400 font-mono">Platform fee deducted from gross fares before driver payout</p>
            </div>
          </div>

          <div className="space-y-4 font-mono text-xs">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-slate-400 font-bold">SwiftRide Platform Take Rate</label>
                <span className="text-amber-400 font-bold text-sm">{platformCommission}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="30"
                value={platformCommission}
                onChange={e => setPlatformCommission(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>10% (Driver Favor)</span>
                <span>Driver Retains: {100 - platformCommission}%</span>
                <span>30% (Max)</span>
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-bold">Heatmap Dispatch Incentive Bonus (₱/trip)</label>
              <input
                type="number"
                value={autoRebalanceIncentive}
                onChange={e => setAutoRebalanceIncentive(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
              />
              <p className="text-[10px] text-slate-500 mt-1">Bonus credited to drivers accepting dispatch into high-surge deficit hotzones.</p>
            </div>
          </div>
        </div>

        {/* Dispatch & Telemetry Parameters */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center gap-2.5 border-b border-zinc-800 pb-3">
            <div className="w-8 h-8 rounded-xl bg-zinc-800 text-slate-300 flex items-center justify-center border border-zinc-700/60">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-display">Dispatch Engine & Geofencing</h3>
              <p className="text-[11px] text-slate-400 font-mono">Radius and matching limits for Metro Manila fleet</p>
            </div>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-bold">Driver Search Dispatch Radius (km)</label>
              <input
                type="number"
                step="0.5"
                value={driverDispatchRadiusKm}
                onChange={e => setDriverDispatchRadiusKm(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-bold">Maximum Registered Vehicle Age (Years)</label>
              <input
                type="number"
                value={maxVehicleAgeYears}
                onChange={e => setMaxVehicleAgeYears(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
              />
              <p className="text-[10px] text-slate-500 mt-1">LTFRB standard mandate: Vehicles older than 7 years are rejected.</p>
            </div>
          </div>
        </div>

        {/* Payment Gateways */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center gap-2.5 border-b border-zinc-800 pb-3">
            <div className="w-8 h-8 rounded-xl bg-zinc-800 text-slate-300 flex items-center justify-center border border-zinc-700/60">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-display">Payment Channels & Gateways</h3>
              <p className="text-[11px] text-slate-400 font-mono">Toggle allowed payment options for passengers</p>
            </div>
          </div>

          <div className="space-y-2.5 font-mono text-xs">
            {[
              { id: 'gcash', label: 'GCash E-Wallet', enabled: gcashEnabled, toggle: () => setGcashEnabled(!gcashEnabled) },
              { id: 'maya', label: 'Maya (PayMaya)', enabled: mayaEnabled, toggle: () => setMayaEnabled(!mayaEnabled) },
              { id: 'card', label: 'Credit / Debit Cards (Visa/Mastercard)', enabled: cardEnabled, toggle: () => setCardEnabled(!cardEnabled) },
              { id: 'cash', label: 'Cash on Destination', enabled: cashEnabled, toggle: () => setCashEnabled(!cashEnabled) }
            ].map(gw => (
              <div key={gw.id} className="flex items-center justify-between p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl">
                <span className="font-bold text-white">{gw.label}</span>
                <button
                  type="button"
                  onClick={gw.toggle}
                  className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer text-[11px] ${
                    gw.enabled
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-zinc-800 text-slate-500 border border-zinc-700'
                  }`}
                >
                  {gw.enabled ? 'ACTIVE' : 'DISABLED'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};
