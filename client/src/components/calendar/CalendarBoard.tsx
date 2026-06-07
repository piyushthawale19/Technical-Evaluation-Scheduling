import { useUiStore } from '../../store/uiStore';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function CalendarBoard() {
  const setDrawer = useUiStore((state) => state.setDrawer);
  const setNewSessionDraft = useUiStore((state) => state.setNewSessionDraft);

  const handleCellClick = (date: string, time: string) => {
    setNewSessionDraft({ date, time });
    setDrawer('new-session');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-[2rem] shadow-soft overflow-hidden min-w-[760px]">
      {/* Calendar Header */}
      <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-extrabold text-slate-800">June 11 – 17, 2026</h2>
          <div className="flex items-center rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <button className="p-2 hover:bg-slate-50 transition-colors text-slate-600 border-r border-slate-25">
              <ChevronLeft size={16} />
            </button>
            <button className="p-2 hover:bg-slate-50 transition-colors text-slate-600">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
        <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
          Weekly View
        </div>
      </div>

      {/* Calendar Week Sheet Grid */}
      <div className="w-full select-none">
        {/* Days Header Row */}
        <div className="grid grid-cols-[100px_repeat(7,1fr)] border-b border-slate-150 bg-slate-50">
          {/* Hour column empty header */}
          <div className="border-r border-slate-150" />

          {/* Day Headers */}
          {[
            { name: 'MON', day: '11' },
            { name: 'TUE', day: '12' },
            { name: 'WED', day: '13' },
            { name: 'THU', day: '14' },
            { name: 'FRI', day: '15' },
            { name: 'SAT', day: '16' },
            { name: 'SUN', day: '17' }
          ].map((item) => (
            <div key={item.name} className="py-3.5 text-center border-r border-slate-150 last:border-0 flex flex-col items-center">
              <span className="text-[10px] font-bold tracking-widest text-slate-400">{item.name}</span>
              <span className="text-lg font-extrabold text-slate-800 mt-0.5">{item.day}</span>
            </div>
          ))}
        </div>

        {/* Time Grid Rows */}
        <div className="relative">
          {/* Time row: 09:00 */}
          <div className="grid grid-cols-[100px_repeat(7,1fr)] border-b border-slate-100 min-h-[90px] relative">
            <div className="p-4 text-xs font-bold text-slate-400 text-right pr-5 border-r border-slate-150">09:00 AM</div>
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="border-r border-slate-100 last:border-0 hover:bg-slate-50 cursor-pointer transition-colors"
                onClick={() => handleCellClick(`2026-06-${11 + i}`, '09:00')}
              />
            ))}
          </div>

          {/* Time row: 10:00 */}
          <div className="grid grid-cols-[100px_repeat(7,1fr)] border-b border-slate-100 min-h-[90px] relative">
            <div className="p-4 text-xs font-bold text-slate-400 text-right pr-5 border-r border-slate-150">10:00 AM</div>

            {/* Monday Event Block */}
            <div className="border-r border-slate-100 relative p-1 bg-slate-2.5">
              <div
                onClick={() => setDrawer('session', 's1')}
                className="absolute inset-x-1 top-1 h-[120px] rounded-2xl bg-slate-900 hover:bg-slate-950 text-white p-2.5 shadow-md transition-all duration-150 cursor-pointer flex flex-col justify-between border border-slate-800 z-10 hover:-translate-y-0.5 overflow-hidden"
              >
                <div>
                  <div className="flex flex-col items-start gap-1">
                    <span className="inline-flex rounded-full bg-slate-800 border border-slate-700 px-2 py-0.5 text-[8px] font-extrabold text-white tracking-widest uppercase">
                      BILLED
                    </span>
                    <span className="text-[9px] font-bold text-slate-400">10:00 AM</span>
                  </div>
                  <h4 className="text-xs font-extrabold mt-2 truncate">John Carter</h4>
                  <p className="text-[10px] font-bold text-slate-400 mt-0.5 truncate">Michael Scott</p>
                </div>
              </div>
            </div>

            {/* Empty slots before Monday Event Block are none since Monday is first */}
            {/* But wait, Monday is index 0. The event is on Monday? Yes. */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i + 1}
                className="border-r border-slate-100 last:border-0 hover:bg-slate-50 cursor-pointer transition-colors"
                onClick={() => handleCellClick(`2026-06-${12 + i}`, '10:00')}
              />
            ))}
          </div>

          {/* Time row: 13:00 (01:00 PM) */}
          <div className="grid grid-cols-[100px_repeat(7,1fr)] border-b border-slate-100 min-h-[90px] relative">
            <div className="p-4 text-xs font-bold text-slate-400 text-right pr-5 border-r border-slate-150">01:00 PM</div>

            <div
              className="border-r border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
              onClick={() => handleCellClick('2026-06-11', '13:00')}
            />
            <div
              className="border-r border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
              onClick={() => handleCellClick('2026-06-12', '13:00')}
            />

            {/* Wednesday Event Block */}
            <div className="border-r border-slate-100 relative p-1 bg-blue-2.5">
              <div
                onClick={() => setDrawer('session', 's2')}
                className="absolute inset-x-1 top-1 h-[120px] rounded-2xl bg-blue-600 hover:bg-blue-700 text-white p-2.5 shadow-md transition-all duration-150 cursor-pointer flex flex-col justify-between border border-blue-500 z-10 hover:-translate-y-0.5 overflow-hidden"
              >
                <div>
                  <div className="flex flex-col items-start gap-1">
                    <span className="inline-flex rounded-full bg-blue-500 border border-blue-400 px-2 py-0.5 text-[8px] font-extrabold text-white tracking-widest uppercase">
                      SCHEDULED
                    </span>
                    <span className="text-[9px] font-bold text-blue-200">01:00 PM</span>
                  </div>
                  <h4 className="text-xs font-extrabold mt-2 truncate">Emma Watson</h4>
                  <p className="text-[10px] font-bold text-blue-200 mt-0.5 truncate">Sarah Lee</p>
                </div>
              </div>
            </div>

            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i + 3}
                className="border-r border-slate-100 last:border-0 hover:bg-slate-50 cursor-pointer transition-colors"
                onClick={() => handleCellClick(`2026-06-${14 + i}`, '13:00')}
              />
            ))}
          </div>

          {/* Time row: 15:00 (03:00 PM) */}
          <div className="grid grid-cols-[100px_repeat(7,1fr)] min-h-[90px] relative">
            <div className="p-4 text-xs font-bold text-slate-400 text-right pr-5 border-r border-slate-150">03:00 PM</div>
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="border-r border-slate-100 last:border-0 hover:bg-slate-50 cursor-pointer transition-colors"
                onClick={() => handleCellClick(`2026-06-${11 + i}`, '15:00')}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}