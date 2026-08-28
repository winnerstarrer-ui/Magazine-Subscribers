import React from 'react'

export default function Filters({
  filters,
  setFilters,
  bookOptions,
  yearOptions,
  onAddNew,
  onExport,
  onPrint,      // 👈 NEW: print function
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

  return (
    <div className="bg-paper-card border border-line rounded-lg p-4 mb-5">
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-medium uppercase tracking-wide text-ink-700 mb-1">
            Search
          </label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => update('search', e.target.value)}
            placeholder="Name, phone or address…"
            className="w-full px-3 py-2 rounded border border-line bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brass"
          />
        </div>

        <div>
          <label className="block text-xs font-medium uppercase tracking-wide text-ink-700 mb-1">
            Book No
          </label>
          <select
            value={filters.book}
            onChange={(e) => update('book', e.target.value)}
            className="px-3 py-2 rounded border border-line bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brass"
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
          <label className="block text-xs font-medium uppercase tracking-wide text-ink-700 mb-1">
            Year
          </label>
          <select
            value={filters.year}
            onChange={(e) => update('year', e.target.value)}
            className="px-3 py-2 rounded border border-line bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brass"
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
          <label className="block text-xs font-medium uppercase tracking-wide text-ink-700 mb-1">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => update('status', e.target.value)}
            className="px-3 py-2 rounded border border-line bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brass"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {hasActiveFilters && (
          <button
            onClick={reset}
            className="px-3 py-2 text-sm text-ink-700 hover:text-oxblood transition-colors"
          >
            Clear filters
          </button>
        )}

        <div className="flex-1" />

        {/* 👇 NEW: Print Two-Column button */}
        <button
          onClick={onPrint}
          className="px-4 py-2 text-sm rounded border border-line bg-white hover:bg-ink-900/5 transition-colors flex items-center gap-1"
          style={{ borderColor: '#8B5CF6', color: '#8B5CF6' }}
        >
          <i className="fas fa-columns"></i> Print (2‑col)
        </button>

        <button
          onClick={onExport}
          className="px-4 py-2 text-sm rounded border border-line bg-white hover:bg-ink-900/5 transition-colors"
        >
          Export CSV
        </button>
        <button
          onClick={onAddNew}
          className="px-4 py-2 text-sm rounded bg-ink-900 text-paper hover:bg-ink-700 transition-colors font-medium"
        >
          + New receipt
        </button>
      </div>

      <p className="text-xs text-ink-700/70 mt-3">
        {resultCount} record{resultCount === 1 ? '' : 's'} matching
      </p>
    </div>
  )
}