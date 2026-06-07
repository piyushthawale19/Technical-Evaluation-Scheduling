import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarDays,
  ReceiptText,
  RefreshCcw,
  History,
  Menu,
  X,
  Bell,
  HelpCircle,
  Plus
} from 'lucide-react';
import { Button } from '../ui';
import { useAuthStore } from '../../store/authStore';
import { useUiStore } from '../../store/uiStore';

const navigation = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/calendar', label: 'Calendar', icon: CalendarDays },
  { to: '/billing', label: 'Invoices', icon: ReceiptText },
  { to: '/recurring', label: 'Recurring', icon: RefreshCcw },
  { to: '/audit', label: 'Audit', icon: History }
];

export function AppShell() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const clearSession = useAuthStore((state) => state.clearSession);
  const navigate = useNavigate();
  const toast = useUiStore((state) => state.toast);
  const hideToast = useUiStore((state) => state.hideToast);
  const setDrawer = useUiStore((state) => state.setDrawer);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      {/* Sidebar - Desktop */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-200 bg-white flex-col lg:flex z-30">
        {/* Brand Header */}
        <div className="px-6 py-5 flex items-center justify-between border-b border-slate-100">
          <div>
            <div className="text-xl font-bold tracking-tight text-blue-700 flex items-center gap-1.5">
              <span>TutorFlow</span>
            </div>
            <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 mt-0.5">
              Enterprise
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors',
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-bold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  ].join(' ')
                }
              >
                <Icon size={18} className="text-current" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-100 space-y-3">
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 flex items-center justify-center gap-2 shadow-sm"
            onClick={() => setDrawer('new-session')}
          >
            <Plus size={16} />
            <span>New Session</span>
          </Button>

          {/* User profile widget at the bottom */}
          <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs uppercase">
                {user?.fullName?.slice(0, 2) ?? 'TF'}
              </div>
              <div className="truncate max-w-[120px]">
                <div className="text-xs font-semibold text-slate-800 truncate">
                  {user?.fullName ?? 'TutorFlow User'}
                </div>
                <div className="text-[10px] text-slate-500 truncate">
                  {user?.email ?? 'admin@tutorflow.com'}
                </div>
              </div>
            </div>
            <button
              onClick={clearSession}
              className="text-slate-400 hover:text-red-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
              title="Sign out"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-slate-950/20 backdrop-blur-xs" onClick={() => setMobileMenuOpen(false)} />
          <aside className="relative flex w-full max-w-xs flex-col bg-white p-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <div>
                <div className="text-xl font-bold tracking-tight text-blue-700">TutorFlow</div>
                <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 mt-0.5">Enterprise</div>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100">
                <X size={20} />
              </button>
            </div>
            <nav className="flex-1 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      [
                        'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors',
                        isActive
                          ? 'bg-blue-50 text-blue-700 font-bold'
                          : 'text-slate-600 hover:bg-slate-50'
                      ].join(' ')
                    }
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 flex items-center justify-center gap-2"
                onClick={() => { setMobileMenuOpen(false); setDrawer('new-session'); }}
              >
                <Plus size={16} />
                <span>New Session</span>
              </Button>
              <Button variant="secondary" className="w-full justify-center" onClick={clearSession}>
                Sign out
              </Button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl lg:hidden"
            >
              <Menu size={20} />
            </button>
            
            {/* Search Input Box */}
            <div className="relative w-full max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search sessions, students..."
                className="w-full h-10 rounded-full border border-slate-200 bg-slate-50 pl-10 pr-4 text-xs font-semibold text-slate-600 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none transition-all duration-150"
              />
            </div>
          </div>

          {/* Right Header Widget List */}
          <div className="flex items-center gap-4.5 pl-4">
            <button className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-50 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white" />
            </button>
            <button className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-50 transition-colors">
              <HelpCircle size={20} />
            </button>
            <div className="h-6 w-px bg-slate-200" />
            
            {/* User Profile avatar */}
            <div className="flex items-center gap-2 cursor-pointer group">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Profile"
                className="h-8 w-8 rounded-full object-cover border border-slate-200"
              />
              <span className="text-xs font-semibold text-slate-600 group-hover:text-slate-900 transition-colors hidden sm:inline">
                Profile Settings
              </span>
            </div>
          </div>
        </header>

        {/* Content Outlet */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-4 right-4 z-[60] flex items-center gap-3 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-xl animate-in slide-in-from-bottom-5 fade-in duration-200">
          <span className="flex-1">{toast.message}</span>
          <button
            onClick={hideToast}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}