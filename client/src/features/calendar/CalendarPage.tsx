import { useState } from 'react';
import { useUiStore } from '../../store/uiStore';
import { CalendarBoard } from '../../components/calendar/CalendarBoard';
import { SessionDrawer } from '../../components/drawers/SessionDrawer';
import { RescheduleDrawer } from '../../components/drawers/RescheduleDrawer';
import { NewSessionDrawer } from '../../components/drawers/NewSessionDrawer';
import tutorStudentDeskImg from '../../tutor_student_desk.png';

export function CalendarPage() {
  const [tutorFilters, setTutorFilters] = useState({
    john: true,
    emma: true,
    sophia: true
  });

  const [studentFilters, setStudentFilters] = useState({
    michael: true,
    sarah: true,
    david: true
  });

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)] bg-slate-50">
      {/* Left Sidebar Filters */}
      <aside className="w-full lg:w-64 border-r border-slate-200 bg-white p-6 shrink-0 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Tutors Filter */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500 mb-3">Tutors</h3>
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={tutorFilters.john}
                  onChange={(e) => setTutorFilters({ ...tutorFilters, john: e.target.checked })}
                  className="h-4.5 w-4.5 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500/20 mr-2.5"
                />
                <span>John Carter</span>
              </label>
              <label className="flex items-center text-sm font-semibold text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={tutorFilters.emma}
                  onChange={(e) => setTutorFilters({ ...tutorFilters, emma: e.target.checked })}
                  className="h-4.5 w-4.5 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500/20 mr-2.5"
                />
                <span>Emma Watson</span>
              </label>
              <label className="flex items-center text-sm font-semibold text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={tutorFilters.sophia}
                  onChange={(e) => setTutorFilters({ ...tutorFilters, sophia: e.target.checked })}
                  className="h-4.5 w-4.5 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500/20 mr-2.5"
                />
                <span>Sophia Miller</span>
              </label>
            </div>
          </div>

          {/* Students Filter */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500 mb-3">Students</h3>
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={studentFilters.michael}
                  onChange={(e) => setStudentFilters({ ...studentFilters, michael: e.target.checked })}
                  className="h-4.5 w-4.5 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500/20 mr-2.5"
                />
                <span>Michael Scott</span>
              </label>
              <label className="flex items-center text-sm font-semibold text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={studentFilters.sarah}
                  onChange={(e) => setStudentFilters({ ...studentFilters, sarah: e.target.checked })}
                  className="h-4.5 w-4.5 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500/20 mr-2.5"
                />
                <span>Sarah Lee</span>
              </label>
              <label className="flex items-center text-sm font-semibold text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={studentFilters.david}
                  onChange={(e) => setStudentFilters({ ...studentFilters, david: e.target.checked })}
                  className="h-4.5 w-4.5 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500/20 mr-2.5"
                />
                <span>David Chen</span>
              </label>
            </div>
          </div>
        </div>

        {/* Laptop desk illustration */}
        <div className="mt-8 pt-6 border-t border-slate-100">
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-teal-55 relative">
            <img
              src={tutorStudentDeskImg}
              alt="Tutor and Student illustration"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </aside>

      {/* Main Calendar Content */}
      <main className="flex-1 p-6 lg:p-8 overflow-x-auto">
        <CalendarBoard />
      </main>

      {/* Slide drawers */}
      <NewSessionDrawer />
      <SessionDrawer />
      <RescheduleDrawer />
    </div>
  );
}