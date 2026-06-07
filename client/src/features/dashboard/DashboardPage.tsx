import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  CreditCard,
  AlertCircle,
  FileText,
  UserPlus,
  RefreshCw,
  MoreVertical,
  ChevronDown,
  ArrowUpRight,
  TrendingUp,
  SlidersHorizontal,
  Download,
  HelpCircle,
  ChevronRight
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Card, Button } from '../../components/ui';
import { weeklyRevenue, sessionsByWeek } from '../../data/mockData';

export function DashboardPage() {
  const navigate = useNavigate();

  // Activity list matching screenshot
  const recentActivities = [
    {
      id: 1,
      type: 'reschedule',
      icon: RefreshCw,
      iconBg: 'bg-blue-50 text-blue-600',
      title: 'Michael Scott rescheduled session with John Carter',
      time: '2 hours ago • Session Logistics',
    },
    {
      id: 2,
      type: 'invoice',
      icon: FileText,
      iconBg: 'bg-emerald-50 text-emerald-600',
      title: 'Invoice INV-1001 issued',
      time: '5 hours ago • Billing',
      badge: '$450.00 • Due in 14 days',
    },
    {
      id: 3,
      type: 'adjustment',
      icon: RefreshCw,
      iconBg: 'bg-indigo-50 text-indigo-600',
      title: 'Adjustment created for INV-1002',
      time: 'Yesterday • Accounting',
    },
    {
      id: 4,
      type: 'student',
      icon: UserPlus,
      iconBg: 'bg-slate-100 text-slate-600',
      title: 'New Student Pam Beesly added to the system',
      time: 'Yesterday • Onboarding',
    }
  ];

  return (
    <div className="space-y-6 p-6 lg:p-8 bg-slate-50">
      {/* Overview Title and actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Overview</h1>
          <p className="text-sm text-slate-500 mt-1">Real-time performance metrics for October 2023.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="flex items-center gap-2 h-10 px-4">
            <Download size={16} />
            <span>Export Report</span>
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 h-10 px-4">
            <SlidersHorizontal size={16} />
            <span>Filter</span>
          </Button>
        </div>
      </div>

      {/* Grid of Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Card 1: Total Sessions */}
        <Card className="p-5 flex flex-col justify-between relative overflow-hidden h-44">
          <div className="flex justify-between items-start">
            <div className="p-3 rounded-2xl bg-blue-50 text-blue-600">
              <Calendar size={20} />
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
              <TrendingUp size={12} />
              +12%
            </span>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Total Sessions</p>
            <p className="text-3xl font-extrabold text-slate-900 mt-1">1,325</p>
          </div>
          {/* Graduation Cap Watermark */}
          <div className="absolute right-4 bottom-2 opacity-5 text-slate-900 pointer-events-none">
            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z M12 17.5c-2.48 0-4.5-2.02-4.5-4.5h9c0 2.48-2.02 4.5-4.5 4.5z" />
            </svg>
          </div>
        </Card>

        {/* Card 2: Billed Sessions */}
        <Card className="p-5 flex flex-col justify-between relative overflow-hidden h-44">
          <div className="flex justify-between items-start">
            <div className="p-3 rounded-2xl bg-slate-100 text-slate-600">
              <CreditCard size={20} />
            </div>
            <span className="inline-flex items-center rounded-full bg-slate-100 border border-slate-200 px-2.5 py-0.5 text-xs font-bold text-slate-600">
              Billed
            </span>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Billed Sessions</p>
            <p className="text-3xl font-extrabold text-slate-900 mt-1">1,240</p>
          </div>
        </Card>

        {/* Card 3: Unbilled and Invoices combined */}
        <Card className="flex flex-col justify-between overflow-hidden h-44 border border-slate-200">
          {/* Top Row: Split Metrics */}
          <div className="flex flex-1 p-5 divide-x divide-slate-150">
            {/* Left side: Unbilled */}
            <div className="flex-1 pr-4">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Unbilled</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-3xl font-extrabold text-red-600">85</span>
                <span className="inline-flex items-center rounded-full bg-red-50 border border-red-100 px-2 py-0.5 text-[9px] font-bold text-red-600 tracking-wider">
                  ACTION REQUIRED
                </span>
              </div>
            </div>
            {/* Right side: Invoices */}
            <div className="flex-1 pl-6">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Invoices</span>
              <div className="text-3xl font-extrabold text-slate-900 mt-1">12</div>
            </div>
          </div>

          {/* Bottom Row: Adjustments and Actions */}
          <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">4 Adjustments Created</span>
            <button className="text-slate-400 hover:text-slate-600 transition-colors">
              <MoreVertical size={16} />
            </button>
          </div>
        </Card>
      </div>

      {/* Row 2: Charts and Activity */}
      <div className="grid gap-6 lg:grid-cols-[1.8fr_1.2fr]">
        {/* Weekly Revenue Line Chart Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Weekly Revenue</h3>
            </div>
            <button className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition shadow-xs">
              <span>Last 30 Days</span>
              <ChevronDown size={14} />
            </button>
          </div>
          
          <div className="h-64 relative">
            {/* Tooltip Overlay Mock (Matches exact visual style) */}
            <div className="absolute left-[58%] top-[25%] bg-slate-950 text-white text-xs font-bold py-1 px-2.5 rounded-lg shadow-md z-10 pointer-events-none flex items-center gap-1">
              <span>$12.4k</span>
            </div>

            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyRevenue} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={true} />
                <XAxis
                  dataKey="week"
                  tickLine={false}
                  axisLine={false}
                  stroke="#94a3b8"
                  fontSize={10}
                  fontWeight="bold"
                  dy={10}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  stroke="#94a3b8"
                  fontSize={10}
                  fontWeight="bold"
                  dx={-10}
                  tickFormatter={(val) => `$${val / 1000}k`}
                />
                <Tooltip cursor={false} content={() => null} /> {/* Custom render to use mock overlay */}
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2563eb"
                  strokeWidth={3}
                  fill="url(#revenueGrad)"
                  activeDot={{ r: 6, fill: '#2563eb', stroke: '#fff', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent Activity Card */}
        <Card className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-extrabold text-slate-900">Recent Activity</h3>
              <button
                onClick={() => navigate('/audit')}
                className="text-xs font-bold text-blue-700 hover:text-blue-800 hover:underline"
              >
                View All
              </button>
            </div>

            {/* Timeline */}
            <div className="space-y-5 relative">
              {/* Vertical timeline line */}
              <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-slate-100 -z-0" />

              {recentActivities.map((act) => (
                <div key={act.id} className="flex gap-4 relative z-10">
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center border-4 border-white shadow-xs shrink-0 ${act.iconBg}`}>
                    <act.icon size={16} />
                  </div>
                  <div className="pt-1.5 flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-800 leading-tight">
                      {act.title}
                    </p>
                    <p className="text-[10px] font-semibold text-slate-400 mt-1">
                      {act.time}
                    </p>
                    {act.badge && (
                      <div className="mt-2">
                        <span className="inline-flex items-center rounded-full bg-slate-50 border border-slate-200 px-3 py-1 text-[10px] font-bold text-slate-600 shadow-xs">
                          {act.badge}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Row 3: Sessions by Week & Bottom Cards */}
      <div className="grid gap-6 lg:grid-cols-[1.8fr_1.2fr]">
        {/* Sessions by week bar chart */}
        <Card className="p-6">
          <h3 className="text-base font-extrabold text-slate-900 mb-6">Sessions By Week</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sessionsByWeek} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="week"
                  tickLine={false}
                  axisLine={false}
                  stroke="#94a3b8"
                  fontSize={10}
                  fontWeight="bold"
                  dy={10}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  stroke="#94a3b8"
                  fontSize={10}
                  fontWeight="bold"
                  dx={-10}
                />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar
                  dataKey="sessions"
                  fill="#dbeafe"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={48}
                  activeBar={{ fill: '#2563eb' }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Bottom Promos stack */}
        <div className="space-y-6 flex flex-col justify-between">
          {/* Blue Pro Analytics Promo */}
          <div className="rounded-[2rem] bg-blue-600 p-6 text-white relative overflow-hidden flex flex-col justify-between flex-1 min-h-[140px]">
            <div className="max-w-[80%] space-y-1 relative z-10">
              <h4 className="font-extrabold text-lg">Need deep analytics?</h4>
              <p className="text-xs text-blue-100 font-semibold leading-relaxed">
                Upgrade to Pro to access automated tax reporting and student performance prediction models.
              </p>
            </div>
            <div className="mt-4 relative z-10">
              <Button className="bg-white hover:bg-slate-50 text-blue-700 font-bold px-4 py-2 border-0 shadow-sm">
                Explore Pro Features
              </Button>
            </div>
            {/* Watermark Graphic */}
            <div className="absolute right-4 bottom-[-10px] opacity-10 text-white pointer-events-none">
              <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
              </svg>
            </div>
          </div>

          {/* Grey Billing Cycles Card */}
          <Card className="p-5 flex items-center gap-5 bg-slate-50 border border-slate-200 flex-1 min-h-[140px]">
            <div className="w-32 h-20 shrink-0 rounded-2xl overflow-hidden border border-slate-200 shadow-xs relative">
              <img
                src="https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=400&h=300&q=80"
                alt="Tablet illustrations"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-blue-600/5" />
            </div>
            <div className="flex-1 space-y-2">
              <h4 className="font-extrabold text-sm text-slate-800">Review Billing Cycles</h4>
              <p className="text-xs font-semibold text-slate-500 leading-normal">
                Your monthly billing cycle closes in 3 days. Review pending adjustments now.
              </p>
              <button
                onClick={() => navigate('/billing')}
                className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-800 group"
              >
                <span>Review Invoices</span>
                <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}