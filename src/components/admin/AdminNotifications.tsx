import React, { useState } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Send, 
  Search, 
  Trash2, 
  CheckCheck, 
  ShieldAlert, 
  Car, 
  DollarSign, 
  Building2, 
  Clock, 
  Sparkles,
  ChevronRight,
  Filter
} from 'lucide-react';

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  category: 'critical' | 'payouts' | 'compliance' | 'safety' | 'system';
  severity: 'urgent' | 'high' | 'normal' | 'info';
  timestamp: string;
  timeAgo: string;
  isRead: boolean;
  sourceModule: string;
  actionLabel?: string;
  actionUrl?: string;
}

const INITIAL_NOTIFICATIONS: SystemNotification[] = [
  {
    id: 'NOTIF-1092',
    title: 'Surge Algorithm Triggered in Makati CBD & BGC',
    message: 'High passenger ride demand detected exceeding local driver capacity by 210%. Automatic surge multiplier applied: 1.9x.',
    category: 'critical',
    severity: 'urgent',
    timestamp: '2026-08-24 17:15:22',
    timeAgo: '10 mins ago',
    isRead: false,
    sourceModule: 'Dispatch Engine',
    actionLabel: 'Inspect Heatmap'
  },
  {
    id: 'NOTIF-1091',
    title: 'Weekly Payout Batch Approved & Processed',
    message: 'Total payout of ₱1,420,500 disbursed to 342 active driver GCash / Maya digital wallets for cycle ending Aug 23, 2026.',
    category: 'payouts',
    severity: 'normal',
    timestamp: '2026-08-24 16:45:00',
    timeAgo: '40 mins ago',
    isRead: false,
    sourceModule: 'Finance Settlement',
    actionLabel: 'View Settlement'
  },
  {
    id: 'NOTIF-1090',
    title: 'Passenger SOS Emergency Alert Triggered (Resolved)',
    message: 'Ride #SW-9842 in Pasay City triggered SOS emergency alert. SwiftRide Safety Desk responded in 42s and verified passenger safety with Pasay PNP dispatch.',
    category: 'safety',
    severity: 'high',
    timestamp: '2026-08-24 15:30:11',
    timeAgo: '1.5 hrs ago',
    isRead: false,
    sourceModule: 'Safety Desk',
    actionLabel: 'Review Safety Log'
  },
  {
    id: 'NOTIF-1089',
    title: 'LTFRB TNVS Franchise Compliance Audit Notice',
    message: 'LTFRB memo issued regarding mandatory bi-annual vehicle emission and safety test documentation for 28 registered units.',
    category: 'compliance',
    severity: 'high',
    timestamp: '2026-08-24 13:10:00',
    timeAgo: '4 hrs ago',
    isRead: false,
    sourceModule: 'Regulatory Desk',
    actionLabel: 'Audit Driver Documents'
  },
  {
    id: 'NOTIF-1088',
    title: '14 New Driver Partner Onboarding Applications Submitted',
    message: '14 driver applicants have uploaded professional driver licenses, NBI clearances, and vehicle OR/CR for admin verification.',
    category: 'system',
    severity: 'normal',
    timestamp: '2026-08-24 11:20:00',
    timeAgo: '6 hrs ago',
    isRead: true,
    sourceModule: 'Driver Onboarding',
    actionLabel: 'Review Applications'
  },
  {
    id: 'NOTIF-1087',
    title: 'Scheduled Cloud Database Backup Completed',
    message: 'Automated encrypted snapshot backup of ride history, ledger accounts, and telemetry GPS points completed successfully (Size: 14.2 GB).',
    category: 'system',
    severity: 'info',
    timestamp: '2026-08-24 04:00:00',
    timeAgo: '13 hrs ago',
    isRead: true,
    sourceModule: 'Infrastructure Operations'
  },
  {
    id: 'NOTIF-1086',
    title: 'GCash Payment Gateway Latency Resolved',
    message: 'GCash webhook notification latency returned to normal nominal baseline (<120ms) after scheduled telco upstream maintenance.',
    category: 'payouts',
    severity: 'info',
    timestamp: '2026-08-23 22:15:00',
    timeAgo: '19 hrs ago',
    isRead: true,
    sourceModule: 'Payment Gateway'
  },
  {
    id: 'NOTIF-1085',
    title: 'Driver Rating Alert: 2 Units Flagged for Inspection',
    message: '2 driver partners dropped below the 4.5★ service threshold following passenger feedback regarding vehicle AC maintenance.',
    category: 'compliance',
    severity: 'normal',
    timestamp: '2026-08-23 18:40:00',
    timeAgo: '22 hrs ago',
    isRead: true,
    sourceModule: 'Quality Assurance'
  }
];

