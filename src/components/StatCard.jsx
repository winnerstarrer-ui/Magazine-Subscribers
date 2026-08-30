import React from 'react'

export default function StatCard({ label, value, tone = 'ink', hint }) {
  const toneStyles = {
    ink: { bg: 'rgba(9,43,32,0.06)', fg: '#10251d' },
    forest: { bg: 'rgba(11,91,61,0.10)', fg: '#0b5b3d' },
    oxblood: { bg: 'rgba(185,28,28,0.08)', fg: '#b91c1c' },
    brass: { bg: 'rgba(215,183,106,0.18)', fg: '#8c6f2d' },
  }
  const t = toneStyles[tone] || toneStyles.ink

  return (
    <div className="bg-[#faf8f1] border border-slate-200 rounded-2xl px-5 py-4 flex items-center gap-4 shadow-sm">
      <div
        className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center"
        style={{ background: t.bg, color: t.fg }}
      >
        <span className="font-mono text-sm font-bold">{typeof value === 'number' ? value : '—'}</span>
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold">{label}</p>
        <p className="text-2xl leading-tight font-bold" style={{ color: t.fg }}>{value}</p>
        {hint && <p className="text-xs text-slate-400 mt-0.5">{hint}</p>}
      </div>
    </div>
  )
}
