import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function DashboardLayout({ children }) {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#071b14] text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="border-b border-white/10 bg-[#061711]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0b5b3d] text-[#e6cf8a] font-bold shadow-md">
              ☪
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight leading-tight" style={{ fontFamily: "'Noto Sans Tamil', 'Latha', sans-serif" }}>
                இஸ்லாம் டைரி
              </h1>
              <p className="text-[10px] font-semibold tracking-[0.18em] text-[#d7b76a] uppercase">
                Islam Diary
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block text-xs text-white/70">
              {user?.email || 'editor@islamdiary.com'}
            </span>
            <button
              onClick={logout}
              className="px-3.5 py-1.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-semibold text-white/90 transition"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        
        {/* Left Sidebar: Brand & Quick Stats Panel */}
        <aside className="space-y-6">
          <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md shadow-xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-[#e6cf8a]">
              <span>★ Subscriber Workspace</span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed italic" style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}>
              "இஸ்லாம் என்பது உன் ஆத்மா அமைதி பெறவும், பிறர் உன்மூலம் அமைதி பெறவும் உள்ளதாகும்."
            </p>
            <div className="mt-6 pt-4 border-t border-white/10 text-xs text-white/50">
              <p className="uppercase tracking-widest text-[10px] text-[#d7b76a]">Editor In Charge</p>
              <p className="font-semibold text-white mt-1">S. Kaja Mohideen, B.Sc.</p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="rounded-2xl border border-white/10 bg-[#020b08]/60 p-5 space-y-4">
            <div>
              <p className="text-xs text-white/50 uppercase tracking-wider">Total Subscribers</p>
              <p className="text-2xl font-bold text-[#e6cf8a] mt-1">1,248</p>
            </div>
            <div className="border-t border-white/5 pt-3">
              <p className="text-xs text-white/50 uppercase tracking-wider">Active Monthly</p>
              <p className="text-xl font-semibold text-white mt-0.5">1,090</p>
            </div>
          </div>
        </aside>

        {/* Right Main Content Area: Magazine Paper Card Style */}
        <main className="rounded-[24px] border border-white/20 bg-[#faf8f1] p-6 sm:p-8 text-slate-900 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8c6f2d]">
                Subscriber Register
              </span>
              <h2 className="text-2xl font-extrabold text-[#092b20] tracking-tight mt-1">
                Recent Subscriptions
              </h2>
            </div>
            <button className="self-start sm:self-auto px-4 py-2 bg-[#0b5b3d] hover:bg-[#084b32] text-white rounded-xl text-sm font-bold shadow-md shadow-[#0b5b3d]/20 transition">
              + Add Subscriber
            </button>
          </div>

          {/* Example Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="text-xs uppercase bg-[#092b20]/5 text-[#092b20] font-bold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 rounded-l-lg">Subscriber</th>
                  <th className="px-4 py-3">Plan</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 rounded-r-lg text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80 transition">
                  <td className="px-4 py-3.5 font-medium text-slate-900">A. Rahman</td>
                  <td className="px-4 py-3 text-slate-600">Annual Print</td>
                  <td className="px-4 py-3">
                    <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">Active</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-xs font-bold text-[#0b5b3d] hover:underline">Edit</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>

      </div>
    </div>
  )
}