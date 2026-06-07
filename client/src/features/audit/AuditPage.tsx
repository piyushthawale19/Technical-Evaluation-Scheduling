import {
  SlidersHorizontal,
  FileDown,
  Calendar,
  FileText,
  Edit3,
  Repeat,
  ExternalLink,
  Clock,
  ArrowRight
} from 'lucide-react';
import { Card } from '../../components/ui';

export function AuditPage() {
  return (
    <div className="space-y-6 p-6 lg:p-8 bg-slate-50">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Audit Timeline</h1>
          <p className="text-sm text-slate-500 mt-1">Comprehensive log of administrative actions and session lifecycle events.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 shadow-xs transition">
            <SlidersHorizontal size={14} />
            <span>Filter</span>
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2 text-xs font-bold text-white shadow-xs transition">
            <FileDown size={14} />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* Main Timeline Card Container */}
      <Card className="p-6 md:p-8 relative max-w-4xl mx-auto overflow-hidden border border-slate-200">
        <div className="relative pl-8 sm:pl-10 space-y-10">
          {/* Vertical timeline trace line */}
          <div className="absolute left-6.5 sm:left-7.5 top-4 bottom-4 w-0.5 bg-slate-200" />

          {/* Group 1: TODAY */}
          <div className="relative">
            {/* Group Header Tag */}
            <div className="absolute -left-[54px] sm:-left-[58px] -top-1">
              <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-[9px] font-extrabold text-slate-500 uppercase tracking-widest border border-slate-200 shadow-xs">
                TODAY
              </span>
            </div>

            {/* Timeline Items */}
            <div className="space-y-8 pt-8">
              {/* Item 1: Session Rescheduled */}
              <div className="relative flex flex-col sm:flex-row sm:justify-between gap-4">
                {/* Node Icon */}
                <div className="absolute -left-[44px] sm:-left-[48px] top-1.5 h-9 w-9 rounded-full bg-blue-600 text-white flex items-center justify-center border-4 border-white shadow-xs z-10">
                  <Calendar size={14} />
                </div>
                
                {/* Text content */}
                <div className="space-y-2 flex-1">
                  <h4 className="text-sm font-extrabold text-slate-900">Session Rescheduled</h4>
                  <p className="text-xs font-semibold text-slate-600 leading-normal">
                    Tutor <span className="text-blue-700">Michael Scott</span> updated schedule for Student <span className="text-blue-700">David Chen</span>.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="inline-flex rounded-full bg-slate-100 border border-slate-200 px-3 py-0.5 text-[10px] font-bold text-slate-600 shadow-xs">
                      Was: 02:00 PM
                    </span>
                    <span className="inline-flex rounded-full bg-emerald-50 border border-emerald-100 px-3 py-0.5 text-[10px] font-bold text-emerald-700 shadow-xs">
                      Is: 10:30 AM
                    </span>
                  </div>
                </div>

                {/* Right statuses */}
                <div className="sm:text-right shrink-0 pt-0.5 flex sm:flex-col justify-between items-center sm:items-end gap-2">
                  <span className="text-[10px] font-bold text-slate-400">10:30 AM</span>
                  <span className="inline-flex rounded-full bg-blue-50 border border-blue-100 px-2.5 py-0.5 text-[9px] font-extrabold text-blue-750 uppercase tracking-wider">
                    SCHEDULED
                  </span>
                </div>
              </div>

              {/* Item 2: Invoice INV-1001 Issued */}
              <div className="relative flex flex-col sm:flex-row sm:justify-between gap-4">
                {/* Node Icon */}
                <div className="absolute -left-[44px] sm:-left-[48px] top-1.5 h-9 w-9 rounded-full bg-emerald-600 text-white flex items-center justify-center border-4 border-white shadow-xs z-10">
                  <FileText size={14} />
                </div>

                {/* Text content */}
                <div className="space-y-2 flex-1">
                  <h4 className="text-sm font-extrabold text-slate-900">Invoice INV-1001 Issued</h4>
                  <p className="text-xs font-semibold text-slate-600 leading-normal">
                    Automated billing run completed. Total amount: <span className="font-extrabold text-slate-800">$450.00</span>
                  </p>
                  <div className="pt-1">
                    <button className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 hover:text-blue-800 hover:underline">
                      <span>View PDF Details</span>
                      <ExternalLink size={12} />
                    </button>
                  </div>
                </div>

                {/* Right statuses */}
                <div className="sm:text-right shrink-0 pt-0.5 flex sm:flex-col justify-between items-center sm:items-end gap-2">
                  <span className="text-[10px] font-bold text-slate-400">09:15 AM</span>
                  <span className="inline-flex rounded-full bg-slate-900 border border-slate-900 px-2.5 py-0.5 text-[9px] font-extrabold text-white uppercase tracking-wider">
                    BILLED
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Group 2: YESTERDAY */}
          <div className="relative">
            {/* Group Header Tag */}
            <div className="absolute -left-[54px] sm:-left-[58px] -top-1">
              <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-[9px] font-extrabold text-slate-500 uppercase tracking-widest border border-slate-200 shadow-xs">
                YESTERDAY
              </span>
            </div>

            {/* Timeline Items */}
            <div className="space-y-8 pt-8">
              {/* Item 3: Adjustment Created */}
              <div className="relative flex flex-col sm:flex-row sm:justify-between gap-4">
                {/* Node Icon */}
                <div className="absolute -left-[44px] sm:-left-[48px] top-1.5 h-9 w-9 rounded-full bg-rose-500 text-white flex items-center justify-center border-4 border-white shadow-xs z-10">
                  <Edit3 size={14} />
                </div>

                {/* Text content */}
                <div className="space-y-2 flex-1">
                  <h4 className="text-sm font-extrabold text-slate-900">Adjustment Created</h4>
                  <p className="text-xs font-semibold text-slate-600 leading-normal">
                    Manual billing correction applied for Student <span className="text-blue-700">Emma Watson</span>.
                  </p>
                  <div className="pt-2">
                    <div className="rounded-xl border border-slate-150 bg-slate-50 p-3 text-[11px] font-semibold font-mono text-slate-600 leading-normal">
                      "Reason: Refund for technical difficulties during Oct 12 session. Approved by Admin."
                    </div>
                  </div>
                </div>

                {/* Right statuses */}
                <div className="sm:text-right shrink-0 pt-0.5 flex sm:flex-col justify-between items-center sm:items-end gap-2">
                  <span className="text-[10px] font-bold text-slate-400">04:45 PM</span>
                  <span className="inline-flex rounded-full bg-amber-100 border border-amber-200 px-2.5 py-0.5 text-[9px] font-extrabold text-amber-800 uppercase tracking-wider">
                    ADJUSTMENT
                  </span>
                </div>
              </div>

              {/* Item 4: New Recurring Session Created */}
              <div className="relative flex flex-col sm:flex-row sm:justify-between gap-4">
                {/* Node Icon */}
                <div className="absolute -left-[44px] sm:-left-[48px] top-1.5 h-9 w-9 rounded-full bg-purple-600 text-white flex items-center justify-center border-4 border-white shadow-xs z-10">
                  <Repeat size={14} />
                </div>

                {/* Text content */}
                <div className="space-y-2 flex-1">
                  <h4 className="text-sm font-extrabold text-slate-900">New Recurring Session Created</h4>
                  <p className="text-xs font-semibold text-slate-600 leading-normal">
                    New weekly math enrollment for Student <span className="text-blue-700">John Carter</span>.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1.5">
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 border border-slate-200 px-3 py-1 text-[10px] font-bold text-slate-600 shadow-xs">
                      <Calendar size={12} className="text-slate-400" />
                      Every Tuesday
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 border border-slate-200 px-3 py-1 text-[10px] font-bold text-slate-600 shadow-xs">
                      <Clock size={12} className="text-slate-400" />
                      4:00 PM EST
                    </span>
                  </div>
                </div>

                {/* Right statuses */}
                <div className="sm:text-right shrink-0 pt-0.5 flex sm:flex-col justify-between items-center sm:items-end gap-2">
                  <span className="text-[10px] font-bold text-slate-400">11:02 AM</span>
                  <span className="inline-flex rounded-full bg-purple-50 border border-purple-100 px-2.5 py-0.5 text-[9px] font-extrabold text-purple-750 uppercase tracking-wider">
                    RECURRING
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Load More Button */}
        <div className="mt-12 text-center border-t border-slate-100 pt-6">
          <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-6 py-2.5 text-xs font-bold text-slate-700 shadow-xs transition active:scale-[0.98]">
            <span>Load previous activity logs</span>
            <ArrowRight size={14} className="text-slate-400" />
          </button>
        </div>
      </Card>
    </div>
  );
}