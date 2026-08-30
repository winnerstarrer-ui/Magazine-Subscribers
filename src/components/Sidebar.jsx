import React from 'react'
import { useAuth } from '../context/AuthContext'

export default function Sidebar() {
  const { user, logout } = useAuth()

  return (
    <aside
      className="w-full md:w-64 text-white flex md:flex-col justify-between md:min-h-screen no-print"
      style={{ background: 'linear-gradient(180deg, #073c28 0%, #0b2b20 55%, #06140f 100%)' }}
    >
      <div>
        <div className="px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 shadow-lg"
              style={{ background: '#d7b76a', color: '#082419' }}
            >
              ☪
            </div>
            <div>
              <p
                className="text-lg leading-tight font-extrabold"
                style={{ fontFamily: "'Noto Sans Tamil', 'Latha', sans-serif" }}
              >
                இஸ்லாம் டைரி
              </p>
              <p className="text-[11px] tracking-[0.2em] font-semibold" style={{ color: '#e6cf8a' }}>
                ISLAM DIARY
              </p>
            </div>
          </div>
          <p className="text-[11px] text-white/45 tracking-wide mt-3">SUBSCRIBER LEDGER</p>
        </div>

        <nav className="px-3 py-4 hidden md:block">
          <p className="px-3 text-[11px] uppercase tracking-wide text-white/35 mb-2">Ledger</p>
          <div
            className="px-3 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2"
            style={{ background: 'rgba(215,183,106,0.12)', color: '#e6cf8a' }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#d7b76a' }} />
            All receipts
          </div>
        </nav>
      </div>

      <div className="px-6 py-5 border-t border-white/10 flex md:flex-col items-center md:items-start justify-between gap-2">
        <p className="text-xs text-white/60 truncate">{user?.email}</p>
        <button
          onClick={logout}
          className="text-xs text-white/70 hover:text-[#e6cf8a] underline underline-offset-2 transition-colors"
        >
          Sign out
        </button>
      </div>
    </aside>
  )
}
