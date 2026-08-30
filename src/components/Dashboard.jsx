import React, { useEffect, useMemo, useState } from 'react'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../firebase'
import Sidebar from './Sidebar'
import StatCard from './StatCard'
import Filters from './Filters'
import SubscriberTable from './SubscriberTable'
import SubscriberFormModal from './SubscriberFormModal'
import ConfirmDialog from './ConfirmDialog'
import { getStatus, yearOf } from '../utils/status'
import { exportToCsv } from '../utils/csv'

const COLLECTION = 'subscribers'

export default function Dashboard() {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [filters, setFilters] = useState({ book: 'all', year: 'all', status: 'all', search: '' })
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  useEffect(() => {
    const q = query(collection(db, COLLECTION), orderBy('bookNo'))
    const unsub = onSnapshot(
      q,
      (snap) => {
        const rows = snap.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .sort((a, b) => a.bookNo - b.bookNo || a.receiptNo - b.receiptNo)
        setRecords(rows)
        setLoading(false)
      },
      (err) => {
        console.error(err)
        setError('Could not load records from Firestore. Check your connection and Firebase setup.')
        setLoading(false)
      }
    )
    return unsub
  }, [])

  const withStatus = useMemo(
    () => records.map((r) => ({ ...r, status: getStatus(r.endDate) })),
    [records]
  )

  const bookOptions = useMemo(
    () => [...new Set(records.map((r) => r.bookNo))].sort((a, b) => a - b),
    [records]
  )
  const yearOptions = useMemo(
    () => [...new Set(records.map((r) => yearOf(r.startDate)).filter(Boolean))].sort((a, b) => b - a),
    [records]
  )
  const existingKeys = useMemo(
    () => new Set(records.map((r) => `${r.bookNo}-${r.receiptNo}`)),
    [records]
  )

  const filtered = useMemo(() => {
    return withStatus.filter((r) => {
      if (filters.book !== 'all' && String(r.bookNo) !== String(filters.book)) return false
      if (filters.year !== 'all' && String(yearOf(r.startDate)) !== String(filters.year)) return false
      if (filters.status !== 'all' && r.status !== filters.status) return false
      if (filters.search) {
        const s = filters.search.toLowerCase()
        const hay = `${r.name} ${r.phone} ${r.address}`.toLowerCase()
        if (!hay.includes(s)) return false
      }
      return true
    })
  }, [withStatus, filters])

  const stats = useMemo(() => {
    const active = withStatus.filter((r) => r.status === 'active').length
    const inactive = withStatus.filter((r) => r.status === 'inactive').length
    return { total: withStatus.length, active, inactive, books: bookOptions.length }
  }, [withStatus, bookOptions])

  async function handleSave(data) {
    if (editing?.id) {
      await updateDoc(doc(db, COLLECTION, editing.id), data)
    } else {
      await addDoc(collection(db, COLLECTION), data)
    }
    setModalOpen(false)
    setEditing(null)
  }

  async function handleDelete() {
    if (!deleteTarget) return
    await deleteDoc(doc(db, COLLECTION, deleteTarget.id))
    setDeleteTarget(null)
  }

  // Print Two-Column function (respects current filters)
  const handlePrintTwoCol = () => {
    document.body.classList.add('printing-two-col')
    window.print()
    setTimeout(() => {
      document.body.classList.remove('printing-two-col')
    }, 1000)
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen" style={{ background: '#f4f1e8' }}>
      {/* Hide Sidebar during print */}
      <div className="print-hide">
        <Sidebar />
      </div>

      <main className="flex-1 px-5 md:px-8 py-8 max-w-6xl mx-auto w-full">
        <header className="mb-6">
          <p
            className="text-xs font-bold uppercase tracking-[0.22em] mb-1"
            style={{ color: '#8c6f2d' }}
          >
            Islam Diary · Editorial workspace
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: '#10251d' }}>
            Subscriber ledger
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Every receipt issued, filed by book, year and standing.
          </p>
        </header>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm px-4 py-3 mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard label="Total receipts" value={stats.total} tone="ink" />
          <StatCard label="Active" value={stats.active} tone="forest" />
          <StatCard label="Inactive" value={stats.inactive} tone="oxblood" />
          <StatCard label="Books in use" value={stats.books} tone="brass" />
        </div>

        <Filters
          filters={filters}
          setFilters={setFilters}
          bookOptions={bookOptions}
          yearOptions={yearOptions}
          resultCount={filtered.length}
          onAddNew={() => {
            setEditing(null)
            setModalOpen(true)
          }}
          onExport={() => exportToCsv(filtered)}
          onPrint={handlePrintTwoCol}
        />

        {loading ? (
          <div className="bg-[#faf8f1] border border-slate-200 rounded-2xl py-16 text-center text-slate-400 shadow-sm">
            Loading records…
          </div>
        ) : (
          <SubscriberTable
            rows={filtered}
            onEdit={(r) => {
              setEditing(r)
              setModalOpen(true)
            }}
            onDelete={(r) => setDeleteTarget(r)}
          />
        )}
      </main>

      {modalOpen && (
        <SubscriberFormModal
          initial={editing}
          existingKeys={existingKeys}
          onClose={() => {
            setModalOpen(false)
            setEditing(null)
          }}
          onSave={handleSave}
        />
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Delete this receipt?"
          message={`This removes Book ${deleteTarget.bookNo}, Receipt ${deleteTarget.receiptNo} (${deleteTarget.name}) permanently.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {/* ─── TWO-COLUMN PRINT CONTAINER (Hidden on screen) ─── */}
      <div className="two-col-print-container">
        {filtered.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '40px', fontFamily: 'Arial, sans-serif' }}>
            No subscribers match the current filters.
          </p>
        ) : (
          <div className="two-col-grid">
            {(() => {
              const rows = []
              for (let i = 0; i < filtered.length; i += 2) {
                rows.push(filtered.slice(i, i + 2))
              }
              return rows.map((row, rowIndex) => (
                <div key={rowIndex} className="two-col-row">
                  {row.map((sub, colIndex) => (
                    <div key={`${rowIndex}-${colIndex}`} className="two-col-box">
                      <div className="two-col-name">{sub.name}</div>
                      <div className="two-col-address">
                        {sub.address ? sub.address.split(',').map((line, i) => (
                          <span key={i}>
                            {line.trim()}
                            {i < sub.address.split(',').length - 1 && <br />}
                          </span>
                        )) : 'No address provided'}
                      </div>
                      <div className="two-col-phone">📞 {sub.phone}</div>
                    </div>
                  ))}
                  {row.length === 1 && (
                    <div className="two-col-box two-col-empty"></div>
                  )}
                </div>
              ))
            })()}
          </div>
        )}
      </div>
    </div>
  )
}
