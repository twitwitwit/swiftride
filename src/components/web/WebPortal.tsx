import React, { useState } from 'react';
import { 
  Smartphone, 
  Car, 
  ShieldCheck, 
  Columns, 
  Globe, 
  Download, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Info,
  X,
  Play,
  Apple
} from 'lucide-react';
import { SwiftRideLogo } from '../common/SwiftRideLogo';
import { WebHome } from './WebHome';
import { WebAbout } from './WebAbout';
import { WebHelp } from './WebHelp';
import { DownloadModal } from './DownloadModal';
import { QuickBookModal } from './QuickBookModal';
import { LiveChatDrawer } from './LiveChatDrawer';
import { VehicleOptionsModal } from './VehicleOptionsModal';
import { useRide } from '../../context/RideContext';
import { VehicleCategory } from '../../types';

export const WebPortal: React.FC = () => {
  const { setCurrentView, showNotification } = useRide();
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'help'>('home');

  // Modals state
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isQuickBookOpen, setIsQuickBookOpen] = useState(false);
  const [selectedBookingVehicle, setSelectedBookingVehicle] = useState<VehicleCategory>('sedan');
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);
  const [isVehicleOptionsOpen, setIsVehicleOptionsOpen] = useState(false);
  const [legalModal, setLegalModal] = useState<'terms' | 'privacy' | null>(null);

  const handleBookRide = (category: VehicleCategory = 'sedan') => {
    setSelectedBookingVehicle(category);
    setIsQuickBookOpen(true);
  };

  return (
    <div className="min-h-screen w-full bg-[#faf9f6] text-slate-900 flex flex-col font-sans select-none antialiased">
      {/* 1. Official Web Header */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-40 px-4 sm:px-8 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('home')}
            className="cursor-pointer hover:opacity-90 transition-opacity"
          >
            <SwiftRideLogo size="md" variant="horizontal" theme="light" showSubtitle={false} />
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            <button
              id="nav-web-home"
              onClick={() => setActiveTab('home')}
              className={`text-sm lg:text-base font-extrabold pb-1 transition-all cursor-pointer relative ${
                activeTab === 'home'
                  ? 'text-[#f59e0b]'
                  : 'text-slate-800 hover:text-[#f59e0b]'
              }`}
            >
              <span>Home</span>
              {activeTab === 'home' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f59e0b] rounded-full"></span>
              )}
            </button>

            <button
              id="nav-web-about"
              onClick={() => setActiveTab('about')}
              className={`text-sm lg:text-base font-extrabold pb-1 transition-all cursor-pointer relative ${
                activeTab === 'about'
                  ? 'text-[#f59e0b]'
                  : 'text-slate-800 hover:text-[#f59e0b]'
              }`}
            >
              <span>About Us</span>
              {activeTab === 'about' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f59e0b] rounded-full"></span>
              )}
            </button>

            <button
              id="nav-web-help"
              onClick={() => setActiveTab('help')}
              className={`text-sm lg:text-base font-extrabold pb-1 transition-all cursor-pointer relative ${
                activeTab === 'help'
                  ? 'text-[#f59e0b]'
                  : 'text-slate-800 hover:text-[#f59e0b]'
              }`}
            >
              <span>Help</span>
              {activeTab === 'help' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f59e0b] rounded-full"></span>
              )}
            </button>
          </nav>

          {/* Right Action: Download Now Button + System Simulator Quick Link */}
          <div className="flex items-center gap-3">
            {/* Mobile Nav Dropdown / Switcher for small screens */}
            <div className="md:hidden flex items-center bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('home')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg ${activeTab === 'home' ? 'bg-amber-400 text-slate-950 font-black' : 'text-slate-700'}`}
              >
                Home
              </button>
              <button
                onClick={() => setActiveTab('about')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg ${activeTab === 'about' ? 'bg-amber-400 text-slate-950 font-black' : 'text-slate-700'}`}
              >
                About
              </button>
              <button
                onClick={() => setActiveTab('help')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg ${activeTab === 'help' ? 'bg-amber-400 text-slate-950 font-black' : 'text-slate-700'}`}
              >
                Help
              </button>
            </div>

            {/* DOWNLOAD NOW Golden Button matching design */}
            <button
              id="btn-header-download-now"
              onClick={() => setIsDownloadOpen(true)}
              className="px-5 sm:px-7 py-2 sm:py-2.5 bg-[#f59e0b] hover:bg-[#d97706] text-slate-950 font-black text-xs sm:text-sm rounded-full shadow-md transition-all uppercase tracking-wider cursor-pointer whitespace-nowrap"
            >
              DOWNLOAD NOW
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Content View Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <WebHome
            onBookRide={handleBookRide}
            onViewAllOptions={() => setIsVehicleOptionsOpen(true)}
            onOpenHelp={() => setActiveTab('help')}
          />
        )}

        {activeTab === 'about' && (
          <WebAbout
            onBookRide={() => handleBookRide('sedan')}
            onJoinDriver={() => {
              setCurrentView('driver');
              showNotification('Driver Portal', 'Switched to Driver Partner registration & dashboard.', 'info');
            }}
          />
        )}

        {activeTab === 'help' && (
          <WebHelp
            onStartLiveChat={() => setIsLiveChatOpen(true)}
          />
        )}
      </main>

      {/* 3. Official Web Footer (Matching Screenshot) */}
      <footer className="bg-[#0b0c10] text-slate-300 pt-12 pb-8 border-t border-slate-800 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-zinc-800">
            {/* Col 1 & 2: Logo, Tagline & Social Icons */}
            <div className="lg:col-span-2 space-y-4">
              <div className="cursor-pointer" onClick={() => setActiveTab('home')}>
                <SwiftRideLogo size="sm" variant="horizontal" theme="dark" showSubtitle={false} />
              </div>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                Your trusted partner for safe, affordable, and convenient transportation.
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-3 pt-1">
                {/* Facebook */}
                <button 
                  onClick={() => showNotification('Social Link', 'Opening SwiftRide official Facebook page...', 'info')}
                  className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-amber-400 hover:text-slate-950 text-slate-300 flex items-center justify-center transition-all cursor-pointer"
                  title="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/>
                  </svg>
                </button>
                {/* Instagram */}
                <button 
                  onClick={() => showNotification('Social Link', 'Opening SwiftRide official Instagram...', 'info')}
                  className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-amber-400 hover:text-slate-950 text-slate-300 flex items-center justify-center transition-all cursor-pointer"
                  title="Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </button>
                {/* Twitter / X */}
                <button 
                  onClick={() => showNotification('Social Link', 'Opening SwiftRide Twitter/X...', 'info')}
                  className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-amber-400 hover:text-slate-950 text-slate-300 flex items-center justify-center transition-all cursor-pointer"
                  title="Twitter / X"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </button>
                {/* YouTube */}
                <button 
                  onClick={() => showNotification('Social Link', 'Opening SwiftRide YouTube channel...', 'info')}
                  className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-amber-400 hover:text-slate-950 text-slate-300 flex items-center justify-center transition-all cursor-pointer"
                  title="YouTube"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Col 3: Quick Links */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-sm text-[#f59e0b] uppercase tracking-wider font-display">
                Quick Links
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button 
                    onClick={() => setActiveTab('home')}
                    className="text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('about')}
                    className="text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('help')}
                    className="text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    Help
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Services */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-sm text-[#f59e0b] uppercase tracking-wider font-display">
                Services
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button 
                    onClick={() => handleBookRide('sedan')}
                    className="text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    Book a Ride
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setIsVehicleOptionsOpen(true)}
                    className="text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    Ride Options
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      showNotification('Corporate Solutions', 'Contact corporate@swiftride.com.ph for fleet partnerships.', 'info');
                    }}
                    className="text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    Corporate Solutions
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 5: Support & App Store Badges */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-sm text-[#f59e0b] uppercase tracking-wider font-display">
                Support
              </h4>
              <ul className="space-y-2 text-xs mb-4">
                <li>
                  <button 
                    onClick={() => setActiveTab('help')}
                    className="text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    Help Center
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('help')}
                    className="text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    Safety Center
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setIsLiveChatOpen(true)}
                    className="text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    Contact Us
                  </button>
                </li>
              </ul>

              {/* App Store Buttons matching design */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => setIsDownloadOpen(true)}
                  className="flex items-center gap-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 px-3 py-2 rounded-xl text-left transition-all cursor-pointer w-full group"
                >
                  <div className="w-6 h-6 flex items-center justify-center text-emerald-400 shrink-0">
                    <Play className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <p className="text-[8px] uppercase font-bold text-slate-400 tracking-wider">GET IT ON</p>
                    <p className="text-xs font-black text-white group-hover:text-amber-400 transition-colors">Google Play</p>
                  </div>
                </button>

                <button
                  onClick={() => setIsDownloadOpen(true)}
                  className="flex items-center gap-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 px-3 py-2 rounded-xl text-left transition-all cursor-pointer w-full group"
                >
                  <div className="w-6 h-6 flex items-center justify-center text-white shrink-0">
                    <Apple className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <p className="text-[8px] uppercase font-bold text-slate-400 tracking-wider">Download on the</p>
                    <p className="text-xs font-black text-white group-hover:text-amber-400 transition-colors">App Store</p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Legal */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© 2026 SwiftRide. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setLegalModal('terms')}
                className="hover:text-slate-300 transition-colors cursor-pointer"
              >
                Terms of Service
              </button>
              <span>|</span>
              <button
                onClick={() => setLegalModal('privacy')}
                className="hover:text-slate-300 transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <DownloadModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
      />

      <QuickBookModal
        isOpen={isQuickBookOpen}
        onClose={() => setIsQuickBookOpen(false)}
        initialVehicle={selectedBookingVehicle}
      />

      <LiveChatDrawer
        isOpen={isLiveChatOpen}
        onClose={() => setIsLiveChatOpen(false)}
      />

      <VehicleOptionsModal
        isOpen={isVehicleOptionsOpen}
        onClose={() => setIsVehicleOptionsOpen(false)}
        onSelectVehicle={(vehId) => handleBookRide(vehId)}
      />

      {/* Legal Dialog Modal */}
      {legalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl text-white">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <h3 className="font-black text-lg text-white font-display">
                {legalModal === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
              </h3>
              <button
                onClick={() => setLegalModal(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 text-xs text-slate-300 space-y-3 max-h-80 overflow-y-auto leading-relaxed">
              <p>
                <strong>SwiftRide Transportation Technologies Inc.</strong> operates under full compliance with LTFRB ride-hailing and TNVS regulations in the Philippines.
              </p>
              <p>
                All passenger and driver partner data are protected with 256-bit AES encryption. Personal phone numbers are masked during active trips to preserve user privacy.
              </p>
              <p>
                Fare tariffs conform with standard flag-down rates and per-kilometer distance computations without arbitrary price surges.
              </p>
            </div>
            <div className="p-4 bg-slate-950 border-t border-slate-800 text-right">
              <button
                onClick={() => setLegalModal(null)}
                className="px-4 py-2 bg-amber-400 text-slate-950 font-bold rounded-xl text-xs"
              >
                Understood & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
