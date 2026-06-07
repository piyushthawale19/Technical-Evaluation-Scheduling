import { useState } from 'react';
import { X, Calendar as CalendarIcon, Clock, User, UserCircle } from 'lucide-react';
import { useUiStore } from '../../store/uiStore';
import { demoStudents, demoTutors } from '../../data/mockData';
import { Button, Label, Input } from '../ui';

export function NewSessionDrawer() {
  const drawer = useUiStore((state) => state.drawer);
  const setDrawer = useUiStore((state) => state.setDrawer);
  const newSessionDraft = useUiStore((state) => state.newSessionDraft);
  const setNewSessionDraft = useUiStore((state) => state.setNewSessionDraft);
  const showToast = useUiStore((state) => state.showToast);

  const [date, setDate] = useState(newSessionDraft?.date || '2026-06-15');
  const [time, setTime] = useState(newSessionDraft?.time || '09:00');
  const [tutor, setTutor] = useState('');
  const [student, setStudent] = useState('');

  if (drawer !== 'new-session') {
    return null;
  }

  const handleClose = () => {
    setDrawer('closed');
    setNewSessionDraft(null);
  };

  const handleConfirm = () => {
    if (!tutor || !student || !date || !time) {
      showToast('Please fill all the required fields.', 'error');
      return;
    }

    // Simulate creating a session
    showToast(`Successfully scheduled session for ${student} with ${tutor} on ${date} at ${time}.`, 'success');
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/20 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
      />

      {/* Drawer */}
      <aside className="relative w-full max-w-[460px] bg-white border-l border-slate-200 shadow-2xl flex flex-col justify-between h-full z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-150 flex items-center justify-between bg-white">
          <div>
            <h3 className="text-lg font-extrabold text-slate-800">Create New Session</h3>
            <p className="text-xs text-slate-500 mt-1">Schedule a session for a student.</p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 bg-slate-50">
          <div className="space-y-5">
            <div className="space-y-2">
              <Label>Tutor</Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <UserCircle size={18} />
                </span>
                <input
                  list="tutors"
                  value={tutor}
                  onChange={(e) => setTutor(e.target.value)}
                  placeholder="Select tutor"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                />
                <datalist id="tutors">
                  {demoTutors.map((t) => <option key={t} value={t} />)}
                </datalist>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Student</Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User size={18} />
                </span>
                <input
                  list="students"
                  value={student}
                  onChange={(e) => setStudent(e.target.value)}
                  placeholder="Select student"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                />
                <datalist id="students">
                  {demoStudents.map((s) => <option key={s} value={s} />)}
                </datalist>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <CalendarIcon size={18} />
                  </span>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Start Time</Label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Clock size={18} />
                  </span>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 space-y-3">
              <div className="flex justify-between items-center text-xs font-bold text-blue-700">
                <span>Status:</span>
                <span className="inline-flex rounded-full bg-blue-500 border border-blue-400 px-2 py-0.5 text-[10px] font-extrabold text-white tracking-widest uppercase">
                  SCHEDULED
                </span>
              </div>
              <p className="text-xs font-semibold leading-relaxed text-blue-900">
                New sessions are created as scheduled by default. Billing and invoicing happen after the session is completed.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-slate-150 flex items-center gap-4 bg-white">
          <button
            onClick={handleClose}
            className="flex-1 h-11 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold px-4 rounded-xl transition active:scale-[0.98]"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            className="flex-1 h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.98]"
          >
            <span>Create Session</span>
          </button>
        </div>
      </aside>
    </div>
  );
}
