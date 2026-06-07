import type { ReactNode } from 'react';
import { School } from 'lucide-react';

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4 py-12">
      {/* Brand Header Logo */}
      <div className="flex flex-col items-center mb-8 text-center">
        <div className="bg-blue-600 p-2.5 rounded-2xl text-white shadow-soft mb-3">
          <School size={28} />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5 justify-center">
          <span>TutorFlow</span>
        </h1>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-[0.2em] mt-1">
          Enterprise Education Management
        </p>
      </div>

      {/* Main Card Wrapper */}
      <div className="w-full max-w-[440px] bg-white border border-slate-200 rounded-[2rem] shadow-soft p-8 sm:p-10">
        {children}
      </div>

      {/* Footer Branding */}
      <div className="mt-8 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
          Trusted by Leading Institutions
        </p>
      </div>
    </div>
  );
}