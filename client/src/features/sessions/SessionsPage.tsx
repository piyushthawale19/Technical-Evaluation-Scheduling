import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { formatClock, formatShortDate } from '../../lib/date';
import { Card, DataTable, StatusBadge } from '../../components/ui';

export function SessionsPage() {
  const { data, isLoading } = useQuery({ queryKey: ['sessions'], queryFn: api.getSessions });
  const sessions = data?.sessions ?? [];

  return (
    <div className="space-y-6 p-6 lg:p-8 bg-slate-50">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Sessions</h1>
        <p className="text-sm text-slate-500 mt-1">Operational session queue for all tutor and student activities.</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <DataTable columns={['Student', 'Tutor', 'Date', 'Time', 'Status', 'Invoice Number']}>
          {sessions.map((session) => (
            <tr key={session.id} className="hover:bg-slate-50 transition border-t border-slate-100">
              <td className="px-6 py-4 font-extrabold text-slate-900">{session.studentName}</td>
              <td className="px-6 py-4 font-semibold text-slate-600">{session.tutorName}</td>
              <td className="px-6 py-4 font-bold text-slate-500">{formatShortDate(session.startTime)}</td>
              <td className="px-6 py-4 font-bold text-slate-500">
                {formatClock(session.startTime)} - {formatClock(session.endTime)}
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={session.status}>{session.status}</StatusBadge>
              </td>
              <td className="px-6 py-4 font-bold text-slate-500">
                {session.billedInvoiceNumber ? `#${session.billedInvoiceNumber}` : 'Unbilled'}
              </td>
            </tr>
          ))}
        </DataTable>
      )}
    </div>
  );
}