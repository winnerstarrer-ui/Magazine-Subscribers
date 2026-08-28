import React from 'react'

export default function StatCard({ label, value, tone = 'ink', hint }) {
  const toneClasses = {
    ink: 'text-ink-900',
    brass: 'text-brass-dark',
    forest: 'text-forest',
    oxblood: 'text-oxblood',
  }

  return (
    <div className="bg-paper-card border border-line rounded-lg px-5 py-4 flex items-center gap-4">
      <div className={`stamp w-11 h-11 flex-shrink-0 flex items-center justify-center ${toneClasses[tone]}`}>
        <span className="font-mono text-sm font-semibold">{typeof value === 'number' ? value : '—'}</span>
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-ink-700/80 font-medium">{label}</p>
        <p className={`font-display text-2xl leading-tight ${toneClasses[tone]}`}>{value}</p>
        {hint && <p className="text-xs text-ink-700/60 mt-0.5">{hint}</p>}
      </div>
    </div>
  )
}
