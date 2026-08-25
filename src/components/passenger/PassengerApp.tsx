import React, { useState } from 'react';
import { Home, Compass, Clock, MessageSquare, User } from 'lucide-react';
import { DeviceFrame } from '../common/DeviceFrame';
import { PassengerAuth } from './PassengerAuth';
import { PassengerHome } from './PassengerHome';
import { PassengerBookRide } from './PassengerBookRide';
import { PassengerTrips } from './PassengerTrips';
import { PassengerChat } from './PassengerChat';
import { PassengerProfile } from './PassengerProfile';
import { useRide } from '../../context/RideContext';
import { VehicleCategory } from '../../types';

interface PassengerAppProps {
  onSwitchToDriver?: () => void;
  standalone?: boolean;
}

export const PassengerApp: React.FC<PassengerAppProps> = ({ onSwitchToDriver, standalone = false }) => {
  const { activeRide } = useRide();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'home' | 'book' | 'history' | 'chat' | 'profile'>('home');
  const [bookDestination, setBookDestination] = useState<string | undefined>(undefined);
  const [bookVehicle, setBookVehicle] = useState<VehicleCategory | undefined>(undefined);
  const [targetChatRideId, setTargetChatRideId] = useState<string | undefined>(undefined);

  const handleNavigateToBook = (dest?: string, vehicle?: VehicleCategory) => {
    setBookDestination(dest);
    setBookVehicle(vehicle);
    setActiveTab('book');
  };

  const handleNavigateToChat = (rideId: string) => {
    setTargetChatRideId(rideId);
    setActiveTab('chat');
  };

  return (
    <DeviceFrame
      appType="passenger"
      title={
        !isAuthenticated ? undefined :
        activeTab === 'home' ? undefined :
        activeTab === 'book' ? 'Book a Ride' :
        activeTab === 'history' ? 'Ride History' :
        activeTab === 'chat' ? 'Driver Chat' : 'My Profile'
      }
      showBack={activeTab !== 'home'}
      onBack={() => setActiveTab('home')}
    >
      {!isAuthenticated ? (
        <PassengerAuth
          onSuccess={() => setIsAuthenticated(true)}
          onSwitchRole={(role) => {
            if (role === 'driver' && onSwitchToDriver) {
              onSwitchToDriver();
            }
          }}
        />
      ) : (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Main Tab Screen */}
          <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col">
            {activeTab === 'home' && (
              <PassengerHome
                onNavigateToBook={handleNavigateToBook}
              />
            )}

            {activeTab === 'book' && (
              <PassengerBookRide
                initialDestination={bookDestination}
                initialVehicle={bookVehicle}
                onNavigateToChat={handleNavigateToChat}
              />
            )}

            {activeTab === 'history' && (
              <PassengerTrips
                onRebookTrip={(pickup, dropoff) => {
                  setBookDestination(dropoff);
                  setActiveTab('book');
                }}
              />
            )}

            {activeTab === 'chat' && (
              <PassengerChat
                rideId={targetChatRideId}
                onBack={() => setActiveTab('home')}
              />
            )}

            {activeTab === 'profile' && (
              <PassengerProfile
                onLogout={() => setIsAuthenticated(false)}
                onNavigateToHistory={() => setActiveTab('history')}
              />
            )}
          </div>

          {/* Bottom Navigation Bar (Slide 4 & 5) */}
          <div className="bg-white border-t border-slate-200/80 px-2 py-2 flex items-center justify-around z-40 shrink-0 select-none">
            <button
              id="tab-passenger-home"
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center justify-center gap-0.5 py-1 px-3 rounded-xl transition-all cursor-pointer ${
                activeTab === 'home' ? 'text-amber-500 font-extrabold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Home className="w-4 h-4" />
              <span className="text-[10px]">Home</span>
            </button>

            <button
              id="tab-passenger-book"
              onClick={() => setActiveTab('book')}
              className={`flex flex-col items-center justify-center gap-0.5 py-1 px-3 rounded-xl transition-all cursor-pointer relative ${
                activeTab === 'book' ? 'text-amber-500 font-extrabold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span className="text-[10px]">Book Ride</span>
              {activeRide && (
                <span className="absolute top-1 right-2.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white animate-ping"></span>
              )}
            </button>

            <button
              id="tab-passenger-history"
              onClick={() => setActiveTab('history')}
              className={`flex flex-col items-center justify-center gap-0.5 py-1 px-3 rounded-xl transition-all cursor-pointer ${
                activeTab === 'history' ? 'text-amber-500 font-extrabold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span className="text-[10px]">History</span>
            </button>

            <button
              id="tab-passenger-chat"
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
              id="tab-passenger-profile"
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
