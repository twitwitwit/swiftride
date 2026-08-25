import React from 'react';
import { Wifi, BatteryMedium, Signal, ChevronLeft } from 'lucide-react';

interface DeviceFrameProps {
  children: React.ReactNode;
  title?: string;
  onBack?: () => void;
  showBack?: boolean;
  appType: 'passenger' | 'driver';
  currentTime?: string;
  className?: string;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  children,
  title,
  onBack,
  showBack = false,
  appType,
  currentTime = '9:41',
  className = ''
}) => {
  return (
    <div className={`relative mx-auto flex flex-col w-[380px] h-[780px] max-w-full bg-zinc-950 rounded-[2.5rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border-[6px] border-zinc-800 overflow-hidden ring-1 ring-zinc-700/40 select-none ${className}`}>
      {/* Top Speaker / Dynamic Island Notch */}
      <div className="absolute top-0 inset-x-0 h-7 z-50 flex items-center justify-between px-6 pt-1.5 text-xs text-slate-300 font-semibold pointer-events-none bg-transparent">
        <span className="tracking-tight text-[12px] font-mono font-bold text-slate-300">{currentTime}</span>
        
        {/* Dynamic Island pill */}
        <div className="w-24 h-4 bg-black/90 border border-zinc-800 rounded-full mx-auto -mt-0.5 flex items-center justify-center gap-1.5 shadow-inner">
          <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></div>
        </div>

        <div className="flex items-center gap-1.5 text-slate-400">
          <Signal className="w-3.5 h-3.5" />
          <Wifi className="w-3.5 h-3.5" />
          <BatteryMedium className="w-4 h-4 text-slate-300" />
        </div>
      </div>

      {/* App Header if provided */}
      {title && (
        <div className="pt-9 pb-2.5 px-4 bg-zinc-900/95 backdrop-blur border-b border-zinc-800 flex items-center justify-between z-30 shrink-0">
          <div className="flex items-center gap-2">
            {showBack && onBack && (
              <button 
                id="btn-device-back"
                onClick={onBack}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-zinc-800 transition-colors text-slate-300 -ml-1 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <h2 className="text-sm font-bold text-white font-display">{title}</h2>
          </div>
          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
            appType === 'passenger' 
              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' 
              : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
          }`}>
            {appType === 'passenger' ? 'Passenger' : 'Driver Partner'}
          </span>
        </div>
      )}

      {/* Main Screen Content */}
      <div className={`flex-1 overflow-y-auto no-scrollbar relative flex flex-col bg-zinc-950 text-slate-100 ${!title ? 'pt-8' : ''}`}>
        {children}
      </div>

      {/* Home Indicator bar */}
      <div className="absolute bottom-1.5 inset-x-0 flex justify-center pointer-events-none z-50">
        <div className="w-28 h-1 bg-zinc-600/80 rounded-full"></div>
      </div>
    </div>
  );
};
