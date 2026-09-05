import React from 'react';
import { Settings, DollarSign, Shield, Zap, Globe, Save } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  return (
    <div className="max-w-4xl space-y-8 pb-12">
      {/* Fare Settings Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
          <DollarSign className="w-5 h-5 text-amber-500" />
          <h3 className="text-sm font-black text-white uppercase tracking-wider">Fare & Commission Configuration</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest ml-1">Base Ride Fare (₱)</label>
            <input 
              type="number" 
              defaultValue={45.00}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm font-bold text-white focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest ml-1">Per Kilometer Rate (₱)</label>
            <input 
              type="number" 
              defaultValue={12.50}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm font-bold text-white focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest ml-1">Platform Commission (%)</label>
            <input 
              type="number" 
              defaultValue={20}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm font-bold text-white focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest ml-1">Surge Max Multiplier</label>
            <input 
              type="number" 
              defaultValue={3.5}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm font-bold text-white focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Security & Access Section */}
      <section className="space-y-4 pt-4">
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
          <Shield className="w-5 h-5 text-blue-500" />
          <h3 className="text-sm font-black text-white uppercase tracking-wider">Security & Access Control</h3>
        </div>

        <div className="space-y-3">
          {[
            { label: 'Two-Factor Authentication', desc: 'Enforce 2FA for all driver and admin logins', active: true },
            { label: 'Vehicle Verification Protocol', desc: 'Require manual audit for all new vehicle registrations', active: true },
            { label: 'Automatic Account Suspension', desc: 'Suspend users with average rating below 3.5 stars', active: false },
          ].map((setting, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-800 rounded-2xl">
              <div>
                <p className="text-sm font-bold text-white">{setting.label}</p>
                <p className="text-xs text-slate-500 font-medium">{setting.desc}</p>
              </div>
              <div className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${setting.active ? 'bg-amber-500' : 'bg-zinc-800'}`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${setting.active ? 'left-7' : 'left-1'}`}></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Save Button */}
      <div className="flex justify-end pt-6">
        <button className="flex items-center gap-2.5 px-8 py-3 bg-amber-500 text-black font-black rounded-2xl hover:bg-amber-400 active:scale-95 transition-all shadow-lg shadow-amber-500/20 cursor-pointer uppercase tracking-widest text-xs">
          <Save className="w-4 h-4" />
          <span>Apply System Changes</span>
        </button>
      </div>
    </div>
  );
};
