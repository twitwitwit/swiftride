import React, { useState } from 'react';
import { 
  Car, 
  ShieldCheck, 
  Tag, 
  MapPin, 
  Headphones, 
  ChevronRight, 
  ChevronLeft, 
  Users, 
  Star, 
  ArrowRight,
  Sparkles,
  Navigation,
  Check
} from 'lucide-react';
import heroCarImg from '../../assets/images/swiftride_car_hero_1787613717961.jpg';
import sedanImg from '../../assets/images/vehicle_sedan_1787613743970.jpg';
import suvImg from '../../assets/images/vehicle_suv_1787613759199.jpg';
import vanImg from '../../assets/images/vehicle_van_1787613773717.jpg';
import motoImg from '../../assets/images/vehicle_motorcycle_1787613788246.jpg';
import { TESTIMONIALS } from '../../data/mockData';
import { VehicleCategory } from '../../types';

interface WebHomeProps {
  onBookRide: (category?: VehicleCategory) => void;
  onViewAllOptions: () => void;
  onOpenHelp: () => void;
}

export const WebHome: React.FC<WebHomeProps> = ({
  onBookRide,
  onViewAllOptions,
  onOpenHelp
}) => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const currentReview = TESTIMONIALS[activeTestimonial];

  return (
    <div className="w-full flex flex-col bg-[#faf9f6] text-slate-900 select-none">
      {/* 1. Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10 lg:pt-10 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-4">
            {/* Pill Tag */}
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#f59e0b] text-slate-950 font-bold text-xs sm:text-sm tracking-wide shadow-sm">
              Safe. Reliable. Convenient.
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.08] font-display">
              FAST AND SAFE <span className="text-[#f59e0b]">TRAVEL</span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-600 text-base sm:text-lg lg:text-xl font-medium max-w-lg leading-relaxed">
              Book safe, affordable, and reliable rides anytime, anywhere.
            </p>

            {/* CTA Button */}
            <div className="pt-2">
              <button
                id="btn-hero-book-now"
                onClick={() => onBookRide('sedan')}
                className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#f59e0b] hover:bg-[#d97706] text-slate-950 font-black rounded-xl text-base shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Car className="w-5 h-5 fill-current" />
                <span>Book a Ride Now</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Hero Image Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-tr from-amber-100/50 via-slate-100 to-amber-50">
              <img
                src={heroCarImg}
                alt="SwiftRide Fast and Safe Travel"
                className="w-full h-auto object-cover max-h-[380px] lg:max-h-[440px] transform hover:scale-[1.02] transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-amber-500/30 text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>LIVE DISPATCH READY</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Value Propositions Bar */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Prop 1 */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#fef3c7] flex items-center justify-center text-slate-900 shrink-0 shadow-inner">
              <ShieldCheck className="w-7 h-7 text-slate-900" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-950 font-display">Verified Drivers</h3>
              <p className="text-xs text-slate-500 leading-snug mt-0.5">
                All drivers are verified and background-checked for your safety.
              </p>
            </div>
          </div>

          {/* Prop 2 */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#fef3c7] flex items-center justify-center text-slate-900 shrink-0 shadow-inner">
              <Tag className="w-6 h-6 text-slate-900" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-950 font-display">Affordable Fares</h3>
              <p className="text-xs text-slate-500 leading-snug mt-0.5">
                Enjoy competitive prices with no hidden fees.
              </p>
            </div>
          </div>

          {/* Prop 3 */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#fef3c7] flex items-center justify-center text-slate-900 shrink-0 shadow-inner">
              <MapPin className="w-6 h-6 text-slate-900" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-950 font-display">Live Ride Tracking</h3>
              <p className="text-xs text-slate-500 leading-snug mt-0.5">
                Track your ride in real-time for added peace of mind.
              </p>
            </div>
          </div>

          {/* Prop 4 */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#fef3c7] flex items-center justify-center text-slate-900 shrink-0 shadow-inner">
              <Headphones className="w-6 h-6 text-slate-900" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-950 font-display">24/7 Support</h3>
              <p className="text-xs text-slate-500 leading-snug mt-0.5">
                We're here to help you anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Three-Column Bento Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Column A: Choose Your Ride (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-950 font-display mb-4">Choose Your Ride</h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 mb-4">
                {/* Sedan */}
                <div 
                  onClick={() => onBookRide('sedan')}
                  className="bg-[#faf9f6] p-3 rounded-2xl border border-slate-200/80 hover:border-amber-400 transition-all cursor-pointer group flex flex-col items-center text-center"
                >
                  <div className="h-16 w-full flex items-center justify-center mb-1">
                    <img src={sedanImg} alt="Sedan" className="max-h-full object-contain group-hover:scale-105 transition-transform" />
                  </div>
                  <h4 className="font-black text-sm text-slate-950 font-display group-hover:text-amber-600 transition-colors">Sedan</h4>
                  <p className="text-[10px] font-bold text-slate-600 flex items-center gap-1 mt-0.5">
                    <Users className="w-3 h-3" /> 1 - 4 Passengers
                  </p>
                  <span className="text-[10px] text-slate-400">Budget friendly</span>
                </div>

                {/* SUV */}
                <div 
                  onClick={() => onBookRide('suv')}
                  className="bg-[#faf9f6] p-3 rounded-2xl border border-slate-200/80 hover:border-amber-400 transition-all cursor-pointer group flex flex-col items-center text-center"
                >
                  <div className="h-16 w-full flex items-center justify-center mb-1">
                    <img src={suvImg} alt="SUV" className="max-h-full object-contain group-hover:scale-105 transition-transform" />
                  </div>
                  <h4 className="font-black text-sm text-slate-950 font-display group-hover:text-amber-600 transition-colors">SUV</h4>
                  <p className="text-[10px] font-bold text-slate-600 flex items-center gap-1 mt-0.5">
                    <Users className="w-3 h-3" /> 1 - 6 Passengers
                  </p>
                  <span className="text-[10px] text-slate-400">More space, more comfort</span>
                </div>

                {/* Van */}
                <div 
                  onClick={() => onBookRide('van')}
                  className="bg-[#faf9f6] p-3 rounded-2xl border border-slate-200/80 hover:border-amber-400 transition-all cursor-pointer group flex flex-col items-center text-center"
                >
                  <div className="h-16 w-full flex items-center justify-center mb-1">
                    <img src={vanImg} alt="Van" className="max-h-full object-contain group-hover:scale-105 transition-transform" />
                  </div>
                  <h4 className="font-black text-sm text-slate-950 font-display group-hover:text-amber-600 transition-colors">Van</h4>
                  <p className="text-[10px] font-bold text-slate-600 flex items-center gap-1 mt-0.5">
                    <Users className="w-3 h-3" /> 1 - 10 Passengers
                  </p>
                  <span className="text-[10px] text-slate-400">Perfect for group rides</span>
                </div>

                {/* Motorcycle */}
                <div 
                  onClick={() => onBookRide('motorcycle')}
                  className="bg-[#faf9f6] p-3 rounded-2xl border border-slate-200/80 hover:border-amber-400 transition-all cursor-pointer group flex flex-col items-center text-center"
                >
                  <div className="h-16 w-full flex items-center justify-center mb-1">
                    <img src={motoImg} alt="Motorcycle" className="max-h-full object-contain group-hover:scale-105 transition-transform" />
                  </div>
                  <h4 className="font-black text-sm text-slate-950 font-display group-hover:text-amber-600 transition-colors">Motorcycle</h4>
                  <p className="text-[10px] font-bold text-slate-600 flex items-center gap-1 mt-0.5">
                    <Users className="w-3 h-3" /> 1 Passenger
                  </p>
                  <span className="text-[10px] text-slate-400">Fast and hassle-free</span>
                </div>
              </div>
            </div>

            <div className="pt-2 text-right border-t border-slate-100">
              <button
                id="btn-view-all-ride-options"
                onClick={onViewAllOptions}
                className="text-xs font-black text-amber-500 hover:text-amber-600 inline-flex items-center gap-1 cursor-pointer"
              >
                <span>View all ride options</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Column B: How It Works (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-950 font-display mb-5">How It Works</h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-4">
                {/* Step 1 */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-[#fef3c7] flex items-center justify-center text-slate-900 mb-2 relative shadow-inner">
                    <MapPin className="w-5 h-5 text-slate-900" />
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#f59e0b] text-slate-950 font-black text-[10px] rounded-full flex items-center justify-center">
                      1
                    </span>
                  </div>
                  <h5 className="font-bold text-xs text-slate-950">Choose Pickup</h5>
                  <p className="text-[11px] text-slate-500 leading-tight mt-0.5">Enter your pickup location.</p>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-[#fef3c7] flex items-center justify-center text-slate-900 mb-2 relative shadow-inner">
                    <Navigation className="w-5 h-5 text-slate-900" />
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#f59e0b] text-slate-950 font-black text-[10px] rounded-full flex items-center justify-center">
                      2
                    </span>
                  </div>
                  <h5 className="font-bold text-xs text-slate-950">Select Destination</h5>
                  <p className="text-[11px] text-slate-500 leading-tight mt-0.5">Enter your drop-off location.</p>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-[#fef3c7] flex items-center justify-center text-slate-900 mb-2 relative shadow-inner">
                    <Car className="w-5 h-5 text-slate-900" />
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#f59e0b] text-slate-950 font-black text-[10px] rounded-full flex items-center justify-center">
                      3
                    </span>
                  </div>
                  <h5 className="font-bold text-xs text-slate-950">Choose Vehicle</h5>
                  <p className="text-[11px] text-slate-500 leading-tight mt-0.5">Pick the ride that suits you.</p>
                </div>

                {/* Step 4 */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-[#fef3c7] flex items-center justify-center text-slate-900 mb-2 relative shadow-inner">
                    <Check className="w-5 h-5 text-slate-900" />
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#f59e0b] text-slate-950 font-black text-[10px] rounded-full flex items-center justify-center">
                      4
                    </span>
                  </div>
                  <h5 className="font-bold text-xs text-slate-950">Confirm Ride</h5>
                  <p className="text-[11px] text-slate-500 leading-tight mt-0.5">Confirm your booking and enjoy the ride.</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-center">
              <button
                onClick={() => onBookRide('sedan')}
                className="w-full py-2.5 bg-[#fef3c7] hover:bg-[#fde68a] text-slate-950 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Start Step 1: Book Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Column C: What Our Customers Say (3 cols) */}
          <div className="lg:col-span-3 bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-black text-slate-950 font-display">What Our Customers Say</h2>
                <span className="text-[#f59e0b] text-4xl font-serif font-black leading-none select-none">“</span>
              </div>

              <div className="flex items-start gap-3 mb-3">
                <img
                  src={currentReview.avatar}
                  alt={currentReview.author}
                  className="w-12 h-12 rounded-full object-cover border-2 border-amber-400 shrink-0 shadow-md"
                />
                <div>
                  {/* 5 Stars */}
                  <div className="flex items-center gap-0.5 text-[#f59e0b] mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs font-bold text-slate-950">-{currentReview.author}</p>
                  <p className="text-[10px] text-slate-500">{currentReview.location}</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed italic bg-[#faf9f6] p-3 rounded-2xl border border-slate-100">
                "{currentReview.quote}"
              </p>
            </div>

            {/* Slider Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-3">
              <button
                id="btn-testimonial-prev"
                onClick={prevTestimonial}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-1.5">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                      activeTestimonial === idx ? 'w-5 bg-[#f59e0b]' : 'bg-slate-300'
                    }`}
                  />
                ))}
              </div>

              <button
                id="btn-testimonial-next"
                onClick={nextTestimonial}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
