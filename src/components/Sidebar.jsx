import React from 'react'
import { useAuth } from '../context/AuthContext'

export default function Sidebar() {
  const { user, logout } = useAuth()

  return (
    <aside className="w-full md:w-60 bg-ink-900 text-paper flex md:flex-col justify-between md:min-h-screen no-print">
      <div>
        <div className="px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="stamp w-9 h-9 flex items-center justify-center text-brass-light flex-shrink-0">
              <span className="font-display text-sm">R</span>
            </div>
            <div>
              <p className="font-display text-lg leading-tight">The Register</p>
              <p className="text-[11px] text-paper/50 tracking-wide">SUBSCRIBER LEDGER</p>
            </div>
          </div>
        </div>

        <nav className="px-3 py-4 hidden md:block">
          <p className="px-3 text-[11px] uppercase tracking-wide text-paper/40 mb-2">Ledger</p>
          <div className="px-3 py-2 rounded bg-white/5 text-sm font-medium text-brass-light">
            All receipts
          </div>
        </nav>
      </div>

      <div className="px-6 py-5 border-t border-white/10 flex md:flex-col items-center md:items-start justify-between gap-2">
        <p className="text-xs text-paper/60 truncate">{user?.email}</p>
        <button
          onClick={logout}
          className="text-xs text-paper/70 hover:text-brass-light underline underline-offset-2"
        >
          Sign out
        </button>
      </div>
    </aside>
  )
}
