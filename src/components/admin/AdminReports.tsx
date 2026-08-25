import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Filter, 
  Calendar, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  FileSpreadsheet, 
  FileCheck, 
  Search, 
  SlidersHorizontal,
  ChevronDown,
  Car,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  Building2,
  Share2,
  Trash2,
  Printer
} from 'lucide-react';

interface ReportItem {
  id: string;
  name: string;
  category: 'financial' | 'operations' | 'fleet' | 'compliance' | 'safety';
  dateGenerated: string;
  period: string;
  format: 'PDF' | 'CSV' | 'XLSX' | 'JSON';
  fileSize: string;
  status: 'ready' | 'generating' | 'archived';
  recordsCount: number;
}

const INITIAL_REPORTS: ReportItem[] = [
  {
    id: 'RPT-2026-08-01',
    name: 'Daily Fleet Dispatch & Revenue Summary',
    category: 'financial',
    dateGenerated: '2026-08-24 06:00 AM',
    period: 'Aug 23, 2026',
    format: 'PDF',
    fileSize: '2.4 MB',
    status: 'ready',
    recordsCount: 1420
  },
  {
    id: 'RPT-2026-08-02',
    name: 'Weekly Driver Partner Commission Settlement',
    category: 'financial',
    dateGenerated: '2026-08-24 04:30 AM',
    period: 'Aug 17 - Aug 23, 2026',
    format: 'CSV',
    fileSize: '4.8 MB',
    status: 'ready',
    recordsCount: 3840
  },
  {
    id: 'RPT-2026-08-03',
    name: 'Metro Manila Peak Surge & Demand Density Audit',
    category: 'operations',
    dateGenerated: '2026-08-23 11:45 PM',
    period: 'Aug 16 - Aug 23, 2026',
    format: 'XLSX',
    fileSize: '5.1 MB',
    status: 'ready',
    recordsCount: 9210
  },
  {
    id: 'RPT-2026-08-04',
    name: 'LTFRB Vehicle Inspection & Franchise Compliance',
    category: 'compliance',
    dateGenerated: '2026-08-22 09:15 AM',
    period: 'Monthly (August 2026)',
    format: 'PDF',
    fileSize: '8.2 MB',
    status: 'ready',
    recordsCount: 520
  },
  {
    id: 'RPT-2026-08-05',
    name: 'Passenger Safety SOS & Incident Resolution Log',
    category: 'safety',
    dateGenerated: '2026-08-21 02:00 PM',
    period: 'Aug 1 - Aug 20, 2026',
    format: 'PDF',
    fileSize: '1.9 MB',
    status: 'ready',
    recordsCount: 42
  },
  {
    id: 'RPT-2026-08-06',
    name: 'Driver Cancellation & Fleet Idle Time Analysis',
    category: 'fleet',
    dateGenerated: '2026-08-20 08:30 AM',
    period: 'Aug 10 - Aug 17, 2026',
    format: 'CSV',
    fileSize: '3.2 MB',
    status: 'ready',
    recordsCount: 2150
  }
];

const ZONE_PERFORMANCE_METRICS = [
  { zone: 'Makati CBD', trips: 3420, revenue: 1145000, avgSurge: '1.8x', completionRate: '96.4%', avgEta: '3.8m' },
  { zone: 'BGC Taguig', trips: 2980, revenue: 994000, avgSurge: '1.9x', completionRate: '95.8%', avgEta: '4.1m' },
  { zone: 'NAIA Terminals 1-4', trips: 1890, revenue: 852000, avgSurge: '2.1x', completionRate: '98.2%', avgEta: '5.2m' },
  { zone: 'Ortigas Center', trips: 2150, revenue: 685000, avgSurge: '1.5x', completionRate: '94.6%', avgEta: '4.5m' },
  { zone: 'SM Mall of Asia / Bay Area', trips: 1960, revenue: 598000, avgSurge: '1.6x', completionRate: '95.1%', avgEta: '4.9m' },
  { zone: 'Quezon City / North EDSA', trips: 2410, revenue: 732000, avgSurge: '1.4x', completionRate: '93.8%', avgEta: '5.6m' }
];

