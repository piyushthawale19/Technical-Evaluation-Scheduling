export type Role = "admin" | "staff" | "tutor";
export type UserRole = Role;

export type SessionStatus = "scheduled" | "completed" | "billed" | "unbilled";
export type InvoiceStatus = "draft" | "issued" | "paid" | "overdue";

export interface Organization {
  id: string;
  name: string;
  slug?: string;
  timezone: string;
}

export interface User {
  id: string;
  organizationId: string;
  fullName: string;
  email: string;
  roles: Role[];
}

export interface Session {
  id: string;
  organizationId: string;
  studentName: string;
  tutorName: string;
  tutorId?: string;
  startTime: string;
  endTime: string;
  timezone: string;
  status: SessionStatus;
  billedInvoiceNumber?: string | null;
  durationMinutes: number;
  notes?: string;
}

export interface InvoiceLineItem {
  description: string;
  amount: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  organizationName?: string; // used by top half
  organization?: string; // used by bottom half
  amount: number;
  status: InvoiceStatus;
  period: string;
  lineItems?: InvoiceLineItem[];
  credits?: number;
  adjustments?: number;
}

export interface Adjustment {
  id: string;
  title?: string;
  reason: string;
  amount?: number; // top half
  amountDelta: number; // bottom half
  invoiceNumber: string;
  sessionId: string;
  createdAt: string;
}

export interface AuditEvent {
  id: string;
  action: string;
  entity: string;
  timestamp: string;
  summary: string;
}

export interface AuditLog {
  id: string;
  action: string;
  entity: string;
  timestamp: string;
  actor: string;
  details: string;
}

export interface DashboardSummary {
  totalSessions: number;
  billedSessions: number;
  unbilledSessions: number;
  activeInvoices: number;
  adjustmentsCreated: number;
}

export interface RecurrenceDraft {
  startDate: string;
  endDate: string;
  tutorName: string;
  studentName: string;
  weeklyFrequency: number;
}
