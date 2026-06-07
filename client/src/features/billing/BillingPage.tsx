import { useState } from 'react';
import {
  SlidersHorizontal,
  Download,
  Wallet,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  X
} from 'lucide-react';
import { Card, DataTable, StatusBadge } from '../../components/ui';
import { demoInvoices } from '../../data/mockData';
import { formatCurrency } from '../../lib/date';

export function BillingPage() {
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  return (
    <div className="space-y-6 p-6 lg:p-8 bg-slate-50">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Invoice Management</h1>
          <p className="text-sm text-slate-500 mt-1">Review and manage billing cycles for your tutoring staff.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 shadow-xs transition">
            <SlidersHorizontal size={14} />
            <span>Filters</span>
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2 text-xs font-bold text-white shadow-xs transition">
            <Download size={14} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Total Outstanding */}
        <Card className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-blue-50 text-blue-600">
              <Wallet size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Total Outstanding</p>
              <p className="text-2xl font-extrabold text-slate-800 mt-1">$14,250.00</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 border border-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
            <TrendingUp size={10} />
            +12.5%
          </span>
        </Card>

        {/* Overdue Count */}
        <Card className="p-5 flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-rose-50 text-rose-600">
            <AlertCircle size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Overdue Count</p>
            <p className="text-2xl font-extrabold text-slate-800 mt-1">12 Invoices</p>
          </div>
        </Card>

        {/* Collection Rate */}
        <Card className="p-5 flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Collection Rate</p>
            <p className="text-2xl font-extrabold text-slate-800 mt-1">98.2%</p>
          </div>
        </Card>
      </div>

      {/* Table & Details Layout */}
      <div className="grid gap-6 lg:grid-cols-3 items-start">
        {/* Invoices List Table */}
        <div className="lg:col-span-2">
          <DataTable columns={['Invoice ID', 'Student Name', 'Amount', 'Status', 'Billing Period', 'Actions']}>
            {demoInvoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-slate-50 transition border-t border-slate-100">
                <td className="px-6 py-4 font-bold text-slate-800">{invoice.invoiceNumber}</td>
                <td className="px-6 py-4 font-extrabold text-slate-900">{invoice.id === 'i1' ? 'John Carter' : invoice.id === 'i2' ? 'Emma Watson' : 'Sophia Miller'}</td>
                <td className="px-6 py-4 font-extrabold text-slate-800">{formatCurrency(invoice.amount)}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={invoice.status}>{invoice.status}</StatusBadge>
                </td>
                <td className="px-6 py-4 text-xs font-bold text-slate-500">{invoice.period}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setSelectedInvoice(invoice)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-800"
                  >
                    <span>View Details</span>
                    <ChevronRight size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </DataTable>
        </div>

        {/* Slide detail box next to it if clicked */}
        <div className="lg:col-span-1">
          {selectedInvoice ? (
            <Card className="p-6 space-y-6 relative overflow-hidden border border-slate-200">
              {/* Close button */}
              <button
                onClick={() => setSelectedInvoice(null)}
                className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition"
              >
                <X size={16} />
              </button>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">Invoice Details</span>
                <h3 className="text-xl font-extrabold text-slate-800 mt-1">{selectedInvoice.invoiceNumber}</h3>
                <div className="mt-2">
                  <StatusBadge status={selectedInvoice.status}>{selectedInvoice.status}</StatusBadge>
                </div>
              </div>

              {/* Line items details */}
              <div className="border-t border-slate-100 pt-4 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Line Items</h4>
                {selectedInvoice.lineItems?.map((item: any, i: number) => (
                  <div key={i} className="flex justify-between items-center text-xs font-bold text-slate-700">
                    <span>{item.description}</span>
                    <span>{formatCurrency(item.amount)}</span>
                  </div>
                ))}
              </div>

              {/* Summary calculations */}
              <div className="border-t border-slate-100 pt-4 space-y-2 text-xs font-bold">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span>{formatCurrency(selectedInvoice.amount)}</span>
                </div>
                <div className="flex justify-between text-rose-600">
                  <span>Credits</span>
                  <span>-${selectedInvoice.credits ?? 0}.00</span>
                </div>
                <div className="flex justify-between text-slate-800 border-t border-slate-100 pt-2 font-extrabold text-sm">
                  <span>Net Due</span>
                  <span>{formatCurrency(selectedInvoice.amount - (selectedInvoice.credits ?? 0))}</span>
                </div>
              </div>

              {/* Adjustment info */}
              <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Historical Preservation</p>
                <p className="text-xs font-medium leading-relaxed text-slate-500 mt-2">
                  Invoice history never mutates after issuance. Rescheduled billed sessions generate adjustments instead of rewriting historical record.
                </p>
              </div>
            </Card>
          ) : (
            <Card className="p-6 text-center border border-dashed border-slate-200 bg-slate-50">
              <span className="text-xs font-bold text-slate-400">Select an invoice to preview calculations and line items.</span>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}