import React from 'react';
import { Bell, Info, AlertTriangle, ShieldCheck, Server } from 'lucide-react';

export const AdminNotifications: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-black text-white uppercase tracking-wider">System Activity & Alerts</h3>
        <button className="text-[10px] font-black text-slate-400 hover:text-white uppercase tracking-widest transition-colors cursor-pointer">
          Mark All as Read
        </button>
      </div>

      <div className="space-y-3">
        {[
          { 
            title: 'Critical Server Load', 
            time: '12 mins ago', 
            desc: 'Main production cluster at 85% CPU usage. Auto-scaling initiated.',
            icon: Server,
            color: 'text-rose-400',
            bg: 'bg-rose-400/10',
            border: 'border-rose-400/20'
          },
          { 
            title: 'New Regulatory Compliance Notice', 
            time: '45 mins ago', 
            desc: 'LTFRB has updated the maximum base fare guidelines for Region IV-A.',
            icon: ShieldCheck,
            color: 'text-blue-400',
            bg: 'bg-blue-400/10',
            border: 'border-blue-400/20'
          },
          { 
            title: 'Driver Strike Warning', 
            time: '2 hours ago', 
            desc: 'Monitoring social sentiment regarding upcoming fuel price increases.',
            icon: AlertTriangle,
            color: 'text-amber-400',
            bg: 'bg-amber-400/10',
            border: 'border-amber-400/20'
          },
          { 
            title: 'Platform Maintenance Scheduled', 
            time: '4 hours ago', 
            desc: 'Weekly database optimization scheduled for Sunday at 02:00 AM PHT.',
            icon: Info,
            color: 'text-purple-400',
            bg: 'bg-purple-400/10',
            border: 'border-purple-400/20'
          },
          { 
            title: 'Successful Backup', 
            time: '6 hours ago', 
            desc: 'Full system backup completed successfully. 4.2TB archived to Cold Storage.',
            icon: ShieldCheck,
            color: 'text-emerald-400',
            bg: 'bg-emerald-400/10',
            border: 'border-emerald-400/20'
          },
        ].map((note, i) => (
          <div key={i} className={`p-4 rounded-2xl border ${note.border} ${note.bg} flex gap-4 hover:brightness-110 transition-all cursor-pointer`}>
            <div className={`w-10 h-10 shrink-0 rounded-xl bg-zinc-950 flex items-center justify-center border ${note.border}`}>
              <note.icon className={`w-5 h-5 ${note.color}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-black text-white">{note.title}</p>
                <span className="text-[10px] font-mono text-slate-500 uppercase">{note.time}</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                {note.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center pt-4">
        <button className="px-6 py-2 bg-zinc-900 border border-zinc-800 text-slate-400 text-xs font-black rounded-xl hover:text-white transition-colors cursor-pointer uppercase tracking-widest">
          Load Older Notifications
        </button>
      </div>
    </div>
  );
};
