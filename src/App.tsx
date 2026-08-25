import React, { useState } from 'react';
import { 
  Smartphone, 
  Car, 
  ShieldCheck, 
  Columns, 
  Sparkles, 
  Zap, 
  Info, 
  X, 
  CheckCircle2, 
  AlertTriangle,
  Radio,
  ArrowUpRight,
  Globe
} from 'lucide-react';
import { RideProvider, useRide } from './context/RideContext';
import { PassengerApp } from './components/passenger/PassengerApp';
import { DriverApp } from './components/driver/DriverApp';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { WebPortal } from './components/web/WebPortal';
import { ActivePlatformView } from './types';

function AppContent() {
  const { currentView, setCurrentView, notification, closeNotification, activeRide, platformStats } = useRide();
  const [showQuickTips, setShowQuickTips] = useState<boolean>(true);

  return (
    <div className="min-h-screen w-full bg-black text-slate-200 flex flex-col font-sans select-none antialiased">
      {/* Top Universal Platform Bento Header */}
      <header className="bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4 shrink-0 z-50 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-black font-black text-xl shadow-md shadow-amber-500/20">
            S
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tighter text-white flex items-center gap-1.5 font-display">
              SWIFTRIDE <span className="text-amber-500">ECOSYSTEM</span>
            </h1>
            <p className="text-slate-500 text-[10px] font-mono uppercase tracking-widest hidden sm:block">
              Centralized Logistics & User Management v4.0.2
            </p>
          </div>
        </div>

        {/* Server Status & Mode Switcher */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden md:flex flex-col items-end pr-3 border-r border-zinc-800">
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Server Status</span>
            <span className="text-emerald-400 text-xs font-mono font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              OPERATIONAL
            </span>
          </div>

          <div className="flex items-center bg-zinc-900 border border-zinc-800 p-1 rounded-2xl shadow-inner overflow-x-auto no-scrollbar">
            <button
              id="view-web-portal"
              onClick={() => setCurrentView('web')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                currentView === 'web' || currentView === 'web_landing'
                  ? 'bg-amber-500 text-black shadow-md font-black scale-[1.02]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-zinc-800'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Web Portal</span>
            </button>

            <button
              id="view-dual-simulator"
              onClick={() => setCurrentView('dual')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                currentView === 'dual'
                  ? 'bg-amber-500 text-black shadow-md font-black scale-[1.02]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-zinc-800'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Dual Live Simulator</span>
            </button>

            <button
              id="view-passenger-app"
              onClick={() => setCurrentView('passenger')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                currentView === 'passenger'
                  ? 'bg-amber-500 text-black shadow-md font-black scale-[1.02]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-zinc-800'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Passenger App</span>
            </button>

            <button
              id="view-driver-app"
              onClick={() => setCurrentView('driver')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                currentView === 'driver'
                  ? 'bg-amber-500 text-black shadow-md font-black scale-[1.02]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-zinc-800'
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              <span>Driver App</span>
            </button>

            <button
              id="view-admin-dashboard"
              onClick={() => setCurrentView('admin')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                currentView === 'admin'
                  ? 'bg-amber-500 text-black shadow-md font-black scale-[1.02]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-zinc-800'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Dashboard</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main View Router */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {(currentView === 'web' || currentView === 'web_landing') && (
          <div className="flex-1 overflow-y-auto bg-[#faf9f6]">
            <WebPortal />
          </div>
        )}

        {currentView === 'dual' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-black flex flex-col gap-5">
            {/* Quick Demo Instruction Banner */}
            {showQuickTips && (
              <div className="w-full bg-zinc-900/80 border border-zinc-800 rounded-3xl p-4 flex items-center justify-between gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-xl bg-amber-500 text-black flex items-center justify-center shrink-0 font-black">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-amber-400 font-mono">BENTO GRID DUAL LIVE SIMULATOR:</strong> Book a ride on the Passenger phone (left), watch the Driver phone (right) receive the dispatch request with a 30s timer, accept, and watch real-time in-transit telemetry update across the ecosystem.
                  </div>
                </div>
                <button
                  onClick={() => setShowQuickTips(false)}
                  className="text-slate-400 hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* 12-Column Bento Grid Showcase */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              {/* Left Bento Box: Passenger Mobile Phone */}
              <div className="lg:col-span-3 bg-zinc-900 border border-zinc-800 rounded-3xl p-5 relative overflow-hidden flex flex-col items-center shadow-2xl">
                <div className="w-full flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></div>
                    <span className="text-[11px] font-mono font-bold text-slate-300">CLIENT APP</span>
                  </div>
                  <span className="bg-amber-500/10 text-amber-400 text-[10px] px-2.5 py-1 rounded-full border border-amber-500/20 font-mono font-bold uppercase tracking-wider">
                    PASSENGER MOBILE
                  </span>
                </div>
                <div className="w-full flex justify-center">
                  <PassengerApp onSwitchToDriver={() => setCurrentView('driver')} />
                </div>
              </div>

              {/* Center Bento Column: Fleet Performance + Telemetry + System Alerts + Quick Dispatch */}
              <div className="lg:col-span-6 flex flex-col gap-5">
                {/* Fleet Performance Bento Box */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col gap-5 relative overflow-hidden shadow-2xl">
                  <div className="flex flex-wrap justify-between items-start gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          REAL-TIME DISPATCH
                        </span>
                        <span className="text-slate-500 text-xs font-mono">• METRO MANILA</span>
                      </div>
                      <h2 className="text-2xl font-bold text-white font-display mt-1">Fleet Performance</h2>
                      <p className="text-slate-500 text-sm">Real-time network throughput and revenue trends</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="px-3 py-1.5 bg-zinc-800 rounded-xl text-[10px] font-mono font-bold text-slate-400 border border-zinc-700">
                        24 HOURS
                      </div>
                      <button 
                        onClick={() => setCurrentView('admin')}
                        className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 transition-colors rounded-xl text-[10px] font-mono font-black text-black flex items-center gap-1 cursor-pointer"
                      >
                        <span>LIVE RADAR</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Dynamic Throughput Bars Grid */}
                  <div className="border border-zinc-800 rounded-2xl relative bg-zinc-950/50 p-4 flex flex-col gap-2 overflow-hidden">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>NETWORK TRAFFIC VOLUME</span>
                      <span className="text-emerald-400 font-bold">99.2% OPTIMAL</span>
                    </div>

                    <div className="h-32 flex items-end p-2 gap-2 sm:gap-3 w-full relative">
                      {[
                        { h: '40%', val: '420', label: '00:00', active: false },
                        { h: '65%', val: '680', label: '04:00', active: false },
                        { h: '55%', val: '550', label: '08:00', active: false },
                        { h: '85%', val: '890', label: '12:00', active: true },
                        { h: '75%', val: '760', label: '16:00', active: false },
                        { h: '95%', val: '940', label: '20:00', active: true },
                        { h: '60%', val: '620', label: '22:00', active: false },
                        { h: '50%', val: '510', label: 'Now', active: false },
                      ].map((bar, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-1 group h-full justify-end z-10">
                          <div 
                            style={{ height: bar.h }} 
                            className={`w-full rounded-t-sm transition-all ${
                              bar.active
                                ? 'bg-amber-500/60 border-t-2 border-amber-500'
                                : 'bg-amber-500/20 border-t-2 border-amber-500/40 group-hover:bg-amber-500/40'
                            }`}
                            title={`${bar.val} trips at ${bar.label}`}
                          />
                          <span className="text-[9px] font-mono text-slate-500">{bar.label}</span>
                        </div>
                      ))}

                      {/* Background guideline grid */}
                      <div className="absolute inset-0 flex flex-col justify-between p-2 pointer-events-none opacity-40">
                        <div className="border-b border-zinc-800 w-full"></div>
                        <div className="border-b border-zinc-800 w-full"></div>
                        <div className="border-b border-zinc-800 w-full"></div>
                      </div>
                    </div>
                  </div>

                  {/* 3 Metric Blocks */}
                  <div className="grid grid-cols-3 gap-3 sm:gap-4">
                    <div className="bg-zinc-950 p-3.5 rounded-2xl border border-zinc-800">
                      <p className="text-[10px] text-slate-500 uppercase font-mono tracking-wider">Active Rides</p>
                      <p className="text-xl sm:text-2xl font-black text-white font-display mt-0.5">1,284</p>
                      <span className="text-[10px] text-emerald-400 font-mono font-semibold">↑ +18.4%</span>
                    </div>
                    <div className="bg-zinc-950 p-3.5 rounded-2xl border border-zinc-800">
                      <p className="text-[10px] text-slate-500 uppercase font-mono tracking-wider">Daily Revenue</p>
                      <p className="text-xl sm:text-2xl font-black text-amber-400 font-display mt-0.5">
                        ₱{platformStats.revenueToday.toLocaleString()}
                      </p>
                      <span className="text-[10px] text-slate-400 font-mono">15% net cut</span>
                    </div>
                    <div className="bg-zinc-950 p-3.5 rounded-2xl border border-zinc-800">
                      <p className="text-[10px] text-slate-500 uppercase font-mono tracking-wider">New Drivers</p>
                      <p className="text-xl sm:text-2xl font-black text-white font-display mt-0.5">+14</p>
                      <span className="text-[10px] text-amber-400 font-mono">In audit</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Bento Row: System Alerts + Quick Dispatch */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* System Alerts Bento Card */}
                  <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 flex flex-col justify-between shadow-2xl gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-500/10 rounded-2xl border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm font-display">System Alerts</h4>
                        <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">3 Active Monitors</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 bg-zinc-950/80 p-3 rounded-2xl border border-zinc-800/80">
                      <div className="text-[10px] font-mono flex items-center justify-between text-emerald-400">
                        <span className="flex items-center gap-2 text-slate-300">
                          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                          GCash / Maya Gateway
                        </span>
                        <span>HEALTHY</span>
                      </div>
                      <div className="text-[10px] font-mono flex items-center justify-between text-slate-400">
                        <span className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-slate-500 rounded-full"></span>
                          LTFRB Tariff Rules
                        </span>
                        <span className="text-slate-300">SYNCED</span>
                      </div>
                      <div className="text-[10px] font-mono flex items-center justify-between text-amber-400">
                        <span className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                          Telemetry Ping
                        </span>
                        <span>12ms</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Dispatch Bento Card */}
                  <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 flex flex-col justify-between shadow-2xl gap-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-white font-display">Quick Dispatch</h4>
                        <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Live Dispatch Queue</p>
                      </div>
                      <span className="text-[10px] font-mono font-bold bg-zinc-800 px-2 py-0.5 rounded text-slate-400">
                        LIVE
                      </span>
                    </div>

                    <div className="space-y-2.5 flex-1">
                      <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                        <div className="text-[10px]">
                          <p className="font-bold text-white font-mono">
                            {activeRide ? `#${activeRide.id.toUpperCase()}` : '#RX-2901'}
                          </p>
                          <p className="text-slate-500 truncate max-w-[140px]">
                            {activeRide ? activeRide.pickup.name : 'Swift Basic • 0.4 km'}
                          </p>
                        </div>
                        <div className="text-[10px] font-mono bg-zinc-800 px-2 py-1 rounded text-emerald-400 font-bold">
                          {activeRide ? activeRide.status.toUpperCase() : 'ASSIGNED'}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-[10px]">
                          <p className="font-bold text-white font-mono">#RX-2902</p>
                          <p className="text-slate-500">Standard • BGC Makati</p>
                        </div>
                        <div className="text-[10px] font-mono bg-amber-500/20 px-2 py-1 rounded text-amber-400 font-bold">
                          PENDING
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Bento Box: Driver Partner Mobile Phone */}
              <div className="lg:col-span-3 bg-zinc-900 border border-zinc-800 rounded-3xl p-5 relative overflow-hidden flex flex-col items-center shadow-2xl">
                <div className="w-full flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></div>
                    <span className="text-[11px] font-mono font-bold text-slate-300">DRIVER APP</span>
                  </div>
                  <span className="bg-blue-500/10 text-blue-400 text-[10px] px-2.5 py-1 rounded-full border border-blue-500/20 font-mono font-bold uppercase tracking-wider">
                    DRIVER MOBILE
                  </span>
                </div>
                <div className="w-full flex justify-center">
                  <DriverApp onSwitchToPassenger={() => setCurrentView('passenger')} />
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'passenger' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col items-center justify-center bg-black">
            <PassengerApp onSwitchToDriver={() => setCurrentView('driver')} />
          </div>
        )}

        {currentView === 'driver' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col items-center justify-center bg-black">
            <DriverApp onSwitchToPassenger={() => setCurrentView('passenger')} />
          </div>
        )}

        {currentView === 'admin' && (
          <div className="flex-1 h-full overflow-hidden bg-black">
            <AdminDashboard />
          </div>
        )}
      </div>

      {/* Floating System Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className={`p-4 rounded-3xl shadow-2xl border flex items-start gap-3 max-w-sm ${
            notification.type === 'success' ? 'bg-zinc-900 text-white border-emerald-500/40' :
            notification.type === 'warning' ? 'bg-zinc-900 text-white border-amber-500/40' :
            'bg-zinc-900 text-white border-blue-500/40'
          }`}>
            <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
              notification.type === 'success' ? 'bg-emerald-500 text-black' :
              notification.type === 'warning' ? 'bg-amber-400 text-black' :
              'bg-blue-500 text-white'
            }`}>
              {notification.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> :
               notification.type === 'warning' ? <AlertTriangle className="w-4 h-4" /> :
               <Info className="w-4 h-4" />}
            </div>
            <div className="flex-1">
              <h5 className="text-xs font-bold text-white font-mono">{notification.title}</h5>
              <p className="text-[11px] text-slate-300 leading-snug mt-0.5">{notification.message}</p>
            </div>
            <button onClick={closeNotification} className="text-slate-400 hover:text-white p-0.5">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <RideProvider>
      <AppContent />
    </RideProvider>
  );
}

