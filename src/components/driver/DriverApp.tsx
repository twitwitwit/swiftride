import React, { useState } from 'react';
import { Home, FileText, MessageSquare, Wallet, User } from 'lucide-react';
import { DeviceFrame } from '../common/DeviceFrame';
import { DriverAuth } from './DriverAuth';
import { DriverHome } from './DriverHome';
import { DriverTrips } from './DriverTrips';
import { DriverEarnings } from './DriverEarnings';
import { DriverProfile } from './DriverProfile';
import { DriverChat } from './DriverChat';
import { useRide } from '../../context/RideContext';

interface DriverAppProps {
  onSwitchToPassenger?: () => void;
  standalone?: boolean;
}

export const DriverApp: React.FC<DriverAppProps> = ({ onSwitchToPassenger, standalone = false }) => {
  const { activeRide } = useRide();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'home' | 'trips' | 'chat' | 'earnings' | 'profile'>('home');
  const [chatRideId, setChatRideId] = useState<string | undefined>(undefined);

  const handleNavigateToChat = (rideId: string) => {
    setChatRideId(rideId);
    setActiveTab('chat');
  };

  return (
    <DeviceFrame
      appType="driver"
      title={
        !isAuthenticated ? undefined :
        activeTab === 'home' ? undefined :
        activeTab === 'trips' ? 'My Trips' :
        activeTab === 'chat' ? 'Passenger Chat' :
        activeTab === 'earnings' ? 'Earnings' : 'Driver Profile'
      }
      showBack={activeTab !== 'home'}
      onBack={() => setActiveTab('home')}
    >
      {!isAuthenticated ? (
        <DriverAuth
          onSuccess={() => setIsAuthenticated(true)}
          onSwitchRole={(role) => {
            if (role === 'passenger' && onSwitchToPassenger) {
              onSwitchToPassenger();
            }
          }}
        />
      ) : (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col">
            {activeTab === 'home' && (
              <DriverHome
                onNavigateToChat={handleNavigateToChat}
                onNavigateToEarnings={() => setActiveTab('earnings')}
              />
            )}

            {activeTab === 'trips' && (
              <DriverTrips />
            )}

            {activeTab === 'chat' && (
              <DriverChat
                rideId={chatRideId}
                onBack={() => setActiveTab('home')}
              />
            )}

            {activeTab === 'earnings' && (
              <DriverEarnings />
            )}

            {activeTab === 'profile' && (
              <DriverProfile
                onLogout={() => setIsAuthenticated(false)}
                onNavigateToTrips={() => setActiveTab('trips')}
                onNavigateToEarnings={() => setActiveTab('earnings')}
              />
            )}
          </div>

          {/* Bottom Navigation Bar (Slide 8 & 9) */}
          <div className="bg-white border-t border-slate-200/80 px-2 py-2 flex items-center justify-around z-40 shrink-0 select-none">
            <button
              id="tab-driver-home"
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center justify-center gap-0.5 py-1 px-3 rounded-xl transition-all cursor-pointer ${
                activeTab === 'home' ? 'text-amber-500 font-extrabold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Home className="w-4 h-4" />
              <span className="text-[10px]">Home</span>
            </button>

            <button
              id="tab-driver-trips"
              onClick={() => setActiveTab('trips')}
              className={`flex flex-col items-center justify-center gap-0.5 py-1 px-3 rounded-xl transition-all cursor-pointer ${
                activeTab === 'trips' ? 'text-amber-500 font-extrabold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span className="text-[10px]">Trips</span>
            </button>

            <button
              id="tab-driver-chat"
              onClick={() => setActiveTab('chat')}
              className={`flex flex-col items-center justify-center gap-0.5 py-1 px-3 rounded-xl transition-all cursor-pointer relative ${
                activeTab === 'chat' ? 'text-amber-500 font-extrabold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span className="text-[10px]">Chat</span>
              <span className="absolute top-1 right-3 w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            </button>

            <button
              id="tab-driver-earnings"
              onClick={() => setActiveTab('earnings')}
              className={`flex flex-col items-center justify-center gap-0.5 py-1 px-3 rounded-xl transition-all cursor-pointer ${
                activeTab === 'earnings' ? 'text-amber-500 font-extrabold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Wallet className="w-4 h-4" />
              <span className="text-[10px]">Earnings</span>
            </button>

            <button
              id="tab-driver-profile"
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center justify-center gap-0.5 py-1 px-3 rounded-xl transition-all cursor-pointer ${
                activeTab === 'profile' ? 'text-amber-500 font-extrabold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <User className="w-4 h-4" />
              <span className="text-[10px]">Profile</span>
            </button>
          </div>
        </div>
      )}
    </DeviceFrame>
  );
};
