import React from 'react'

export default function ConfirmDialog({ title, message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-[#071b14]/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-[#faf8f1] border border-slate-200 rounded-2xl w-full max-w-sm shadow-2xl px-6 py-5">
        <h3 className="text-lg font-bold text-[#10251d] mb-2">{title}</h3>
        <p className="text-sm text-slate-500 mb-5">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors font-bold shadow-md shadow-red-600/20"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
