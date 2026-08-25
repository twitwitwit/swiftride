import React, { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Phone, 
  Mail, 
  MessageSquare, 
  AlertCircle, 
  HelpCircle, 
  Car, 
  XCircle, 
  CreditCard, 
  User, 
  ShieldAlert, 
  Bike, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import heroCarImg from '../../assets/images/swiftride_car_hero_1787613717961.jpg';
import { FAQS } from '../../data/mockData';

interface WebHelpProps {
  onStartLiveChat: () => void;
}

export const WebHelp: React.FC<WebHelpProps> = ({ onStartLiveChat }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0); // First one open by default

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqIcons = [
    Car,
    XCircle,
    CreditCard,
    User,
    ShieldAlert,
    Bike
  ];

  const filteredFaqs = FAQS.filter(faq => 
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col bg-[#faf9f6] text-slate-900 select-none">
      {/* 1. Hero Search Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10 lg:pt-10 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-4">
            <h1 className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight font-display">
              How can we help you?
            </h1>

            <p className="text-slate-600 text-base sm:text-lg font-medium">
              Find answers to common questions or reach out to our support team.
            </p>

            {/* Search Input Bar */}
            <div className="w-full max-w-xl relative pt-2">
              <div className="relative flex items-center">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
                <input
                  id="help-search-input"
                  type="text"
                  placeholder="Search for help..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 text-slate-400 hover:text-slate-600 text-xs font-bold"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Visual Graphic */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-tr from-amber-100/50 via-slate-100 to-amber-50">
              <img
                src={heroCarImg}
                alt="SwiftRide Help and Support"
                className="w-full h-auto object-cover max-h-[300px] lg:max-h-[340px]"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Help Columns (FAQs & Contact Card) */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Frequently Asked Questions (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-2xl font-black text-slate-950 font-display mb-4">Frequently Asked Questions</h2>

            {filteredFaqs.length === 0 ? (
              <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center space-y-2">
                <HelpCircle className="w-10 h-10 text-amber-500 mx-auto" />
                <p className="font-bold text-slate-800">No results found for "{searchQuery}"</p>
                <p className="text-xs text-slate-500">Try searching for "booking", "fare", "payment", or "driver".</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-2 text-xs font-bold text-amber-600 underline cursor-pointer"
                >
                  View all FAQs
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredFaqs.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  const IconComponent = faqIcons[index % faqIcons.length] || HelpCircle;

                  return (
                    <div
                      key={index}
                      className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full p-4.5 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer hover:bg-slate-50/50 transition-colors"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="w-10 h-10 rounded-full bg-[#fef3c7] flex items-center justify-center text-slate-900 shrink-0 shadow-inner">
                            <IconComponent className="w-5 h-5 text-slate-900" />
                          </div>
                          <span className="font-extrabold text-sm sm:text-base text-slate-950 font-display">
                            {faq.q}
                          </span>
                        </div>
                        <div className="text-slate-400 shrink-0">
                          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </div>
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-[#faf9f6]/40 pl-16">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Bottom Support Link */}
            <div className="pt-3">
              <p className="text-xs text-slate-600">
                Can't find what you're looking for?{' '}
                <button
                  id="btn-contact-support-team"
                  onClick={onStartLiveChat}
                  className="font-bold text-[#f59e0b] hover:text-[#d97706] inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Contact our support team</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </p>
            </div>
          </div>

          {/* Right Column: Contact Support Card (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-100 space-y-6">
            <h3 className="text-xl font-black text-slate-950 font-display">Contact Support</h3>

            <div className="space-y-5">
              {/* Phone Support */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#fef3c7] flex items-center justify-center text-slate-900 shrink-0 shadow-inner">
                  <Phone className="w-5 h-5 text-slate-900" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-950">Phone Support</h4>
                  <p className="text-xs font-bold text-slate-800 mt-0.5">(02) 8 123 4567</p>
                  <p className="text-[11px] text-slate-500">Mon - Sun : 6:00 AM - 10:00 PM</p>
                </div>
              </div>

              {/* Email Support */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#fef3c7] flex items-center justify-center text-slate-900 shrink-0 shadow-inner">
                  <Mail className="w-5 h-5 text-slate-900" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-950">Email Support</h4>
                  <p className="text-xs font-bold text-slate-800 mt-0.5">support@swiftride.com.ph</p>
                  <p className="text-[11px] text-slate-500">We'll reply within 24 hours.</p>
                </div>
              </div>

              {/* Live Chat */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#fef3c7] flex items-center justify-center text-slate-900 shrink-0 shadow-inner">
                  <MessageSquare className="w-5 h-5 text-slate-900" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-950">Live Chat</h4>
                  <p className="text-xs text-slate-700 mt-0.5">Chat with our support team</p>
                  <p className="text-[11px] text-slate-500">Available 24/7</p>
                </div>
              </div>

              {/* Emergency Hotline */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#fef3c7] flex items-center justify-center text-slate-900 shrink-0 shadow-inner">
                  <AlertCircle className="w-5 h-5 text-slate-900" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-950">Emergency Hotline</h4>
                  <p className="text-xs font-bold text-red-600 mt-0.5">0917 123 4567</p>
                  <p className="text-[11px] text-slate-500">For urgent concerns only.</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <button
                id="btn-start-live-chat"
                onClick={onStartLiveChat}
                className="w-full py-3.5 bg-[#f59e0b] hover:bg-[#d97706] text-slate-950 font-black rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Start Live Chat</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
