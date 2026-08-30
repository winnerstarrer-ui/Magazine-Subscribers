import React from 'react'

export default function Filters({
  filters,
  setFilters,
  bookOptions,
  yearOptions,
  onAddNew,
  onExport,
  onPrint,      // print function
  resultCount,
}) {
  function update(key, value) {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  function reset() {
    setFilters({ book: 'all', year: 'all', status: 'all', search: '' })
  }

  const hasActiveFilters =
    filters.book !== 'all' || filters.year !== 'all' || filters.status !== 'all' || filters.search

  const inputClass =
    'px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#0b6b48] focus:ring-4 focus:ring-[#0b6b48]/10'

  return (
    <div className="bg-[#faf8f1] border border-slate-200 rounded-2xl p-4 mb-5 shadow-sm">
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
            Search
          </label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => update('search', e.target.value)}
            placeholder="Name, phone or address…"
            className={`w-full ${inputClass}`}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
            Book No
          </label>
          <select
            value={filters.book}
            onChange={(e) => update('book', e.target.value)}
            className={inputClass}
          >
            <option value="all">All books</option>
            {bookOptions.map((b) => (
              <option key={b} value={b}>
                Book {b}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
            Year
          </label>
          <select
            value={filters.year}
            onChange={(e) => update('year', e.target.value)}
            className={inputClass}
          >
            <option value="all">All years</option>
            {yearOptions.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => update('status', e.target.value)}
            className={inputClass}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {hasActiveFilters && (
          <button
            onClick={reset}
            className="px-3 py-2 text-sm text-slate-500 hover:text-red-600 transition-colors"
          >
            Clear filters
          </button>
        )}

        <div className="flex-1" />

        <button
          onClick={onPrint}
          className="px-4 py-2 text-sm rounded-xl border transition-colors flex items-center gap-1.5 font-medium"
          style={{ borderColor: '#d7b76a', color: '#8c6f2d', background: 'rgba(215,183,106,0.08)' }}
        >
          <i className="fas fa-columns"></i> Print (2‑col)
        </button>

        <button
          onClick={onExport}
          className="px-4 py-2 text-sm rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors font-medium"
        >
          Export CSV
        </button>
        <button
          onClick={onAddNew}
          className="px-4 py-2 text-sm rounded-xl text-white font-bold shadow-lg shadow-[#0b5b3d]/20 transition-all hover:-translate-y-0.5"
          style={{ background: '#0b5b3d' }}
        >
          + New receipt
        </button>
      </div>

      <p className="text-xs text-slate-400 mt-3">
        {resultCount} record{resultCount === 1 ? '' : 's'} matching
      </p>
    </div>
  )
}
