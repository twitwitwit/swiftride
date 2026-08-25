import React from 'react';
import { X, Users, Zap, ShieldCheck, ArrowRight, Car, CarFront, Bus, Bike } from 'lucide-react';
import { VEHICLE_OPTIONS } from '../../data/mockData';
import sedanImg from '../../assets/images/vehicle_sedan_1787613743970.jpg';
import suvImg from '../../assets/images/vehicle_suv_1787613759199.jpg';
import vanImg from '../../assets/images/vehicle_van_1787613773717.jpg';
import motoImg from '../../assets/images/vehicle_motorcycle_1787613788246.jpg';

interface VehicleOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectVehicle: (vehicleId: 'sedan' | 'suv' | 'van' | 'motorcycle') => void;
}

export const VehicleOptionsModal: React.FC<VehicleOptionsModalProps> = ({
  isOpen,
  onClose,
  onSelectVehicle
}) => {
  if (!isOpen) return null;

  const vehicleImages = {
    sedan: sedanImg,
    suv: suvImg,
    van: vanImg,
    motorcycle: motoImg
  };

  const vehicleSpecs = [
    {
      id: 'sedan' as const,
      name: 'Sedan',
      tagline: 'Budget friendly everyday travel',
      capacity: '1 - 4 Passengers',
      luggage: '2 Medium Suitcases',
      bestFor: 'Daily commutes, city errands, and airport transfers',
      features: ['Air-Conditioned', 'Top-rated 4.8+ drivers', 'Budget friendly']
    },
    {
      id: 'suv' as const,
      name: 'SUV',
      tagline: 'More space, premium comfort',
      capacity: '1 - 6 Passengers',
      luggage: '4 Large Bags',
      bestFor: 'Family trips, executive travel, and weekend outings',
      features: ['Spacious legroom', 'Extra cargo space', 'Smooth highway drive']
    },
    {
      id: 'van' as const,
      name: 'Van',
      tagline: 'Perfect for group rides & events',
      capacity: '1 - 10 Passengers',
      luggage: '6-8 Large Bags',
      bestFor: 'Group outings, team shuttles, provincial trips',
      features: ['Max passenger seating', 'High roof clearance', 'Luggage compartment']
    },
    {
      id: 'motorcycle' as const,
      name: 'Motorcycle',
      tagline: 'Fast, agile, and hassle-free',
      capacity: '1 Passenger',
      luggage: '1 Backpack',
      bestFor: 'Beating rush-hour traffic on EDSA & major corridors',
      features: ['Provided sanitized helmet', 'Fastest point-to-point', 'Lowest fare']
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in select-none">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl relative text-white flex flex-col">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-400/20 text-amber-400 px-2.5 py-0.5 rounded-full border border-amber-400/30">
              Fleet Catalog
            </span>
            <h3 className="text-2xl font-black text-white font-display mt-1">SwiftRide Vehicle Tiers</h3>
            <p className="text-slate-400 text-xs mt-0.5">Explore our certified vehicles tailored for every trip requirement</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Vehicle Cards Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-5">
          {vehicleSpecs.map((v) => {
            const data = VEHICLE_OPTIONS.find(opt => opt.id === v.id);
            return (
              <div
                key={v.id}
                className="bg-slate-950 rounded-2xl border border-slate-800 p-5 flex flex-col justify-between hover:border-amber-400/50 transition-all group shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-black text-white font-display group-hover:text-amber-400 transition-colors">
                        {v.name}
                      </span>
                      <span className="text-[10px] font-mono bg-slate-900 px-2 py-0.5 rounded text-amber-400 border border-slate-800 font-bold">
                        {v.capacity}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-emerald-400">Base: ₱{data?.baseFare}</p>
                      <p className="text-[10px] text-slate-400">+₱{data?.perKmRate}/km</p>
                    </div>
                  </div>

                  {/* Vehicle Image */}
                  <div className="h-32 bg-white/5 rounded-xl flex items-center justify-center p-2 mb-4 relative overflow-hidden">
                    <img
                      src={vehicleImages[v.id]}
                      alt={v.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                    />
                  </div>

                  <p className="text-xs text-slate-300 mb-3">{v.tagline}</p>

                  <div className="space-y-1.5 mb-4">
                    {v.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-400">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    onSelectVehicle(v.id);
                    onClose();
                  }}
                  className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Book {v.name} Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
