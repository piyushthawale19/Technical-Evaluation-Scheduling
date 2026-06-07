import { X, AlertTriangle, User, GraduationCap, Clock, CheckCircle } from 'lucide-react';
import { useUiStore } from '../../store/uiStore';
import { demoSessions } from '../../data/mockData';
import { StatusBadge } from '../ui';

export function SessionDrawer() {
  const drawer = useUiStore((state) => state.drawer);
  const selectedSessionId = useUiStore((state) => state.selectedSessionId);
  const setDrawer = useUiStore((state) => state.setDrawer);

  if (drawer !== 'session' || !selectedSessionId) {
    return null;
  }

  const session = demoSessions.find((s) => s.id === selectedSessionId) ?? demoSessions[0];
  const isBilled = session.status === 'billed';

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/20 backdrop-blur-xs transition-opacity"
        onClick={() => setDrawer('closed')}
      />

      {/* Drawer Card */}
      <aside className="relative w-full max-w-[460px] bg-white border-l border-slate-200 shadow-2xl flex flex-col justify-between h-full z-10 animate-slide-in">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-150 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-slate-800">Session Details</h3>
          </div>
          <button
            onClick={() => setDrawer('closed')}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Warning Banner */}
          {isBilled && (
            <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4 flex gap-3">
              <span className="text-rose-600 mt-0.5 shrink-0">
                <AlertTriangle size={18} />
              </span>
              <p className="text-xs font-semibold leading-relaxed text-rose-800">
                This session has already been billed. Any changes will create a billing adjustment.
              </p>
            </div>
          )}

          {/* Tutor Info Block */}
          <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shadow-xs shrink-0">
              <User size={18} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">TUTOR</p>
              <h4 className="text-base font-extrabold text-slate-900 mt-0.5">{session.tutorName}</h4>
            </div>
          </div>

          {/* Student Info Block */}
          <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shadow-xs shrink-0">
              <GraduationCap size={18} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">STUDENT</p>
              <h4 className="text-base font-extrabold text-slate-900 mt-0.5">{session.studentName}</h4>
            </div>
          </div>

          {/* Grid details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-150 bg-white p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">DATE</p>
              <p className="text-sm font-extrabold text-slate-800 mt-1.5">Sept 11, 2023</p>
            </div>
            <div className="rounded-2xl border border-slate-150 bg-white p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">TIME</p>
              <p className="text-sm font-extrabold text-slate-800 mt-1.5">10:00 AM - 11:30 AM</p>
            </div>
            <div className="rounded-2xl border border-slate-150 bg-white p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">STATUS</p>
              <div className="mt-1.5">
                <StatusBadge status={session.status}>{session.status}</StatusBadge>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-150 bg-white p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">INVOICE ID</p>
              <p className="text-sm font-extrabold text-slate-800 mt-1.5">
                {isBilled ? `#${session.billedInvoiceNumber}` : '—'}
              </p>
            </div>
          </div>

          {/* Action History timeline */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Action History</h4>
            <div className="space-y-5 relative pl-6">
              {/* Vertical line */}
              <div className="absolute left-2.5 top-2.5 bottom-2.5 w-0.5 bg-slate-100" />

              {/* Item 1 */}
              <div className="relative flex items-start gap-3">
                <span className="absolute -left-6 top-1 h-5.5 w-5.5 rounded-full border-4 border-white bg-blue-600 shadow-xs" />
                <div>
                  <p className="text-xs font-bold text-slate-800 leading-tight">Invoice Generated</p>
                  <p className="text-[10px] font-semibold text-slate-400 mt-0.5">Sept 12, 2023 at 08:00 AM</p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="relative flex items-start gap-3">
                <span className="absolute -left-6 top-1 h-5.5 w-5.5 rounded-full border-4 border-white bg-slate-400 shadow-xs" />
                <div>
                  <p className="text-xs font-bold text-slate-800 leading-tight">Session Marked Completed</p>
                  <p className="text-[10px] font-semibold text-slate-400 mt-0.5">Sept 11, 2023 at 11:45 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-5 border-t border-slate-150 flex items-center gap-4 bg-slate-50">
          <button
            onClick={() => setDrawer('reschedule', session.id)}
            className="flex-1 h-11 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold px-4 rounded-xl flex items-center justify-center gap-2 shadow-xs transition active:scale-[0.98]"
          >
            <Clock size={16} />
            <span>Reschedule</span>
          </button>

          <button
            onClick={() => setDrawer('closed')}
            className="flex-1 h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.98]"
          >
            <CheckCircle size={16} />
            <span>Mark Completed</span>
          </button>
        </div>
      </aside>
    </div>
  );
}