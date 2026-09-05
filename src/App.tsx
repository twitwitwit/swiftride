import React from 'react';
import { 
  Car, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle,
  Info,
  X,
  Navigation,
  User,
  Radio,
  Clock
} from 'lucide-react';
import { RideProvider, useRide } from './context/RideContext';
import { PassengerApp } from './components/passenger/PassengerApp';
import { DriverApp } from './components/driver/DriverApp';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { SwiftRideLogo } from './components/common/SwiftRideLogo';

function AppContent() {
  const { 
    currentView, 
    setCurrentView, 
    notification, 
    closeNotification, 
    activeRide,
    incomingDriverRide,
    pendingApplications
  } = useRide();

  const pendingAppsCount = pendingApplications.filter(a => a.status === 'pending').length;

  return (
    <div className="h-screen w-full bg-black text-slate-200 flex flex-col font-sans select-none antialiased overflow-hidden">
      {/* Top Application Switcher Bar */}
      <header className="bg-zinc-950 border-b border-zinc-800/90 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0 z-50">
        <SwiftRideLogo size="md" variant="horizontal" theme="dark" showSubtitle={true} />

        {/* 3 Core System Navigation Tabs */}
        <div className="flex items-center bg-zinc-900/90 border border-zinc-800 p-1 rounded-2xl shadow-inner">
          {/* 1. Passenger System (Mobile) */}
          <button
            id="nav-system-passenger"
            onClick={() => setCurrentView('passenger')}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer relative ${
              currentView === 'passenger'
                ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white hover:bg-zinc-800/80'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Passenger (Mobile)</span>
            {activeRide && (
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Active Ride"></span>
            )}
          </button>

          {/* 2. Driver System (Mobile) */}
          <button
            id="nav-system-driver"
            onClick={() => setCurrentView('driver')}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer relative ${
              currentView === 'driver'
                ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white hover:bg-zinc-800/80'
            }`}
          >
            <Car className="w-3.5 h-3.5" />
            <span>Driver (Mobile)</span>
            {(incomingDriverRide || (activeRide && activeRide.status !== 'requested')) && (
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" title="Incoming or Active Trip"></span>
            )}
          </button>

          {/* 3. Admin System (Web Dashboard) */}
          <button
            id="nav-system-admin"
            onClick={() => setCurrentView('admin')}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer relative ${
              currentView === 'admin'
                ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white hover:bg-zinc-800/80'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin Dashboard</span>
            {pendingAppsCount > 0 && (
              <span className="text-[9px] bg-rose-500 text-white font-mono font-black px-1.5 py-0.2 rounded-full">
                {pendingAppsCount}
              </span>
            )}
          </button>
        </div>

        {/* Real-time System Status Badge */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-300 text-[11px] font-semibold">All Systems Live</span>
          </div>
        </div>
      </header>

      {/* Main Screen: Directly Renders the Selected System Application */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-black">
        {currentView === 'passenger' && (
          <div className="flex-1 w-full h-full flex flex-col overflow-hidden">
            <PassengerApp onSwitchToDriver={() => setCurrentView('driver')} />
          </div>
        )}

        {currentView === 'driver' && (
          <div className="flex-1 w-full h-full flex flex-col overflow-hidden">
            <DriverApp onSwitchToPassenger={() => setCurrentView('passenger')} />
          </div>
        )}

        {currentView === 'admin' && (
          <div className="flex-1 w-full h-full flex flex-col overflow-hidden">
            <AdminDashboard />
          </div>
        )}
      </main>

      {/* Floating Global Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className={`p-4 rounded-2xl shadow-2xl border flex items-start gap-3 max-w-sm ${
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
            <button onClick={closeNotification} className="text-slate-400 hover:text-white p-0.5 cursor-pointer">
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
