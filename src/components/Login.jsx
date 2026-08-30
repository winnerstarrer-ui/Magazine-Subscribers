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
        <div className="text-center mb-8">
          <div className="stamp inline-flex items-center justify-center w-14 h-14 text-ink-900 mb-4">
            <span className="font-display text-xl">R</span>
          </div>
          <h1 className="font-display text-3xl text-ink-900">The Register</h1>
          <p className="text-ink-700 text-sm mt-1">Subscriber ledger — sign in to continue</p>
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
      </div>
    </div>
  )
}
