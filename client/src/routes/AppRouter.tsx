import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { AppShell } from '../components/layout/AppShell';

// Features imports
import { LoginPage } from '../features/auth/LoginPage';
import { RegisterPage } from '../features/auth/RegisterPage';
import { DashboardPage } from '../features/dashboard/DashboardPage';
import { CalendarPage } from '../features/calendar/CalendarPage';
import { BillingPage } from '../features/billing/BillingPage';
import { AdjustmentsPage } from '../features/adjustments/AdjustmentsPage';
import { SessionsPage } from '../features/sessions/SessionsPage';
import { RecurringSessionsPage } from '../features/sessions/RecurringSessionsPage';
import { AuditPage } from '../features/audit/AuditPage';

export function AppRouter() {
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);
  const setSession = useAuthStore((state) => state.setSession);
  const clearSession = useAuthStore((state) => state.clearSession);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isAuthed = window.localStorage.getItem('tutorflow-auth');
    if (isAuthed === 'true') {
      // Restore default demo session if auth key exists
      setSession({
        accessToken: 'demo-token',
        user: {
          id: 'user_admin',
          organizationId: 'org_tutorflow',
          fullName: 'Avery Brooks',
          email: 'admin@tutorflow.com',
          roles: ['admin']
        }
      });
    } else {
      clearSession();
    }
    setIsLoading(false);
  }, [setSession, clearSession]);

  const isAuthed = useMemo(() => Boolean(accessToken && user), [accessToken, user]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-semibold text-slate-500">Loading TutorFlow...</p>
        </div>
      </div>
    );
  }

  if (!isAuthed) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/billing" element={<BillingPage />} />
        <Route path="/adjustments" element={<AdjustmentsPage />} />
        <Route path="/sessions" element={<SessionsPage />} />
        <Route path="/recurring" element={<RecurringSessionsPage />} />
        <Route path="/audit" element={<AuditPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}