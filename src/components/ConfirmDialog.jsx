import React from 'react'

export default function ConfirmDialog({ title, message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-ink-900/40 flex items-center justify-center p-4 z-50">
      <div className="bg-paper-card border border-line rounded-lg w-full max-w-sm shadow-xl px-6 py-5">
        <h3 className="font-display text-lg text-ink-900 mb-2">{title}</h3>
        <p className="text-sm text-ink-700 mb-5">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded border border-line bg-white hover:bg-ink-900/5 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm rounded bg-oxblood text-paper hover:bg-oxblood-light transition-colors font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
