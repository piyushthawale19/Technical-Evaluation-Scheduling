import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { formatMoney, formatDateTime } from '../../lib/date';
import { Card, StatusBadge } from '../../components/ui';

export function AdjustmentsPage() {
  const { data, isLoading } = useQuery({ queryKey: ['adjustments'], queryFn: api.getAdjustments });
  const adjustments = data?.adjustments ?? [];

  return (
    <div className="space-y-6 p-6 lg:p-8 bg-slate-50">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Billing Adjustments</h1>
        <p className="text-sm text-slate-500 mt-1">Traceable credits and corrections attached to billed invoice schedules.</p>
      </div>

      <Card className="p-6 md:p-8 max-w-4xl border border-slate-200">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : adjustments.length === 0 ? (
          <p className="text-sm font-semibold text-slate-400 text-center py-8">No adjustments found.</p>
        ) : (
          <div className="space-y-4">
            {adjustments.map((adjustment) => (
              <div key={adjustment.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="font-extrabold text-slate-800">{adjustment.reason}</div>
                  <div className="text-xs font-semibold text-slate-400">
                    Invoice {adjustment.invoiceNumber} · Session {adjustment.sessionId}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-slate-400">
                    {formatDateTime(adjustment.createdAt)}
                  </span>
                  <StatusBadge status={adjustment.amountDelta < 0 ? 'unbilled' : 'completed'}>
                    {formatMoney(adjustment.amountDelta)}
                  </StatusBadge>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}