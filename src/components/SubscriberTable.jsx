import React from 'react'
import ReceiptStub from './ReceiptStub'
import { formatDate, daysRemaining } from '../utils/status'

export default function SubscriberTable({ rows, onEdit, onDelete }) {
  if (rows.length === 0) {
    return (
      <div className="bg-[#faf8f1] border border-slate-200 rounded-2xl py-16 text-center shadow-sm">
        <p className="text-lg font-bold text-[#10251d] mb-1">No records here yet</p>
        <p className="text-sm text-slate-500">
          Add a receipt, or adjust the filters above to widen the search.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-[#faf8f1] border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left" style={{ background: 'rgba(11,91,61,0.05)' }}>
              <th className="px-4 py-3 font-semibold text-[#24382f] uppercase text-xs tracking-wide">Receipt</th>
              <th className="px-4 py-3 font-semibold text-[#24382f] uppercase text-xs tracking-wide">Subscriber</th>
              <th className="px-4 py-3 font-semibold text-[#24382f] uppercase text-xs tracking-wide hidden md:table-cell">Phone</th>
              <th className="px-4 py-3 font-semibold text-[#24382f] uppercase text-xs tracking-wide hidden lg:table-cell">Period</th>
              <th className="px-4 py-3 font-semibold text-[#24382f] uppercase text-xs tracking-wide">Status</th>
              <th className="px-4 py-3 font-semibold text-[#24382f] uppercase text-xs tracking-wide text-right no-print">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr
                key={r.id}
                className={`border-b border-slate-100 last:border-0 transition-colors ${
                  idx % 2 === 1 ? 'bg-[#0b5b3d]/[0.02]' : ''
                } hover:bg-[#d7b76a]/10`}
              >
                <td className="px-4 py-3">
                  <ReceiptStub bookNo={r.bookNo} receiptNo={r.receiptNo} />
                </td>
                <td className="px-4 py-3">
                  <p className="font-semibold text-[#10251d]">{r.name}</p>
                  {r.address && <p className="text-xs text-slate-400 max-w-xs truncate">{r.address}</p>}
                </td>
                <td className="px-4 py-3 font-mono text-slate-600 hidden md:table-cell">{r.phone || '—'}</td>
                <td className="px-4 py-3 font-mono text-xs text-slate-500 hidden lg:table-cell">
                  {formatDate(r.startDate)} → {formatDate(r.endDate)}
                </td>
                <td className="px-4 py-3">
                  <StatusPill status={r.status} endDate={r.endDate} />
                </td>
                <td className="px-4 py-3 text-right no-print">
                  <button
                    onClick={() => onEdit(r)}
                    className="text-xs font-semibold mr-3 transition-colors"
                    style={{ color: '#8c6f2d' }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(r)}
                    className="text-xs text-slate-500 hover:text-red-600 font-semibold transition-colors"
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
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
        style={
          soon
            ? { background: 'rgba(215,183,106,0.18)', color: '#8c6f2d' }
            : { background: 'rgba(11,91,61,0.10)', color: '#0b5b3d' }
        }
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: soon ? '#d7b76a' : '#0b5b3d' }} />
        {soon ? `Renews in ${remaining}d` : 'Active'}
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-500">
      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
      Inactive
    </span>
  )
}