export const AdminNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<SystemNotification[]>(INITIAL_NOTIFICATIONS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showBroadcastModal, setShowBroadcastModal] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Broadcast modal form state
  const [broadcastTarget, setBroadcastTarget] = useState<'all' | 'drivers' | 'passengers'>('all');
  const [broadcastPriority, setBroadcastPriority] = useState<'urgent' | 'high' | 'normal'>('normal');
  const [broadcastTitle, setBroadcastTitle] = useState<string>('');
  const [broadcastMessage, setBroadcastMessage] = useState<string>('');
  const [isBroadcasting, setIsBroadcasting] = useState<boolean>(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    triggerToast('All notifications marked as read');
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleClearAllRead = () => {
    setNotifications(prev => prev.filter(n => !n.isRead));
    triggerToast('Cleared all read notifications');
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle.trim() || !broadcastMessage.trim()) return;

    setIsBroadcasting(true);
    setTimeout(() => {
      const newNotif: SystemNotification = {
        id: `NOTIF-${Math.floor(Math.random() * 9000) + 1000}`,
        title: `[BROADCAST] ${broadcastTitle}`,
        message: broadcastMessage,
        category: 'system',
        severity: broadcastPriority,
        timestamp: new Date().toLocaleString(),
        timeAgo: 'Just now',
        isRead: false,
        sourceModule: `Admin Broadcast (${broadcastTarget.toUpperCase()})`
      };

      setNotifications(prev => [newNotif, ...prev]);
      setIsBroadcasting(false);
      setShowBroadcastModal(false);
      setBroadcastTitle('');
      setBroadcastMessage('');
      triggerToast('Broadcast sent successfully to ' + broadcastTarget);
    }, 800);
  };

  const filteredNotifications = notifications.filter(n => {
    const matchesCategory = selectedCategory === 'all' || n.category === selectedCategory;
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          n.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          n.sourceModule.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          n.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-sans">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-900 border border-emerald-500/40 text-emerald-400 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-mono font-bold animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-zinc-900/90 border border-zinc-800 p-5 rounded-3xl">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white font-display">System Notifications & Broadcasts</h2>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {unreadCount} UNREAD
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Real-time operational alerts, compliance audits, driver payouts, and safety desk escalations
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap font-mono">
          <button
            id="btn-open-broadcast-modal"
            onClick={() => setShowBroadcastModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl text-xs transition-all shadow-md cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Push Broadcast</span>
          </button>
          <button
            onClick={handleMarkAllAsRead}
            disabled={unreadCount === 0}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 text-slate-200 font-semibold rounded-xl text-xs border border-zinc-700 transition-colors cursor-pointer"
          >
            <CheckCheck className="w-3.5 h-3.5 text-slate-400" />
            <span>Mark All Read</span>
          </button>
          <button
            onClick={handleClearAllRead}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-zinc-800 hover:bg-zinc-700 text-slate-300 font-semibold rounded-xl text-xs border border-zinc-700 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5 text-slate-400" />
            <span>Clear Read</span>
          </button>
        </div>
      </div>

      {/* Quick Summary Counter Cards (No Graphs) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
        <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Total Feed</span>
            <div className="w-7 h-7 rounded-lg bg-zinc-800 text-slate-300 flex items-center justify-center border border-zinc-700/60">
              <Bell className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-xl font-black text-white mt-1">{notifications.length}</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Live platform logs</p>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Urgent Alerts</span>
            <div className="w-7 h-7 rounded-lg bg-zinc-800 text-slate-300 flex items-center justify-center border border-zinc-700/60">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            </div>
          </div>
          <p className="text-xl font-black text-amber-400 mt-1">
            {notifications.filter(n => n.severity === 'urgent' || n.severity === 'high').length}
          </p>
          <p className="text-[10px] text-slate-500 mt-0.5">Requires attention</p>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Safety Incidents</span>
            <div className="w-7 h-7 rounded-lg bg-zinc-800 text-slate-300 flex items-center justify-center border border-zinc-700/60">
              <ShieldAlert className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-xl font-black text-white mt-1">
            {notifications.filter(n => n.category === 'safety').length}
          </p>
          <p className="text-[10px] text-emerald-400 mt-0.5">All cases verified</p>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Settlements</span>
            <div className="w-7 h-7 rounded-lg bg-zinc-800 text-slate-300 flex items-center justify-center border border-zinc-700/60">
              <DollarSign className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-xl font-black text-emerald-400 mt-1">
            {notifications.filter(n => n.category === 'payouts').length}
          </p>
          <p className="text-[10px] text-slate-500 mt-0.5">Disbursements cleared</p>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-5 space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 flex-wrap font-mono text-xs">
            {[
              { id: 'all', label: 'All Feeds', count: notifications.length },
              { id: 'critical', label: 'Surge & Alerts', count: notifications.filter(n => n.category === 'critical').length },
              { id: 'payouts', label: 'Payouts', count: notifications.filter(n => n.category === 'payouts').length },
              { id: 'safety', label: 'Safety SOS', count: notifications.filter(n => n.category === 'safety').length },
              { id: 'compliance', label: 'LTFRB Audit', count: notifications.filter(n => n.category === 'compliance').length },
              { id: 'system', label: 'System', count: notifications.filter(n => n.category === 'system').length },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === tab.id
                    ? 'bg-amber-500 text-black border-amber-400 font-bold'
                    : 'bg-zinc-950 text-slate-400 border-zinc-800 hover:text-white'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedCategory === tab.id ? 'bg-black/20 text-black font-black' : 'bg-zinc-800 text-slate-400'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search notifications..."
              className="pl-8 pr-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 w-full sm:w-64 font-mono"
            />
          </div>
        </div>

        {/* Notifications List (Clean Cards, strictly no charts/graphs) */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="py-14 text-center text-slate-500 font-mono text-xs">
              <Bell className="w-8 h-8 mx-auto mb-2 text-slate-600 opacity-40" />
              <p>No notifications found matching your search criteria.</p>
            </div>
          ) : (
            filteredNotifications.map(item => (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border transition-all ${
                  item.isRead
                    ? 'bg-zinc-950/60 border-zinc-800/70 text-slate-300'
                    : 'bg-zinc-900 border-zinc-700/80 shadow-md text-white'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    {/* Status icon with neutral background */}
                    <div className="w-8 h-8 rounded-xl bg-zinc-800 border border-zinc-700 text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                      {item.category === 'critical' ? (
                        <AlertTriangle className="w-4 h-4 text-amber-400" />
                      ) : item.category === 'safety' ? (
                        <ShieldAlert className="w-4 h-4 text-rose-400" />
                      ) : item.category === 'payouts' ? (
                        <DollarSign className="w-4 h-4 text-emerald-400" />
                      ) : item.category === 'compliance' ? (
                        <Building2 className="w-4 h-4 text-slate-300" />
                      ) : (
                        <Info className="w-4 h-4 text-slate-400" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-white font-sans">{item.title}</span>
                        {!item.isRead && (
                          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                        )}
                        <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-zinc-800 text-slate-300 border border-zinc-700/60">
                          {item.sourceModule}
                        </span>
                        <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border ${
                          item.severity === 'urgent'
                            ? 'bg-red-500/10 text-red-400 border-red-500/30'
                            : item.severity === 'high'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                            : 'bg-zinc-800 text-slate-400 border-zinc-700/60'
                        }`}>
                          {item.severity}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 font-sans leading-relaxed">
                        {item.message}
                      </p>

                      <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500 pt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-500" />
                          {item.timeAgo}
                        </span>
                        <span>•</span>
                        <span>{item.timestamp}</span>
                        <span>•</span>
                        <span>ID: {item.id}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center sm:self-center gap-2 shrink-0 font-mono text-xs">
                    {!item.isRead && (
                      <button
                        onClick={() => handleMarkAsRead(item.id)}
                        className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-slate-200 rounded-xl text-xs font-semibold border border-zinc-700 transition-colors cursor-pointer"
                      >
                        Mark Read
                      </button>
                    )}
                    {item.actionLabel && (
                      <button
                        onClick={() => triggerToast(`Navigating to ${item.sourceModule}...`)}
                        className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-black rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-sm"
                      >
                        <span>{item.actionLabel}</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteNotification(item.id)}
                      className="p-2 text-slate-500 hover:text-rose-400 rounded-xl hover:bg-zinc-900 transition-colors cursor-pointer"
                      title="Dismiss"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Broadcast Modal */}
      {showBroadcastModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleSendBroadcast} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-5 font-sans animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <Send className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white font-display">Broadcast Push Announcement</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowBroadcastModal(false)}
                className="text-slate-500 hover:text-white transition-colors cursor-pointer text-sm font-mono"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono">
              {/* Target Audience */}
              <div>
                <label className="block text-slate-400 mb-1.5 uppercase text-[10px] font-bold">Target Audience</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'all', label: 'All Users' },
                    { id: 'drivers', label: 'Driver Fleet' },
                    { id: 'passengers', label: 'Passengers' }
                  ].map(target => (
                    <button
                      key={target.id}
                      type="button"
                      onClick={() => setBroadcastTarget(target.id as any)}
                      className={`p-2.5 rounded-xl border font-bold transition-colors cursor-pointer ${
                        broadcastTarget === target.id
                          ? 'bg-amber-500 text-black border-amber-400'
                          : 'bg-zinc-950 text-slate-400 border-zinc-800 hover:text-white'
                      }`}
                    >
                      {target.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-slate-400 mb-1.5 uppercase text-[10px] font-bold">Urgency Level</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'normal', label: 'Normal Info' },
                    { id: 'high', label: 'High Alert' },
                    { id: 'urgent', label: 'Urgent Critical' }
                  ].map(prio => (
                    <button
                      key={prio.id}
                      type="button"
                      onClick={() => setBroadcastPriority(prio.id as any)}
                      className={`p-2.5 rounded-xl border font-bold transition-colors cursor-pointer ${
                        broadcastPriority === prio.id
                          ? 'bg-zinc-800 text-white border-zinc-600'
                          : 'bg-zinc-950 text-slate-500 border-zinc-800'
                      }`}
                    >
                      {prio.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-slate-400 mb-1.5 uppercase text-[10px] font-bold">Broadcast Headline</label>
                <input
                  type="text"
                  required
                  value={broadcastTitle}
                  onChange={e => setBroadcastTitle(e.target.value)}
                  placeholder="e.g. Typhoon Warning: Fleet Incentives & Safety Protocol"
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Body */}
              <div>
                <label className="block text-slate-400 mb-1.5 uppercase text-[10px] font-bold">Announcement Message</label>
                <textarea
                  required
                  rows={3}
                  value={broadcastMessage}
                  onChange={e => setBroadcastMessage(e.target.value)}
                  placeholder="Enter full broadcast text to be displayed in driver/passenger mobile apps..."
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl p-2.5 focus:outline-none focus:border-amber-500 resize-none font-sans text-xs"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-zinc-800 font-mono text-xs">
              <button
                type="button"
                onClick={() => setShowBroadcastModal(false)}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-slate-300 rounded-xl transition-colors cursor-pointer font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isBroadcasting}
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-bold rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-md"
              >
                {isBroadcasting ? (
                  <span>Broadcasting...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Announcement</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
