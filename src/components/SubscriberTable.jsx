import React from 'react'
import ReceiptStub from './ReceiptStub'
import { formatDate, daysRemaining } from '../utils/status'

export default function SubscriberTable({ rows, onEdit, onDelete }) {
  if (rows.length === 0) {
    return (
      <div className="bg-paper-card border border-line rounded-lg py-16 text-center">
        <p className="font-display text-lg text-ink-900 mb-1">No records here yet</p>
        <p className="text-sm text-ink-700/70">
          Add a receipt, or adjust the filters above to widen the search.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-paper-card border border-line rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-ink-900/[0.03] text-left">
              <th className="px-4 py-3 font-medium text-ink-700 uppercase text-xs tracking-wide">Receipt</th>
              <th className="px-4 py-3 font-medium text-ink-700 uppercase text-xs tracking-wide">Subscriber</th>
              <th className="px-4 py-3 font-medium text-ink-700 uppercase text-xs tracking-wide hidden md:table-cell">Phone</th>
              <th className="px-4 py-3 font-medium text-ink-700 uppercase text-xs tracking-wide hidden lg:table-cell">Period</th>
              <th className="px-4 py-3 font-medium text-ink-700 uppercase text-xs tracking-wide">Status</th>
              <th className="px-4 py-3 font-medium text-ink-700 uppercase text-xs tracking-wide text-right no-print">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr
                key={r.id}
                className={`border-b border-line last:border-0 ${idx % 2 === 1 ? 'bg-ink-900/[0.015]' : ''} hover:bg-brass/5 transition-colors`}
              >
                <td className="px-4 py-3">
                  <ReceiptStub bookNo={r.bookNo} receiptNo={r.receiptNo} />
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium text-ink-900">{r.name}</p>
                  {r.address && <p className="text-xs text-ink-700/70 max-w-xs truncate">{r.address}</p>}
                </td>
                <td className="px-4 py-3 font-mono text-ink-700 hidden md:table-cell">{r.phone || '—'}</td>
                <td className="px-4 py-3 font-mono text-xs text-ink-700 hidden lg:table-cell">
                  {formatDate(r.startDate)} → {formatDate(r.endDate)}
                </td>
                <td className="px-4 py-3">
                  <StatusPill status={r.status} endDate={r.endDate} />
                </td>
                <td className="px-4 py-3 text-right no-print">
                  <button
                    onClick={() => onEdit(r)}
                    className="text-xs text-ink-700 hover:text-brass-dark font-medium mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(r)}
                    className="text-xs text-ink-700 hover:text-oxblood font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function StatusPill({ status, endDate }) {
  if (status === 'active') {
    const remaining = daysRemaining(endDate)
    const soon = remaining <= 30
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
          soon ? 'bg-brass/10 text-brass-dark' : 'bg-forest/10 text-forest'
        }`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${soon ? 'bg-brass' : 'bg-forest'}`} />
        {soon ? `Renews in ${remaining}d` : 'Active'}
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-ink-900/5 text-ink-700/70">
      <span className="w-1.5 h-1.5 rounded-full bg-ink-700/40" />
      Inactive
    </span>
  )
}
