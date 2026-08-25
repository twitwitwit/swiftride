import React, { useState } from 'react';
import { X, Smartphone, Download, QrCode, CheckCircle2, Apple, Play } from 'lucide-react';
import { SwiftRideLogo } from '../common/SwiftRideLogo';
import { useRide } from '../../context/RideContext';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  const { setCurrentView, showNotification } = useRide();
  const [activeTab, setActiveTab] = useState<'passenger' | 'driver'>('passenger');
  const [phoneInput, setPhoneInput] = useState('');
  const [smsSent, setSmsSent] = useState(false);

  if (!isOpen) return null;

  const handleSendLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneInput.trim()) return;
    setSmsSent(true);
    showNotification('Download Link Sent', `SMS sent to ${phoneInput} with the app download link.`, 'success');
    setTimeout(() => setSmsSent(false), 5000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in select-none">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl relative text-white">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SwiftRideLogo size="sm" variant="horizontal" theme="dark" showSubtitle={false} />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/30">
              Mobile Apps
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Passenger / Driver Switcher */}
          <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800">
            <button
              onClick={() => setActiveTab('passenger')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'passenger'
                  ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              SwiftRide Passenger App
            </button>
            <button
              onClick={() => setActiveTab('driver')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'driver'
                  ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Download className="w-4 h-4" />
              SwiftRide Driver Partner App
            </button>
          </div>

          {/* QR Code & Direct Store Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            {/* QR Card */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col items-center text-center">
              <div className="w-36 h-36 bg-white p-3 rounded-2xl shadow-md flex items-center justify-center relative mb-3">
                <svg viewBox="0 0 100 100" className="w-full h-full text-slate-950">
                  <rect width="100" height="100" fill="white" />
                  {/* Outer corner boxes */}
                  <rect x="5" y="5" width="28" height="28" fill="black" rx="4" />
                  <rect x="9" y="9" width="20" height="20" fill="white" rx="2" />
                  <rect x="13" y="13" width="12" height="12" fill="black" rx="1" />
                  
                  <rect x="67" y="5" width="28" height="28" fill="black" rx="4" />
                  <rect x="71" y="9" width="20" height="20" fill="white" rx="2" />
                  <rect x="75" y="13" width="12" height="12" fill="black" rx="1" />
                  
                  <rect x="5" y="67" width="28" height="28" fill="black" rx="4" />
                  <rect x="9" y="71" width="20" height="20" fill="white" rx="2" />
                  <rect x="13" y="75" width="12" height="12" fill="black" rx="1" />
                  
                  {/* Stylized Data Pixels */}
                  <rect x="40" y="8" width="6" height="6" fill="black" />
                  <rect x="50" y="14" width="6" height="6" fill="black" />
                  <rect x="42" y="24" width="8" height="8" fill="#f59e0b" />
                  <rect x="8" y="42" width="8" height="8" fill="black" />
                  <rect x="22" y="44" width="6" height="6" fill="black" />
                  <rect x="36" y="38" width="8" height="8" fill="black" />
                  <rect x="48" y="48" width="10" height="10" fill="#f59e0b" />
                  <rect x="64" y="40" width="6" height="6" fill="black" />
                  <rect x="78" y="44" width="8" height="8" fill="black" />
                  <rect x="40" y="66" width="6" height="6" fill="black" />
                  <rect x="52" y="72" width="8" height="8" fill="black" />
                  <rect x="68" y="68" width="8" height="8" fill="black" />
                  <rect x="80" y="78" width="8" height="8" fill="black" />
                  <rect x="42" y="84" width="8" height="8" fill="black" />
                  <rect x="60" y="86" width="6" height="6" fill="black" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center text-slate-950 font-black text-xs shadow-md">
                    S
                  </div>
                </div>
              </div>
              <p className="text-xs font-bold text-slate-200">Scan to Download</p>
              <p className="text-[11px] text-slate-400">Works with iOS & Android Camera</p>
            </div>

            {/* Store Buttons & SMS form */}
            <div className="space-y-4">
              <div className="space-y-2">
                <a
                  href="#google-play"
                  onClick={(e) => {
                    e.preventDefault();
                    showNotification('Google Play Download', 'Redirecting to Google Play Store...', 'info');
                  }}
                  className="flex items-center gap-3 w-full bg-slate-950 hover:bg-slate-800 border border-slate-700 p-3 rounded-2xl transition-all cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-xl bg-slate-900 group-hover:bg-slate-800 flex items-center justify-center text-emerald-400">
                    <Play className="w-5 h-5 fill-current" />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">GET IT ON</p>
                    <p className="text-sm font-black text-white group-hover:text-amber-400 transition-colors">Google Play</p>
                  </div>
                </a>

                <a
                  href="#app-store"
                  onClick={(e) => {
                    e.preventDefault();
                    showNotification('App Store Download', 'Redirecting to Apple App Store...', 'info');
                  }}
                  className="flex items-center gap-3 w-full bg-slate-950 hover:bg-slate-800 border border-slate-700 p-3 rounded-2xl transition-all cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-xl bg-slate-900 group-hover:bg-slate-800 flex items-center justify-center text-slate-200">
                    <Apple className="w-6 h-6 fill-current" />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Download on the</p>
                    <p className="text-sm font-black text-white group-hover:text-amber-400 transition-colors">App Store</p>
                  </div>
                </a>
              </div>

              {/* Instant Web Launcher */}
              <div className="pt-2 border-t border-slate-800">
                <button
                  onClick={() => {
                    onClose();
                    setCurrentView(activeTab === 'passenger' ? 'passenger' : 'driver');
                  }}
                  className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Smartphone className="w-4 h-4" />
                  Launch {activeTab === 'passenger' ? 'Passenger' : 'Driver'} Web Simulator
                </button>
              </div>
            </div>
          </div>

          {/* SMS Download Link */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <p className="text-xs font-bold text-slate-300 mb-2">Get download link via SMS</p>
            <form onSubmit={handleSendLink} className="flex gap-2">
              <input
                type="tel"
                placeholder="e.g. 0917 123 4567"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-700 px-3 py-2 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold rounded-xl text-xs transition-colors cursor-pointer shrink-0"
              >
                Send Link
              </button>
            </form>
            {smsSent && (
              <p className="text-[11px] text-emerald-400 flex items-center gap-1.5 mt-2 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" /> SMS download link sent! Check your messages.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
