import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Navigation, 
  Car, 
  CarFront, 
  Bus, 
  Bike, 
  ArrowRight, 
  CreditCard, 
  ShieldCheck, 
  Tag, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { useRide } from '../../context/RideContext';
import { POPULAR_LOCATIONS, VEHICLE_OPTIONS } from '../../data/mockData';
import { LocationPoint, VehicleCategory } from '../../types';

interface QuickBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialVehicle?: VehicleCategory;
}

export const QuickBookModal: React.FC<QuickBookModalProps> = ({ 
  isOpen, 
  onClose, 
  initialVehicle = 'sedan' 
}) => {
  const { requestRide, setCurrentView, showNotification } = useRide();
  
  const [pickup, setPickup] = useState<LocationPoint>({
    name: POPULAR_LOCATIONS[0].name.split(',')[0],
    address: POPULAR_LOCATIONS[0].name,
    lat: POPULAR_LOCATIONS[0].lat,
    lng: POPULAR_LOCATIONS[0].lng
  });

  const [dropoff, setDropoff] = useState<LocationPoint>({
    name: POPULAR_LOCATIONS[1].name.split(',')[0],
    address: POPULAR_LOCATIONS[1].name,
    lat: POPULAR_LOCATIONS[1].lat,
    lng: POPULAR_LOCATIONS[1].lng
  });

  const [selectedVehicle, setSelectedVehicle] = useState<VehicleCategory>(initialVehicle);
  const [paymentMethod, setPaymentMethod] = useState<'GCash' | 'Cash' | 'Visa' | 'Wallet'>('GCash');
  const [promoInput, setPromoInput] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  if (!isOpen) return null;

  // Approximate distance calculation
  const distanceKm = 12.8;
  const durationMins = 25;

  const currentOption = VEHICLE_OPTIONS.find(v => v.id === selectedVehicle) || VEHICLE_OPTIONS[0];
  const baseFare = currentOption.baseFare + (distanceKm * currentOption.perKmRate);
  const discountAmount = isPromoApplied ? Math.round(baseFare * (discountPercent / 100)) : 0;
  const finalFare = Math.max(50, baseFare - discountAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const code = promoInput.trim().toUpperCase();
    if (code === 'SWIFT20' || code === 'WELCOME' || code === 'FIRST') {
      setDiscountPercent(20);
      setIsPromoApplied(true);
      showNotification('Promo Applied!', '20% discount applied to your ride fare.', 'success');
    } else {
      showNotification('Invalid Promo Code', 'Try using code "SWIFT20" for 20% off.', 'warning');
    }
  };

  const handleConfirmRide = () => {
    requestRide({
      pickup,
      dropoff,
      vehicleType: selectedVehicle,
      fare: finalFare,
      originalFare: baseFare,
      discount: discountAmount,
      promoCode: isPromoApplied ? promoInput.toUpperCase() : undefined,
      distanceKm,
      durationMins,
      paymentMethod
    });

    onClose();
    // Switch to passenger view to see live dispatch tracking
    setCurrentView('passenger');
    showNotification('Ride Booked Successfully!', 'Connecting with nearby drivers in Metro Manila.', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in select-none">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative text-white max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-400/20 text-amber-400 px-2 py-0.5 rounded-full border border-amber-400/30">
                Web Booking
              </span>
              <span className="text-slate-400 text-xs">• Instant Dispatch</span>
            </div>
            <h3 className="text-xl font-black text-white font-display mt-1">Book Your SwiftRide</h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {/* Pickup & Dropoff Inputs */}
          <div className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
            {/* Pickup */}
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                Pickup Location
              </label>
              <select
                value={pickup.address}
                onChange={(e) => {
                  const loc = POPULAR_LOCATIONS.find(l => l.name === e.target.value);
                  if (loc) {
                    setPickup({
                      name: loc.name.split(',')[0],
                      address: loc.name,
                      lat: loc.lat,
                      lng: loc.lng
                    });
                  }
                }}
                className="w-full bg-slate-900 border border-slate-700 text-slate-100 text-xs rounded-xl p-3 focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                {POPULAR_LOCATIONS.map((loc, idx) => (
                  <option key={`p-${idx}`} value={loc.name}>
                    📍 {loc.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Dropoff */}
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                Drop-off Destination
              </label>
              <select
                value={dropoff.address}
                onChange={(e) => {
                  const loc = POPULAR_LOCATIONS.find(l => l.name === e.target.value);
                  if (loc) {
                    setDropoff({
                      name: loc.name.split(',')[0],
                      address: loc.name,
                      lat: loc.lat,
                      lng: loc.lng
                    });
                  }
                }}
                className="w-full bg-slate-900 border border-slate-700 text-slate-100 text-xs rounded-xl p-3 focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                {POPULAR_LOCATIONS.map((loc, idx) => (
                  <option key={`d-${idx}`} value={loc.name}>
                    🏁 {loc.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Vehicle Selection Grid */}
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
              Select Vehicle Tier
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'sedan' as const, name: 'Sedan', seats: '1-4 Pass', rate: '₱120 + ₱15/km', icon: Car },
                { id: 'suv' as const, name: 'SUV', seats: '1-6 Pass', rate: '₱180 + ₱22/km', icon: CarFront },
                { id: 'van' as const, name: 'Van', seats: '1-10 Pass', rate: '₱250 + ₱30/km', icon: Bus },
                { id: 'motorcycle' as const, name: 'Motorcycle', seats: '1 Pass', rate: '₱80 + ₱10/km', icon: Bike },
              ].map((veh) => {
                const IconComponent = veh.icon;
                const isSelected = selectedVehicle === veh.id;
                return (
                  <button
                    key={veh.id}
                    onClick={() => setSelectedVehicle(veh.id)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-400 shadow-md ring-1 ring-amber-400'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isSelected ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{veh.name}</p>
                      <p className="text-[10px] text-slate-400">{veh.seats}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Payment & Promo Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Payment Method */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Payment Option
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['GCash', 'Cash', 'Visa', 'Wallet'] as const).map((method) => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer text-center ${
                      paymentMethod === method
                        ? 'bg-amber-400 text-slate-950 border-amber-400'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    {method === 'GCash' ? '💙 GCash' : method === 'Cash' ? '💵 Cash' : method === 'Visa' ? '💳 Card' : '👛 Wallet'}
                  </button>
                ))}
              </div>
            </div>

            {/* Promo Code Input */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Promo Code
              </label>
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. SWIFT20"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-700 px-3 py-2 rounded-xl text-xs text-white uppercase placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs transition-colors cursor-pointer shrink-0"
                >
                  Apply
                </button>
              </form>
              {isPromoApplied && (
                <p className="text-[11px] text-emerald-400 flex items-center gap-1 mt-2">
                  <Sparkles className="w-3.5 h-3.5" /> 20% discount applied to your fare!
                </p>
              )}
            </div>
          </div>

          {/* Fare Summary & Estimation */}
          <div className="bg-gradient-to-br from-slate-950 to-slate-900 p-4 rounded-2xl border border-amber-500/20 flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase font-mono text-slate-400 tracking-wider">Estimated Fare</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-amber-400 font-display">₱{finalFare.toFixed(2)}</span>
                {discountAmount > 0 && (
                  <span className="text-xs text-slate-500 line-through">₱{baseFare.toFixed(2)}</span>
                )}
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">Est. {distanceKm} km • ~{durationMins} mins travel time</p>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" /> Guaranteed Rate
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-4 shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-3 rounded-xl border border-slate-700 text-slate-300 hover:text-white font-bold text-xs cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmRide}
            className="flex-1 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-sm uppercase tracking-wider transition-colors shadow-xl flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Confirm & Dispatch Driver</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
