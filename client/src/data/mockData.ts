import type { Adjustment, AuditEvent, AuditLog, Invoice, Session, DashboardSummary } from "../types/domain";

export const dashboardStats = [
  { label: "Total Sessions", value: "1,325", delta: "+12%", tone: "primary" },
  { label: "Billed Sessions", value: "1,240", delta: "Billed", tone: "success" },
  { label: "Unbilled Sessions", value: "85", delta: "Action required", tone: "warning" },
  { label: "Active Invoices", value: "12", delta: "Open", tone: "neutral" },
  { label: "Adjustments Created", value: "4", delta: "Billing integrity preserved", tone: "danger" },
] as const;

export const dashboardSummary: DashboardSummary = {
  totalSessions: 1325,
  billedSessions: 1240,
  unbilledSessions: 85,
  activeInvoices: 12,
  adjustmentsCreated: 4,
};

export const weeklyRevenue = [
  { week: "WEEK 1", revenue: 12400 },
  { week: "WEEK 2", revenue: 14500 },
  { week: "WEEK 3", revenue: 13200 },
  { week: "WEEK 4", revenue: 18100 },
];

export const sessionsByWeek = [
  { week: "Mon", sessions: 5 },
  { week: "Tue", sessions: 8 },
  { week: "Wed", sessions: 7 },
  { week: "Thu", sessions: 10 },
  { week: "Fri", sessions: 4 },
];

export const recentActivity: AuditEvent[] = [
  {
    id: "a1",
    action: "Invoice Issued",
    entity: "INV-1001",
    timestamp: "2026-06-07T14:20:00Z",
    summary: "Michael Scott rescheduled session with John Carter",
  },
  {
    id: "a2",
    action: "Session Rescheduled",
    entity: "Session",
    timestamp: "2026-06-07T16:10:00Z",
    summary: "Emma Watson session moved to the following week.",
  },
  {
    id: "a3",
    action: "Adjustment Created",
    entity: "Credit Adjustment",
    timestamp: "2026-06-06T09:30:00Z",
    summary: "Credit posted to preserve invoice history.",
  },
];

export const demoSessions: Session[] = [
  {
    id: "s1",
    organizationId: "org_tutorflow",
    studentName: "Michael Scott",
    tutorName: "John Carter",
    startTime: "2026-09-11T10:00:00.000Z",
    endTime: "2026-09-11T11:30:00.000Z",
    timezone: "America/New_York",
    status: "billed",
    billedInvoiceNumber: "INV-9821",
    durationMinutes: 90,
  },
  {
    id: "s2",
    organizationId: "org_tutorflow",
    studentName: "Sarah Lee",
    tutorName: "Emma Watson",
    startTime: "2026-09-13T13:00:00.000Z",
    endTime: "2026-09-13T14:30:00.000Z",
    timezone: "America/New_York",
    status: "scheduled",
    durationMinutes: 90,
  },
  {
    id: "s3",
    organizationId: "org_tutorflow",
    studentName: "David Chen",
    tutorName: "Sophia Miller",
    startTime: "2026-09-12T15:00:00.000Z",
    endTime: "2026-09-12T16:00:00.000Z",
    timezone: "America/New_York",
    status: "completed",
    durationMinutes: 60,
  },
];

export const sessions: Session[] = demoSessions;

export const demoInvoices: Invoice[] = [
  {
    id: "i1",
    invoiceNumber: "INV-1001",
    organizationName: "TutorFlow Academy",
    organization: "TutorFlow Academy",
    amount: 150,
    status: "issued",
    period: "Jan 1-7",
    lineItems: [
      { description: "John Carter - Algebra tutoring", amount: 150 },
    ],
    credits: 0,
    adjustments: 0,
  },
  {
    id: "i2",
    invoiceNumber: "INV-1002",
    organizationName: "TutorFlow Academy",
    organization: "TutorFlow Academy",
    amount: 200,
    status: "overdue",
    period: "Jan 1-7",
    lineItems: [
      { description: "Emma Watson - SAT prep", amount: 200 },
    ],
    credits: 0,
    adjustments: 1,
  },
  {
    id: "i3",
    invoiceNumber: "INV-1003",
    organizationName: "TutorFlow Academy",
    organization: "TutorFlow Academy",
    amount: 150,
    status: "paid",
    period: "Jan 8-14",
    lineItems: [
      { description: "Sophia Miller - Study skills", amount: 150 },
    ],
    credits: 0,
    adjustments: 0,
  },
];

export const invoices: Invoice[] = demoInvoices;

export const demoAdjustments: Adjustment[] = [
  {
    id: "adj-1",
    reason: "Refund for technical difficulties during Oct 12 session. Approved by Admin.",
    amountDelta: -50,
    invoiceNumber: "INV-1001",
    sessionId: "s1",
    createdAt: "2026-06-06T16:45:00Z",
  },
  {
    id: "adj-2",
    reason: "Billing Correction",
    amountDelta: 25,
    invoiceNumber: "INV-1002",
    sessionId: "s2",
    createdAt: "2026-06-06T11:05:00Z",
  },
];

export const adjustments: Adjustment[] = demoAdjustments;

export const auditLogs: AuditLog[] = [
  {
    id: "aud_1",
    action: "Session Rescheduled",
    entity: "Session",
    timestamp: "2026-06-07T10:30:00.000Z",
    actor: "Michael Scott",
    details: "Tutor Michael Scott updated schedule for Student David Chen. Was: 02:00 PM, Is: 10:30 AM",
  },
  {
    id: "aud_2",
    action: "Invoice Issued",
    entity: "Invoice",
    timestamp: "2026-06-07T09:15:00.000Z",
    actor: "Billing Bot",
    details: "Automated billing run completed. Total amount: $450.00.",
  },
  {
    id: "aud_3",
    action: "Adjustment Created",
    entity: "Adjustment",
    timestamp: "2026-06-06T16:45:00.000Z",
    actor: "Admin",
    details: "Manual billing correction applied for Student Emma Watson.",
  },
  {
    id: "aud_4",
    action: "New Recurring Session Created",
    entity: "SessionRecurrence",
    timestamp: "2026-06-06T11:02:00.000Z",
    actor: "Staff",
    details: "New weekly math enrollment for Student John Carter. Every Tuesday 4:00 PM EST",
  },
];

export const demoTutors = ["John Carter", "Emma Watson", "Sophia Miller"];
export const demoStudents = ["Michael Scott", "Sarah Lee", "David Chen"];

export const calendarEvents = sessions.map((session) => ({
  id: session.id,
  title: `${session.studentName} · ${session.tutorName}`,
  start: session.startTime,
  end: session.endTime,
  status: session.status,
  studentName: session.studentName,
  tutorName: session.tutorName,
  billedInvoiceNumber: session.billedInvoiceNumber,
}));
