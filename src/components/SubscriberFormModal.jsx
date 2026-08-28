import React, { useEffect, useState } from 'react'

const emptyForm = {
  bookNo: '',
  receiptNo: '',
  name: '',
  address: '',
  phone: '',
  startDate: '',
  endDate: '',
}

export default function SubscriberFormModal({ initial, onClose, onSave, existingKeys }) {
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setForm(initial ? { ...emptyForm, ...initial } : emptyForm)
    setError('')
  }, [initial])

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function autoFillEndDate(startDate) {
    if (!startDate) return
    const d = new Date(startDate)
    d.setFullYear(d.getFullYear() + 1)
    d.setDate(d.getDate() - 1)
    setForm((prev) => ({ ...prev, startDate, endDate: d.toISOString().slice(0, 10) }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    const bookNo = Number(form.bookNo)
    const receiptNo = Number(form.receiptNo)

    if (!bookNo || bookNo < 1) return setError('Enter a valid book number.')
    if (!receiptNo || receiptNo < 1 || receiptNo > 50)
      return setError('Receipt number must be between 1 and 50 — each book holds 50 receipts.')
    if (!form.name.trim()) return setError('Subscriber name is required.')
    if (!form.startDate || !form.endDate) return setError('Both start and end dates are required.')
    if (new Date(form.endDate) < new Date(form.startDate))
      return setError('End date cannot be before the start date.')

    const key = `${bookNo}-${receiptNo}`
    const isEditingSameRecord = initial && initial.id
    if (existingKeys.has(key) && !(isEditingSameRecord && initial.bookNo === bookNo && initial.receiptNo === receiptNo)) {
      return setError(`Book ${bookNo}, Receipt ${receiptNo} is already recorded. Each receipt can only be used once.`)
    }

    setSaving(true)
    try {
      await onSave({
        ...form,
        bookNo,
        receiptNo,
        name: form.name.trim(),
        address: form.address.trim(),
        phone: form.phone.trim(),
      })
    } catch (err) {
      setError('Could not save this record. Please try again.')
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-ink-900/40 flex items-start md:items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-paper-card border border-line rounded-lg w-full max-w-lg my-8 shadow-xl">
        <div className="px-6 py-4 border-b border-line flex items-center justify-between">
          <h2 className="font-display text-xl text-ink-900">
            {initial?.id ? 'Edit receipt' : 'New receipt'}
          </h2>
          <button onClick={onClose} className="text-ink-700 hover:text-oxblood text-xl leading-none">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium uppercase tracking-wide text-ink-700 mb-1">
                Book No
              </label>
              <input
                type="number"
                min="1"
                required
                value={form.bookNo}
                onChange={(e) => update('bookNo', e.target.value)}
                className="w-full px-3 py-2 rounded border border-line bg-white font-mono focus:outline-none focus:ring-2 focus:ring-brass"
              />
            </div>
            <div>
              <label className="block text-xs font-medium uppercase tracking-wide text-ink-700 mb-1">
                Receipt No (1–50)
              </label>
              <input
                type="number"
                min="1"
                max="50"
                required
                value={form.receiptNo}
                onChange={(e) => update('receiptNo', e.target.value)}
                className="w-full px-3 py-2 rounded border border-line bg-white font-mono focus:outline-none focus:ring-2 focus:ring-brass"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium uppercase tracking-wide text-ink-700 mb-1">
              Subscriber name
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              className="w-full px-3 py-2 rounded border border-line bg-white focus:outline-none focus:ring-2 focus:ring-brass"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium uppercase tracking-wide text-ink-700 mb-1">
              Address
            </label>
            <textarea
              rows={2}
              value={form.address}
              onChange={(e) => update('address', e.target.value)}
              className="w-full px-3 py-2 rounded border border-line bg-white focus:outline-none focus:ring-2 focus:ring-brass resize-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium uppercase tracking-wide text-ink-700 mb-1">
              Phone number
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              className="w-full px-3 py-2 rounded border border-line bg-white focus:outline-none focus:ring-2 focus:ring-brass"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-2">
            <div>
              <label className="block text-xs font-medium uppercase tracking-wide text-ink-700 mb-1">
                Subscription start
              </label>
              <input
                type="date"
                required
                value={form.startDate}
                onChange={(e) => autoFillEndDate(e.target.value)}
                className="w-full px-3 py-2 rounded border border-line bg-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brass"
              />
            </div>
            <div>
              <label className="block text-xs font-medium uppercase tracking-wide text-ink-700 mb-1">
                Subscription end
              </label>
              <input
                type="date"
                required
                value={form.endDate}
                onChange={(e) => update('endDate', e.target.value)}
                className="w-full px-3 py-2 rounded border border-line bg-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brass"
              />
            </div>
          </div>
          <p className="text-xs text-ink-700/60 mb-4">
            End date auto-fills to one year from the start date — adjust it if this subscription runs differently.
          </p>

          {error && (
            <p className="text-oxblood text-sm mb-4 bg-oxblood/5 border border-oxblood/20 rounded px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded border border-line bg-white hover:bg-ink-900/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 text-sm rounded bg-ink-900 text-paper hover:bg-ink-700 transition-colors font-medium disabled:opacity-60"
            >
              {saving ? 'Saving…' : initial?.id ? 'Save changes' : 'Add receipt'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
