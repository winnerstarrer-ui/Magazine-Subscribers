import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      await login(email, password)
    } catch (err) {
      setError('Could not sign in. Check the email and password and try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="stamp inline-flex items-center justify-center w-14 h-14 text-emerald-800 mb-4 bg-emerald-50 border border-emerald-800/20 rounded-full">
            <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
              <path d="M12 2a1 1 0 0 1 1 1v1.055A9.001 9.001 0 0 1 21 13v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-7a9.001 9.001 0 0 1 8-8.945V3a1 1 0 0 1 1-1zm0 4a7 7 0 0 0-7 7v6h14v-6a7 7 0 0 0-7-7z" />
            </svg>
          </div>
          <h1 className="font-display text-3xl text-ink-900 font-bold">இஸ்லாம் டைரி</h1>
          <h2 className="text-lg font-medium text-ink-800 mt-0.5">Islam Diary</h2>
          <p className="text-ink-700 text-xs mt-2 italic">
            "இஸ்லாம் என்பது உன் ஆத்மா அமைதி பெறவும், பிறர் உன்மூலம் அமைதி பெறவும் உள்ளதாகும்."
          </p>
          <p className="text-ink-700 text-xs font-medium mt-2">Subscriber ledger — sign in to continue</p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-paper-card border border-line rounded-lg p-6 shadow-sm"
        >
          <label className="block text-xs font-medium uppercase tracking-wide text-ink-700 mb-1">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-3 py-2 rounded border border-line bg-white focus:outline-none focus:ring-2 focus:ring-brass"
            placeholder="editor@yourmagazine.com"
          />

          <label className="block text-xs font-medium uppercase tracking-wide text-ink-700 mb-1">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 px-3 py-2 rounded border border-line bg-white focus:outline-none focus:ring-2 focus:ring-brass"
            placeholder="••••••••"
          />

          {error && (
            <p className="text-oxblood text-sm mb-4 bg-oxblood/5 border border-oxblood/20 rounded px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="w-full bg-ink-900 text-paper font-medium py-2.5 rounded hover:bg-ink-700 transition-colors disabled:opacity-60"
          >
            {busy ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="text-center text-xs text-ink-700/70 mt-6">
          Editor: S. Kaja Mohideen, B.Sc.
        </p>
      </div>
    </div>
  )
}