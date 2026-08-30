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
    <div className="min-h-screen flex items-center justify-center px-4 bg-paper">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="text-ink-700/60 text-sm mb-3" style={{ fontFamily: '"Traditional Arabic", "Scheherazade New", serif' }}>
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>

          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 shadow-sm"
            style={{ background: 'linear-gradient(135deg, #0f5d38, #123f6b)' }}
          >
            <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="#f4ead2" strokeWidth="1.5">
              <path d="M12 3c-1.8 2-2.8 4.4-2.8 6.9 0 3.7 2 6.6 4.8 8.1-.9.5-2 .8-3.1.8C6.4 18.8 3.5 15.5 3.5 11.5 3.5 7.5 6.6 4.1 10.8 3.2c.4-.1.9-.2 1.2-.2z" />
              <path d="M16.5 8.5l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6z" />
            </svg>
          </div>

          <h1 className="font-display text-3xl leading-tight" style={{ color: '#123f6b' }}>
            இஸ்லாம் டைரி
          </h1>
          <p className="text-xs tracking-[0.25em] font-semibold mt-1" style={{ color: '#0f5d38' }}>
            ISLAM DIARY
          </p>
          <p className="text-ink-700 text-sm mt-0.5">மாத இதழ் · Monthly Magazine</p>

          <div className="w-12 h-px mx-auto my-4" style={{ background: '#c9a15a' }} />

          <p className="text-ink-700/80 text-xs leading-relaxed italic max-w-xs mx-auto">
            இஸ்லாம் என்பது உன் ஆத்மா அமைதி பெறவும், பிறர் உன்முலம் அமைதி பெறவும் உள்ளதாகும்.
          </p>
        </div>

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
          Accounts are created by an administrator in the Firebase console.
        </p>
        <p className="text-center text-[11px] text-ink-700/50 mt-1">
          Editor: S. Kaja Mohideen, B.Sc.
        </p>
      </div>
    </div>
  )
}
