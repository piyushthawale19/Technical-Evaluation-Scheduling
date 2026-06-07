import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { weeklyRevenue } from '../../data/mockData';
import { Card } from '../ui';

export function RevenueChart() {
  return (
    <Card className="overflow-hidden p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-sm font-semibold text-slate-500">Weekly Revenue</div>
          <div className="text-lg font-bold">Billing performance trend</div>
        </div>
        <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">Last 5 weeks</div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={weeklyRevenue} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="week" tickLine={false} axisLine={false} stroke="#64748b" />
            <YAxis tickLine={false} axisLine={false} stroke="#64748b" width={32} />
            <Tooltip contentStyle={{ borderRadius: 16, borderColor: '#e2e8f0' }} />
            <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} fill="url(#revenueGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
export function RevenueChartCard() {
  return <RevenueChart />;
}
export function SessionsChartCard() {
  return null;
}