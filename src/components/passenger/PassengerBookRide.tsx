import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Plus, 
  Calendar, 
  Users, 
  SlidersHorizontal, 
  Tag, 
  CreditCard, 
  ChevronRight, 
  Phone, 
  MessageSquare, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  X,
  AlertCircle,
  Car,
  Bike,
  Bus
} from 'lucide-react';
import { useRide } from '../../context/RideContext';
import { POPULAR_LOCATIONS, VEHICLE_OPTIONS } from '../../data/mockData';
import { LocationPoint, VehicleCategory } from '../../types';
import { InteractiveMap } from '../common/InteractiveMap';

interface PassengerBookRideProps {
  initialDestination?: string;
  initialVehicle?: VehicleCategory;
  onNavigateToChat: (rideId: string) => void;
}

export const PassengerBookRide: React.FC<PassengerBookRideProps> = ({
  initialDestination,
  initialVehicle = 'sedan',
  onNavigateToChat
}) => {
  const { 
    passenger, 
    activeRide, 
    requestRide, 
    cancelActiveRide, 
    showNotification 
  } = useRide();

  // Booking form state
  const [pickup, setPickup] = useState<LocationPoint>({
    name: 'Bagong Silang',
    address: 'Bagong Silang, Caloocan City',
    lat: 14.7735,
    lng: 121.0428
  });

  const [dropoff, setDropoff] = useState<LocationPoint>(() => {
    if (initialDestination) {
      const match = POPULAR_LOCATIONS.find(l => l.name.toLowerCase().includes(initialDestination.toLowerCase()));
      if (match) return { name: match.name.split(',')[0], address: match.name, lat: match.lat, lng: match.lng };
    }
    return {
      name: 'SM North EDSA',
      address: 'SM North EDSA, Quezon City',
      lat: 14.6565,
      lng: 121.0289
    };
  });

  const [selectedVehicle, setSelectedVehicle] = useState<VehicleCategory>(initialVehicle);
  const [paymentMethod, setPaymentMethod] = useState<'GCash' | 'Visa' | 'Cash' | 'Wallet'>('GCash');
  const [promoCode, setPromoCode] = useState<string>('TNV550');
  const [promoApplied, setPromoApplied] = useState<boolean>(true);
  const [passengersCount, setPassengersCount] = useState<number>(1);
  const [showLocationPicker, setShowLocationPicker] = useState<'pickup' | 'dropoff' | null>(null);
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const [cancelReason, setCancelReason] = useState<string>('Driver taking too long');

  // Calculate fare
  const currentVehicle = VEHICLE_OPTIONS.find(v => v.id === selectedVehicle) || VEHICLE_OPTIONS[0];
  const distanceKm = 14.2;
  const baseFare = currentVehicle.baseFare;
  const rawFare = baseFare + (distanceKm - 2) * (currentVehicle.perKmRate * 0.4);
  const discountAmount = promoApplied ? 50 : 0;
  const finalFare = Math.max(rawFare - discountAmount, 60);

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'TNV550' || promoCode.toUpperCase() === 'SWIFT50') {
      setPromoApplied(true);
      showNotification('Promo Applied', '₱50 discount applied successfully!', 'success');
    } else {
      showNotification('Invalid Promo', 'Please check promo code and try again.', 'warning');
    }
  };

  const handleConfirmBooking = () => {
    requestRide({
      pickup,
      dropoff,
      vehicleType: selectedVehicle,
      fare: Math.round(finalFare),
      originalFare: Math.round(rawFare),
      discount: discountAmount,
      promoCode: promoApplied ? promoCode : undefined,
      distanceKm,
      durationMins: 28,
      paymentMethod
    });
  };

  // If there's an active ride for this passenger, render the Live Tracking View (Slide 5)
  if (activeRide && activeRide.passengerId === passenger.id && activeRide.status !== 'completed' && activeRide.status !== 'cancelled') {
    return (
      <div className="flex-1 flex flex-col bg-slate-50 relative overflow-y-auto">
        {/* Top Interactive Map showing real-time route & car movement */}
        <div className="relative">
          <InteractiveMap
            pickup={activeRide.pickup}
            dropoff={activeRide.dropoff}
            routeProgress={activeRide.routeProgress || 20}
            driverName={activeRide.driverName}
            driverPlate={activeRide.driverPlate}
            height="h-72"
          />
        </div>

        {/* Live Trip Status Card */}
        <div className="p-4 space-y-3 flex-1 flex flex-col">
          {/* Status Header */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                activeRide.status === 'requested' ? 'bg-amber-100 text-amber-800 animate-pulse' :
                activeRide.status === 'accepted' ? 'bg-blue-100 text-blue-800' :
                activeRide.status === 'arriving' ? 'bg-emerald-100 text-emerald-800 animate-bounce' :
                'bg-indigo-100 text-indigo-800'
              }`}>
                {activeRide.status === 'requested' ? 'Searching for Driver...' :
                 activeRide.status === 'accepted' ? 'Driver on the way' :
                 activeRide.status === 'arriving' ? 'Driver has arrived!' : 'Trip in progress'}
              </span>
              <h3 className="text-base font-extrabold text-slate-900 mt-1 font-display">
                {activeRide.status === 'requested' ? 'Connecting to nearest vehicle' :
                 activeRide.status === 'arriving' ? 'Driver is at pickup point' :
                 `Arriving in ~${activeRide.etaMins || 4} mins`}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-sm font-black text-amber-600">₱{activeRide.fare.toFixed(2)}</span>
              <p className="text-[10px] text-slate-500 font-medium">{activeRide.paymentMethod}</p>
            </div>
          </div>

          {/* Driver Card if accepted */}
          {activeRide.driverName ? (
            <div className="bg-white p-4 rounded-2xl border border-amber-200/80 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img 
                    src={activeRide.driverAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120'} 
                    alt={activeRide.driverName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-amber-400 shadow-sm"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{activeRide.driverName}</h4>
                    <p className="text-xs text-slate-500 font-medium">{activeRide.driverVehicle}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] bg-slate-900 text-amber-400 font-extrabold px-2 py-0.5 rounded">
                        {activeRide.driverPlate}
                      </span>
                      <span className="text-xs font-bold text-amber-600">★ {activeRide.driverRating || 4.9}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Call & Chat Action buttons */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => onNavigateToChat(activeRide.id)}
                    className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 hover:bg-amber-200 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                    title="Open Live Chat"
                  >
                    <MessageSquare className="w-5 h-5" />
                  </button>
                  <a
                    href={`tel:${activeRide.driverPhone || '09178881234'}`}
                    className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 hover:bg-emerald-200 flex items-center justify-center shadow-xs transition-colors"
                    title="Call Driver"
                  >
                    <Phone className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Live Route endpoints */}
              <div className="pt-2 border-t border-slate-100 text-xs space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <p className="text-slate-600 font-medium truncate">Pickup: <strong className="text-slate-900">{activeRide.pickup.name}</strong></p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                  <p className="text-slate-600 font-medium truncate">Drop-off: <strong className="text-slate-900">{activeRide.dropoff.name}</strong></p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center animate-spin">
                <Car className="w-4 h-4 text-slate-950" />
              </div>
              <p className="text-xs text-amber-900 font-semibold">
                Finding the closest verified driver in Caloocan / Quezon City area...
              </p>
            </div>
          )}

          {/* Safety & Cancel Options */}
          <div className="flex items-center gap-2 pt-2 mt-auto">
            <button
              onClick={() => showNotification('Safety Alert Activated', 'Emergency contacts and 24/7 SwiftRide safety center notified.', 'warning')}
              className="flex-1 py-2.5 bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Safety SOS</span>
            </button>
            <button
              onClick={() => setShowCancelModal(true)}
              className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors"
            >
              Cancel Ride
            </button>
          </div>
        </div>

        {/* Cancel Ride Modal */}
        {showCancelModal && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl p-5 w-full max-w-xs space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-slate-900 font-display text-base">Cancel Booking?</h4>
                <button onClick={() => setShowCancelModal(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-slate-500">Please select a reason for cancelling your ride:</p>
              <div className="space-y-2">
                {[
                  'Driver taking too long',
                  'Changed my mind',
                  'Booked by mistake',
                  'Found alternative transport'
                ].map(r => (
                  <label key={r} className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl text-xs text-slate-700 cursor-pointer hover:bg-amber-50">
                    <input 
                      type="radio" 
                      name="cancel_reason" 
                      checked={cancelReason === r} 
                      onChange={() => setCancelReason(r)}
                      className="text-amber-500 focus:ring-amber-400"
                    />
                    <span>{r}</span>
                  </label>
                ))}
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold"
                >
                  Keep Ride
                </button>
                <button
                  onClick={() => {
                    cancelActiveRide(activeRide.id, cancelReason);
                    setShowCancelModal(false);
                  }}
                  className="flex-1 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold shadow hover:bg-rose-700"
                >
                  Confirm Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Booking Configuration Screen (Slide 4)
  return (
    <div className="flex-1 flex flex-col p-4 bg-slate-50 overflow-y-auto space-y-4">
      {/* Pickup & Destination Inputs (Slide 4) */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm space-y-2.5">
        {/* Pickup Input */}
        <div>
          <label className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">Pickup Location</label>
          <div 
            onClick={() => setShowLocationPicker('pickup')}
            className="flex items-center gap-2.5 p-2 bg-slate-50 rounded-xl border border-slate-200 mt-1 cursor-pointer hover:border-amber-400"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></div>
            <input 
              type="text" 
              readOnly 
              value={pickup.address}
              className="bg-transparent text-xs font-bold text-slate-900 w-full cursor-pointer focus:outline-none truncate"
            />
          </div>
        </div>

        {/* Dropoff Input */}
        <div>
          <label className="text-[10px] font-bold text-red-700 uppercase tracking-wider">Drop-off Location</label>
          <div 
            onClick={() => setShowLocationPicker('dropoff')}
            className="flex items-center gap-2.5 p-2 bg-slate-50 rounded-xl border border-slate-200 mt-1 cursor-pointer hover:border-amber-400"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0"></div>
            <input 
              type="text" 
              readOnly 
              value={dropoff.address}
              className="bg-transparent text-xs font-bold text-slate-900 w-full cursor-pointer focus:outline-none truncate"
            />
          </div>
        </div>

        {/* Quick Location Shortcuts (Slide 4) */}
        <div className="flex items-center gap-2 pt-1 overflow-x-auto no-scrollbar">
          {(passenger?.savedPlaces || []).slice(0, 4).map((p) => (
            <button
              key={p.id}
              onClick={() => setDropoff({ name: p.title, address: p.address, lat: p.lat, lng: p.lng })}
              className="px-2.5 py-1 bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors"
            >
              {p.label === 'Home' ? '🏠 Home' : p.label === 'Work' ? '💼 Work' : '⭐ ' + p.title.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Map Route Preview */}
      <InteractiveMap
        pickup={pickup}
        dropoff={dropoff}
        routeProgress={0}
        vehicleType={selectedVehicle}
        height="h-36"
      />

      {/* Date, Passengers, Ride Preferences (Slide 4) */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-1.5 text-slate-500 mb-1">
            <Calendar className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-[10px] font-bold">Date & Time</span>
          </div>
          <p className="text-xs font-bold text-slate-900">Now (Instant)</p>
        </div>

        <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-1.5 text-slate-500 mb-1">
            <Users className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-[10px] font-bold">Passengers</span>
          </div>
          <p className="text-xs font-bold text-slate-900">1 Passenger</p>
        </div>

        <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-1.5 text-slate-500 mb-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-[10px] font-bold">Preferences</span>
          </div>
          <p className="text-xs font-bold text-slate-900">Quiet ride</p>
        </div>
      </div>

      {/* Choose a Ride Vehicles List (Slide 4) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold text-slate-900 tracking-tight uppercase">Choose a ride</h3>
          <span className="text-[10px] text-slate-400">Estimated fares</span>
        </div>

        <div className="space-y-2">
          {VEHICLE_OPTIONS.map((v) => {
            const isSelected = selectedVehicle === v.id;
            const fare = Math.round(v.baseFare + (distanceKm - 2) * (v.perKmRate * 0.4));
            
            return (
              <div
                key={v.id}
                onClick={() => setSelectedVehicle(v.id)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected 
                    ? 'bg-amber-50/70 border-amber-500 shadow-sm ring-1 ring-amber-400' 
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-600'}`}>
                    {v.id === 'motorcycle' ? <Bike className="w-5 h-5" /> : v.id === 'van' ? <Bus className="w-5 h-5" /> : <Car className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-extrabold text-slate-900">{v.name}</h4>
                      <span className="text-[10px] text-slate-400 font-medium">({v.capacity})</span>
                    </div>
                    <p className="text-[10px] text-slate-500 line-clamp-1">{v.description}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-black text-slate-900">₱{fare}</span>
                  <p className="text-[10px] text-slate-400">{v.etaMins}-{v.etaMins + 2} min</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Payment Method & Promo Code (Slide 4) */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-bold text-slate-800">Payment:</span>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value as any)}
              className="bg-slate-100 text-xs font-bold text-slate-900 rounded-lg px-2 py-1 focus:outline-none"
            >
              <option value="GCash">GCash</option>
              <option value="Visa">VISA (•••• 1234)</option>
              <option value="Wallet">Wallet (₱{passenger.walletBalance.toFixed(2)})</option>
              <option value="Cash">Cash to Driver</option>
            </select>
          </div>

          <div className="flex items-center gap-1">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Promo code"
              className="w-20 px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-[10px] uppercase font-bold"
            />
            <button
              onClick={handleApplyPromo}
              className="px-2 py-1 bg-slate-900 text-amber-400 text-[10px] font-bold rounded-lg"
            >
              Apply
            </button>
          </div>
        </div>

        {promoApplied && (
          <div className="flex items-center justify-between text-[11px] bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg">
            <span>Promo <strong>TNV550</strong> active</span>
            <span className="font-bold">-₱50.00</span>
          </div>
        )}
      </div>

      {/* Estimated Fare & Confirm Button (Slide 4) */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-500 font-medium">Estimated Fare</span>
          <div className="text-right">
            <span className="text-base font-black text-slate-900">₱{Math.round(finalFare)}</span>
            {promoApplied && (
              <span className="text-xs text-slate-400 line-through ml-1.5">₱{Math.round(rawFare)}</span>
            )}
          </div>
        </div>

        <button
          onClick={handleConfirmBooking}
          id="btn-confirm-booking"
          className="w-full py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-black rounded-2xl text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
        >
          Confirm Booking
        </button>
      </div>

      {/* Location Picker Drawer */}
      {showLocationPicker && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex flex-col justify-end z-50">
          <div className="bg-white rounded-t-3xl p-4 max-h-[75vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="font-extrabold text-sm text-slate-900 font-display">
                Select {showLocationPicker === 'pickup' ? 'Pickup Location' : 'Destination'}
              </h4>
              <button onClick={() => setShowLocationPicker(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100 overflow-y-auto no-scrollbar py-2">
              {POPULAR_LOCATIONS.map((loc) => (
                <div
                  key={loc.name}
                  onClick={() => {
                    const selected: LocationPoint = {
                      name: loc.name.split(',')[0],
                      address: loc.name,
                      lat: loc.lat,
                      lng: loc.lng
                    };
                    if (showLocationPicker === 'pickup') {
                      setPickup(selected);
                    } else {
                      setDropoff(selected);
                    }
                    setShowLocationPicker(null);
                  }}
                  className="py-2.5 flex items-center gap-3 cursor-pointer hover:bg-amber-50/50 px-2 rounded-xl"
                >
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">{loc.name.split(',')[0]}</p>
                    <p className="text-[10px] text-slate-500">{loc.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
