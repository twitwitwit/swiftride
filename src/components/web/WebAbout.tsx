import React from 'react';
import { 
  Target, 
  Flag, 
  ShieldCheck, 
  Handshake, 
  Lightbulb, 
  UserCheck, 
  Car, 
  MapPin, 
  CreditCard, 
  ClipboardList, 
  Sparkles,
  ArrowRight,
  HeartHandshake
} from 'lucide-react';
import heroCarImg from '../../assets/images/swiftride_car_hero_1787613717961.jpg';

interface WebAboutProps {
  onBookRide: () => void;
  onJoinDriver: () => void;
}

export const WebAbout: React.FC<WebAboutProps> = ({ onBookRide, onJoinDriver }) => {
  return (
    <div className="w-full flex flex-col bg-[#faf9f6] text-slate-900 select-none">
      {/* 1. Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10 lg:pt-10 lg:pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Content */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#f59e0b]">
              ABOUT US
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.08] font-display">
              Safe. Reliable. <span className="text-[#f59e0b]">Convenient.</span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed max-w-xl">
              SwiftRide is a technology-driven transportation platform committed to connecting passengers with trusted drivers and riders. We make every journey fast, safe, and convenient for everyone.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={onBookRide}
                className="px-6 py-3 bg-[#f59e0b] hover:bg-[#d97706] text-slate-950 font-black rounded-xl text-sm shadow-md transition-all cursor-pointer"
              >
                Experience SwiftRide
              </button>
              <button
                onClick={onJoinDriver}
                className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 font-bold rounded-xl text-sm shadow-sm transition-all cursor-pointer"
              >
                Drive With Us
              </button>
            </div>
          </div>

          {/* Right Image Showcase with Geometric Flourish */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-tr from-amber-100/50 via-slate-100 to-amber-50">
              <img
                src={heroCarImg}
                alt="SwiftRide Mission"
                className="w-full h-auto object-cover max-h-[380px] lg:max-h-[440px]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Mission & Vision Row */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mission Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex items-start gap-5">
            <div className="w-16 h-16 rounded-full bg-[#fef3c7] flex items-center justify-center text-slate-900 shrink-0 shadow-inner">
              <Target className="w-8 h-8 text-slate-900" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-950 font-display mb-2">Our Mission</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                To provide fast, safe, and reliable transportation services by connecting passengers with trusted drivers and riders through innovative technology, making every journey convenient, affordable, and comfortable for everyone.
              </p>
            </div>
          </div>

          {/* Vision Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex items-start gap-5">
            <div className="w-16 h-16 rounded-full bg-[#fef3c7] flex items-center justify-center text-slate-900 shrink-0 shadow-inner">
              <Flag className="w-8 h-8 text-slate-900" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-950 font-display mb-2">Our Vision</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                To become one of the most trusted ride-hailing platforms, recognized for delivering fast and safe travel while creating a positive impact in the communities we serve through innovation, reliability, and excellent customer service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Core Values */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 font-display">Our Core Values</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Value 1: Safety */}
          <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-start space-y-3 hover:border-amber-300 transition-colors">
            <div className="w-14 h-14 rounded-full bg-[#fef3c7] flex items-center justify-center text-slate-900 shrink-0 shadow-inner">
              <ShieldCheck className="w-7 h-7 text-slate-900" />
            </div>
            <h4 className="font-extrabold text-base text-slate-950 font-display">Safety</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              We prioritize the safety of our passengers and drivers in every trip.
            </p>
          </div>

          {/* Value 2: Reliability */}
          <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-start space-y-3 hover:border-amber-300 transition-colors">
            <div className="w-14 h-14 rounded-full bg-[#fef3c7] flex items-center justify-center text-slate-900 shrink-0 shadow-inner">
              <Handshake className="w-7 h-7 text-slate-900" />
            </div>
            <h4 className="font-extrabold text-base text-slate-950 font-display">Reliability</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              We are committed to providing dependable and consistent service.
            </p>
          </div>

          {/* Value 3: Innovation */}
          <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-start space-y-3 hover:border-amber-300 transition-colors">
            <div className="w-14 h-14 rounded-full bg-[#fef3c7] flex items-center justify-center text-slate-900 shrink-0 shadow-inner">
              <Lightbulb className="w-7 h-7 text-slate-900" />
            </div>
            <h4 className="font-extrabold text-base text-slate-950 font-display">Innovation</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              We leverage technology and innovation to improve every journey.
            </p>
          </div>

          {/* Value 4: Customer First */}
          <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-start space-y-3 hover:border-amber-300 transition-colors">
            <div className="w-14 h-14 rounded-full bg-[#fef3c7] flex items-center justify-center text-slate-900 shrink-0 shadow-inner">
              <HeartHandshake className="w-7 h-7 text-slate-900" />
            </div>
            <h4 className="font-extrabold text-base text-slate-950 font-display">Customer First</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              We put our customers first and strive to exceed their expectations.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Our Services */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 font-display">Our Services</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Service 1 */}
          <div className="bg-white rounded-3xl p-5 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-start space-y-2.5 hover:border-amber-300 transition-colors">
            <div className="w-12 h-12 rounded-full bg-[#fef3c7] flex items-center justify-center text-slate-900 shrink-0 shadow-inner">
              <Car className="w-6 h-6 text-slate-900" />
            </div>
            <h5 className="font-bold text-sm text-slate-950 font-display">Ride Booking</h5>
            <p className="text-[11px] text-slate-500 leading-tight">
              Book rides easily anytime, anywhere.
            </p>
          </div>

          {/* Service 2 */}
          <div className="bg-white rounded-3xl p-5 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-start space-y-2.5 hover:border-amber-300 transition-colors">
            <div className="w-12 h-12 rounded-full bg-[#fef3c7] flex items-center justify-center text-slate-900 shrink-0 shadow-inner">
              <MapPin className="w-6 h-6 text-slate-900" />
            </div>
            <h5 className="font-bold text-sm text-slate-950 font-display">Live Tracking</h5>
            <p className="text-[11px] text-slate-500 leading-tight">
              Track your ride in real-time for peace of mind.
            </p>
          </div>

          {/* Service 3 */}
          <div className="bg-white rounded-3xl p-5 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-start space-y-2.5 hover:border-amber-300 transition-colors">
            <div className="w-12 h-12 rounded-full bg-[#fef3c7] flex items-center justify-center text-slate-900 shrink-0 shadow-inner">
              <CreditCard className="w-6 h-6 text-slate-900" />
            </div>
            <h5 className="font-bold text-sm text-slate-950 font-display">Cashless Payments</h5>
            <p className="text-[11px] text-slate-500 leading-tight">
              Enjoy secure and convenient cashless payment options.
            </p>
          </div>

          {/* Service 4 */}
          <div className="bg-white rounded-3xl p-5 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-start space-y-2.5 hover:border-amber-300 transition-colors">
            <div className="w-12 h-12 rounded-full bg-[#fef3c7] flex items-center justify-center text-slate-900 shrink-0 shadow-inner">
              <ShieldCheck className="w-6 h-6 text-slate-900" />
            </div>
            <h5 className="font-bold text-sm text-slate-950 font-display">Driver Verification</h5>
            <p className="text-[11px] text-slate-500 leading-tight">
              All drivers are verified and background-checked for your safety.
            </p>
          </div>

          {/* Service 5 */}
          <div className="bg-white rounded-3xl p-5 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-start space-y-2.5 hover:border-amber-300 transition-colors">
            <div className="w-12 h-12 rounded-full bg-[#fef3c7] flex items-center justify-center text-slate-900 shrink-0 shadow-inner">
              <ClipboardList className="w-6 h-6 text-slate-900" />
            </div>
            <h5 className="font-bold text-sm text-slate-950 font-display">Ride History</h5>
            <p className="text-[11px] text-slate-500 leading-tight">
              View and manage your past trips with ease.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
