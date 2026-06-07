import { useState } from 'react';
import { X, Calendar, AlertTriangle, ArrowRight } from 'lucide-react';
import { useUiStore } from '../../store/uiStore';
import { demoSessions } from '../../data/mockData';
import { Button, Label } from '../ui';

export function RescheduleDrawer() {
  const drawer = useUiStore((state) => state.drawer);
  const selectedSessionId = useUiStore((state) => state.selectedSessionId);
  const setDrawer = useUiStore((state) => state.setDrawer);
  const showToast = useUiStore((state) => state.showToast);

  const [date, setDate] = useState('2026-09-15');
  const [time, setTime] = useState('10:30');

  if (drawer !== 'reschedule' || !selectedSessionId) {
    return null;
  }

  const session = demoSessions.find((s) => s.id === selectedSessionId) ?? demoSessions[0];
  const isBilled = session.status === 'billed';

  const handleConfirm = () => {
    // Show success alert and close
    showToast(`Successfully rescheduled ${session.studentName}'s session to ${date} at ${time}. A credit adjustment has been registered.`, 'success');
    setDrawer('closed');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/20 backdrop-blur-xs transition-opacity"
        onClick={() => setDrawer('closed')}
      />

      {/* Drawer */}
      <aside className="relative w-full max-w-[460px] bg-white border-l border-slate-200 shadow-2xl flex flex-col justify-between h-full z-10 animate-slide-in">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-150 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-slate-800">Reschedule Session</h3>
            <p className="text-xs text-slate-500 mt-1">{session.studentName} · Tutor: {session.tutorName}</p>
          </div>
          <button
            onClick={() => setDrawer('session', session.id)} // Go back to session details
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>New Date</Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Calendar size={18} />
                </span>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>New Start Time</Label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10"
              />
            </div>
          </div>

          {/* Adjustment Preview Banner */}
          {isBilled && (
            <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5 space-y-3">
              <div className="flex gap-2 text-amber-800 font-extrabold text-xs uppercase tracking-wider items-center">
                <AlertTriangle size={16} />
                <span>Adjustment Preview</span>
              </div>
              <p className="text-xs font-semibold leading-relaxed text-amber-900">
                Moving this session will create a <span className="font-extrabold text-blue-700">$50 credit adjustment</span> on Invoice <span className="font-extrabold">{session.billedInvoiceNumber}</span>.
              </p>
              <div className="pt-2 border-t border-amber-200/55 flex justify-between items-center text-xs font-bold text-slate-700">
                <span>Original charge:</span>
                <span>$150.00</span>
              </div>
              <div className="flex justify-between items-center text-xs font-bold text-rose-600">
                <span>Credit amount:</span>
                <span>-$50.00</span>
              </div>
              <div className="pt-2 border-t border-amber-250 flex justify-between items-center text-xs font-extrabold text-slate-900">
                <span>Net due:</span>
                <span>$100.00</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-slate-150 flex items-center gap-4 bg-slate-50">
          <button
            onClick={() => setDrawer('session', session.id)}
            className="flex-1 h-11 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold px-4 rounded-xl transition active:scale-[0.98]"
          >
            Cancel
          </button>
          
          <button
            onClick={handleConfirm}
            className="flex-1 h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.98]"
          >
            <span>Confirm</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </aside>
    </div>
  );
}