const VEHICLE_TIER_METRICS = [
  { tier: 'Swift Economy (4-Seater)', activeUnits: 284, tripsToday: 1840, share: '56%', avgRating: 4.86, grossRevenue: 482000 },
  { tier: 'Swift Comfort (Sedan / EV)', activeUnits: 142, tripsToday: 890, share: '27%', avgRating: 4.92, grossRevenue: 298000 },
  { tier: 'Swift XL (6-8 Seater MPV)', activeUnits: 68, tripsToday: 410, share: '13%', avgRating: 4.89, grossRevenue: 215000 },
  { tier: 'Swift Express Moto', activeUnits: 34, tripsToday: 140, share: '4%', avgRating: 4.84, grossRevenue: 42000 }
];

export const AdminReports: React.FC = () => {
  const [reports, setReports] = useState<ReportItem[]>(INITIAL_REPORTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dateRange, setDateRange] = useState<string>('last_7_days');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [showGeneratorModal, setShowGeneratorModal] = useState<boolean>(false);
  const [downloadNotification, setDownloadNotification] = useState<string | null>(null);

  // New report generator state
  const [newReportType, setNewReportType] = useState<string>('financial_daily');
  const [newReportFormat, setNewReportFormat] = useState<'PDF' | 'CSV' | 'XLSX' | 'JSON'>('PDF');
  const [newReportPeriod, setNewReportPeriod] = useState<string>('Current Week (Aug 18 - 24, 2026)');

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const typeNames: Record<string, { name: string; category: ReportItem['category'] }> = {
        financial_daily: { name: 'Daily Gross Volume & Settlement Audit', category: 'financial' },
        fleet_utilization: { name: 'Driver Utilization & Acceptance Metrics', category: 'fleet' },
        surge_density: { name: 'Metro Manila Surge Density & Demand Deficit', category: 'operations' },
        safety_incidents: { name: 'SOS Safety & Driver Incident Log', category: 'safety' },
        compliance_franchise: { name: 'LTFRB Vehicle Inspection & PNV Status', category: 'compliance' }
      };

      const meta = typeNames[newReportType] || { name: 'Custom Export Report', category: 'operations' };
      const newReport: ReportItem = {
        id: `RPT-2026-08-${String(reports.length + 1).padStart(2, '0')}`,
        name: meta.name,
        category: meta.category,
        dateGenerated: 'Just now (Aug 24, 2026)',
        period: newReportPeriod,
        format: newReportFormat,
        fileSize: `${(Math.random() * 4 + 1.2).toFixed(1)} MB`,
        status: 'ready',
        recordsCount: Math.floor(Math.random() * 2500) + 300
      };

      setReports(prev => [newReport, ...prev]);
      setIsGenerating(false);
      setShowGeneratorModal(false);
      triggerDownloadToast(`Report "${newReport.name}" generated successfully`);
    }, 1200);
  };

  const triggerDownloadToast = (message: string) => {
    setDownloadNotification(message);
    setTimeout(() => {
      setDownloadNotification(null);
    }, 3500);
  };

  const handleDownload = (report: ReportItem) => {
    triggerDownloadToast(`Downloading ${report.name} (${report.format})`);
  };

  const handleDelete = (id: string) => {
    setReports(prev => prev.filter(r => r.id !== id));
  };

  const filteredReports = reports.filter(r => {
    const matchesCategory = selectedCategory === 'all' || r.category === selectedCategory;
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.period.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-sans">
      {/* Toast Notification */}
      {downloadNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-900 border border-emerald-500/40 text-emerald-400 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-mono font-bold animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{downloadNotification}</span>
        </div>
      )}

      {/* Header & Main Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-zinc-900/90 border border-zinc-800 p-5 rounded-3xl">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white font-display">Fleet Reports & Intelligence</h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-zinc-800 text-slate-300 border border-zinc-700">
              AUDIT READY
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Export certified operational statements, LTFRB compliance dossiers, and driver commission settlements
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap font-mono">
          <button
            id="btn-generate-report-modal"
            onClick={() => setShowGeneratorModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl text-xs transition-all shadow-md cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>Generate Custom Report</span>
          </button>
          <button
            onClick={() => triggerDownloadToast('Exporting full platform database snapshot...')}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-zinc-800 hover:bg-zinc-700 text-slate-200 font-semibold rounded-xl text-xs border border-zinc-700 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>Export Raw Dump</span>
          </button>
        </div>
      </div>

      {/* Operational KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Dispatched Trips (Period)</span>
            <div className="w-8 h-8 rounded-xl bg-zinc-800 text-slate-300 flex items-center justify-center border border-zinc-700/60">
              <Car className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-white font-mono mt-2">14,810</p>
          <div className="flex items-center gap-1 mt-1 text-[10px] font-mono text-emerald-400 font-semibold">
            <TrendingUp className="w-3 h-3 text-emerald-400" />
            <span>95.4% Completion Rate</span>
          </div>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Gross Ride Value</span>
            <div className="w-8 h-8 rounded-xl bg-zinc-800 text-slate-300 flex items-center justify-center border border-zinc-700/60">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-white font-mono mt-2">₱5,006,000</p>
          <div className="flex items-center gap-1 mt-1 text-[10px] font-mono text-slate-400">
            <span>20% Admin Net: </span>
            <span className="text-emerald-400 font-bold">₱1,001,200</span>
          </div>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Driver Fleet Utilization</span>
            <div className="w-8 h-8 rounded-xl bg-zinc-800 text-slate-300 flex items-center justify-center border border-zinc-700/60">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-white font-mono mt-2">87.2%</p>
          <div className="flex items-center gap-1 mt-1 text-[10px] font-mono text-slate-400">
            <span>Avg 6.8 hrs on-trip / driver / day</span>
          </div>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Safety & LTFRB Index</span>
            <div className="w-8 h-8 rounded-xl bg-zinc-800 text-slate-300 flex items-center justify-center border border-zinc-700/60">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-emerald-400 font-mono mt-2">99.8%</p>
          <div className="flex items-center gap-1 mt-1 text-[10px] font-mono text-slate-400">
            <span>42 resolved SOS • Zero major incidents</span>
          </div>
        </div>
      </div>

      {/* Reports Archive & Filters */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-5 space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white font-display">Generated Statements & Audit Files</h3>
            <span className="text-xs font-mono text-slate-400">({filteredReports.length} files available)</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search statements or ID..."
                className="pl-8 pr-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 w-48 sm:w-60 font-mono"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800 font-mono text-xs">
              {['all', 'financial', 'operations', 'fleet', 'compliance', 'safety'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg capitalize transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-zinc-800 text-white font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Reports Table */}
        <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-950">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-zinc-900/90 text-slate-400 text-[10px] uppercase border-b border-zinc-800">
              <tr>
                <th className="py-3 px-4">Report Identifier & Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Period</th>
                <th className="py-3 px-4">Format</th>
                <th className="py-3 px-4">Records</th>
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4">Generated</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-slate-300">
              {filteredReports.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    <FileText className="w-8 h-8 mx-auto mb-2 text-slate-600 opacity-40" />
                    <p>No generated reports match your filter criteria.</p>
                  </td>
                </tr>
              ) : (
                filteredReports.map(report => (
                  <tr key={report.id} className="hover:bg-zinc-900/50 transition-colors">
                    <td className="py-3.5 px-4 font-sans">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 text-slate-300 flex items-center justify-center shrink-0">
                          {report.format === 'PDF' ? (
                            <FileText className="w-3.5 h-3.5 text-rose-400" />
                          ) : report.format === 'CSV' || report.format === 'XLSX' ? (
                            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <FileCheck className="w-3.5 h-3.5 text-amber-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-white leading-tight">{report.name}</p>
                          <span className="text-[10px] text-slate-500 font-mono">{report.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-zinc-800 text-slate-300 border border-zinc-700/60">
                        {report.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">{report.period}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-900 border border-zinc-700/80 text-white">
                        {report.format}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">{report.recordsCount.toLocaleString()} rows</td>
                    <td className="py-3.5 px-4 text-slate-400">{report.fileSize}</td>
                    <td className="py-3.5 px-4 text-slate-500 text-[11px]">{report.dateGenerated}</td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleDownload(report)}
                          className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-[11px] font-bold border border-zinc-700 transition-colors flex items-center gap-1 cursor-pointer"
                          title="Download Statement"
                        >
                          <Download className="w-3 h-3 text-slate-300" />
                          <span>Download</span>
                        </button>
                        <button
                          onClick={() => handleDelete(report.id)}
                          className="p-1 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-zinc-900 transition-colors cursor-pointer"
                          title="Delete File"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Regional Performance & Vehicle Tier Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Regional Breakdown */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white font-display">Regional Commute Zone Breakdown</h3>
              <p className="text-xs text-slate-400 font-mono">Volume, gross fare revenue, and completion efficiency</p>
            </div>
            <span className="text-[10px] font-mono bg-zinc-800 text-slate-300 px-2 py-0.5 rounded-full border border-zinc-700">
              METRO MANILA
            </span>
          </div>

          <div className="space-y-2.5 font-mono text-xs">
            {ZONE_PERFORMANCE_METRICS.map(item => (
              <div key={item.zone} className="bg-zinc-950/80 border border-zinc-800 p-3 rounded-xl flex items-center justify-between">
                <div>
                  <p className="font-bold text-white">{item.zone}</p>
                  <p className="text-[10px] text-slate-500">
                    {item.trips.toLocaleString()} trips • Avg ETA: {item.avgEta}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-amber-400">₱{item.revenue.toLocaleString()}</p>
                  <p className="text-[10px] text-emerald-400 font-semibold">{item.completionRate} completed • {item.avgSurge} surge</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vehicle Category Performance */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white font-display">Vehicle Tier Fleet Distribution</h3>
              <p className="text-xs text-slate-400 font-mono">Active units on-road, ride share, and revenue</p>
            </div>
            <span className="text-[10px] font-mono bg-zinc-800 text-slate-300 px-2 py-0.5 rounded-full border border-zinc-700">
              4 TIERS
            </span>
          </div>

          <div className="space-y-2.5 font-mono text-xs">
            {VEHICLE_TIER_METRICS.map(item => (
              <div key={item.tier} className="bg-zinc-950/80 border border-zinc-800 p-3 rounded-xl">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-white">{item.tier}</span>
                  <span className="text-amber-400 font-bold">₱{item.grossRevenue.toLocaleString()}</span>
                </div>
                <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden mb-2">
                  <div 
                    className="bg-amber-500 h-full rounded-full" 
                    style={{ width: item.share }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>{item.activeUnits} active units ({item.share} fleet share)</span>
                  <span className="text-slate-300">★ {item.avgRating} rating • {item.tripsToday} trips</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Report Generator Modal */}
      {showGeneratorModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-5 font-sans animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white font-display">Generate Operational Statement</h3>
              </div>
              <button
                onClick={() => setShowGeneratorModal(false)}
                className="text-slate-500 hover:text-white transition-colors cursor-pointer text-sm font-mono"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono">
              {/* Type Select */}
              <div>
                <label className="block text-slate-400 mb-1.5 uppercase text-[10px] font-bold">Report Template Type</label>
                <select
                  value={newReportType}
                  onChange={e => setNewReportType(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
                >
                  <option value="financial_daily">Daily Gross Volume & Settlement Audit (Financial)</option>
                  <option value="fleet_utilization">Driver Utilization & Acceptance Metrics (Fleet)</option>
                  <option value="surge_density">Metro Manila Surge Density & Demand Deficit (Operations)</option>
                  <option value="safety_incidents">SOS Safety & Driver Incident Log (Safety)</option>
                  <option value="compliance_franchise">LTFRB Vehicle Inspection & PNV Status (Compliance)</option>
                </select>
              </div>

              {/* Time Period */}
              <div>
                <label className="block text-slate-400 mb-1.5 uppercase text-[10px] font-bold">Accounting Period</label>
                <input
                  type="text"
                  value={newReportPeriod}
                  onChange={e => setNewReportPeriod(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Format Select */}
              <div>
                <label className="block text-slate-400 mb-1.5 uppercase text-[10px] font-bold">Export Format</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['PDF', 'CSV', 'XLSX', 'JSON'] as const).map(fmt => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => setNewReportFormat(fmt)}
                      className={`p-2.5 rounded-xl border font-bold transition-colors cursor-pointer ${
                        newReportFormat === fmt
                          ? 'bg-amber-500 text-black border-amber-400'
                          : 'bg-zinc-950 text-slate-400 border-zinc-800 hover:text-white'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-zinc-800 font-mono text-xs">
              <button
                onClick={() => setShowGeneratorModal(false)}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-slate-300 rounded-xl transition-colors cursor-pointer font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateReport}
                disabled={isGenerating}
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-bold rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-md"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Compiling File...</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-3.5 h-3.5" />
                    <span>Compile & Export</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
