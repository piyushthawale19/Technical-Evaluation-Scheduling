import { forwardRef, type ButtonHTMLAttributes, type InputHTMLAttributes, type TextareaHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../lib/cn';

export { cn };

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('rounded-2xl border border-border bg-card shadow-soft', className)}>{children}</div>;
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('border-b border-border px-6 py-4', className)}>{children}</div>;
}

export function CardBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('px-6 py-5', className)}>{children}</div>;
}

export function SectionHeader({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <div className="space-y-1">
      {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{eyebrow}</p> : null}
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h2>
      {description ? <p className="max-w-2xl text-sm text-muted-foreground">{description}</p> : null}
    </div>
  );
}

export function Button({ className, variant = 'primary', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' }) {
  const variants = {
    primary: 'bg-primary text-primary-foreground hover:opacity-95 shadow-soft active:scale-[0.98]',
    secondary: 'border border-border bg-white text-foreground hover:bg-slate-50 active:scale-[0.98]',
    ghost: 'bg-transparent text-foreground hover:bg-slate-100 active:scale-[0.98]'
  };

  return <button className={cn('inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-60', variants[variant], className)} {...props} />;
}

export function GhostButton({ className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn('inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 active:scale-[0.98] transition-all', className)} {...props}>
      {children}
    </button>
  );
}

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input({ className, ...props }, ref) {
  return <input ref={ref} className={cn('h-11 w-full rounded-xl border border-border bg-white px-4 text-sm outline-none ring-0 placeholder:text-slate-400 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10', className)} {...props} />;
});

export const TextArea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(function TextArea({ className, ...props }, ref) {
  return <textarea ref={ref} className={cn('w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none ring-0 placeholder:text-slate-400 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10', className)} {...props} />;
});

export function Label({ children, className }: { children: ReactNode; className?: string }) {
  return <label className={cn('text-xs font-semibold uppercase tracking-[0.18em] text-slate-500', className)}>{children}</label>;
}

export function Badge({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'primary' }) {
  const tones = {
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    warning: 'bg-amber-50 text-amber-700 border-amber-100',
    danger: 'bg-rose-50 text-rose-700 border-rose-100',
    primary: 'bg-blue-50 text-blue-700 border-blue-100'
  };

  return <span className={cn('inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold', tones[tone])}>{children}</span>;
}

export function StatCard({ label, value, note, tone = 'primary' }: { label: string; value: string; note: string; tone?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral' }) {
  const tones = {
    primary: 'bg-blue-50 text-blue-700 border-blue-100',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    warning: 'bg-amber-50 text-amber-700 border-amber-100',
    danger: 'bg-rose-50 text-rose-700 border-rose-100',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200'
  };

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-foreground">{value}</p>
        </div>
        <span className={cn('rounded-full border px-3 py-1 text-xs font-semibold', tones[tone])}>{note}</span>
      </div>
    </Card>
  );
}

export function DataTable({ columns, children }: { columns: string[]; children: ReactNode }) {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-[0.2em] text-slate-500 border-b border-border">
            <tr>{columns.map((column) => <th key={column} className="px-6 py-4 font-semibold">{column}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-border">{children}</tbody>
        </table>
      </div>
    </Card>
  );
}

export function Drawer({ open, title, children, onClose }: { open: boolean; title: string; children: ReactNode; onClose: () => void }) {
  return (
    <div className={cn('fixed inset-0 z-50 transition', open ? 'pointer-events-auto' : 'pointer-events-none')}>
      <div className={cn('absolute inset-0 bg-slate-950/30 backdrop-blur-xs transition-opacity duration-300', open ? 'opacity-100' : 'opacity-0')} onClick={onClose} />
      <aside className={cn('absolute right-0 top-0 h-full w-full max-w-xl border-l border-border bg-white shadow-lift transition-transform duration-300', open ? 'translate-x-0' : 'translate-x-full')}>
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Session Details</p>
            <h3 className="text-xl font-bold text-foreground">{title}</h3>
          </div>
          <button onClick={onClose} className="rounded-xl p-2 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="h-[calc(100vh-80px)] overflow-y-auto p-6 space-y-6">{children}</div>
      </aside>
    </div>
  );
}

const badgeStyles = {
  scheduled: 'bg-blue-50 text-blue-700 border-blue-100',
  completed: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  billed: 'bg-slate-900 text-white border-slate-900',
  unbilled: 'bg-amber-50 text-amber-700 border-amber-100',
  paid: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  overdue: 'bg-rose-50 text-rose-700 border-rose-100',
  draft: 'bg-slate-100 text-slate-700 border-slate-200',
  issued: 'bg-blue-50 text-blue-700 border-blue-100',
  adjustment: 'bg-amber-50 text-amber-700 border-amber-100',
  recurring: 'bg-purple-50 text-purple-700 border-purple-100'
} as const;

export function StatusBadge({ status, children }: { status: keyof typeof badgeStyles | string; children: ReactNode }) {
  const currentStyle = badgeStyles[status as keyof typeof badgeStyles] ?? badgeStyles.draft;
  return <span className={cn('inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider', currentStyle)}>{children}</span>;
}