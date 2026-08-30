import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext' // adjust path as needed

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
    } catch (err) {
      setError('Failed to sign in: ' + err.message)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ink-900 to-ink-700 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        {/* ─── LOGO AREA ─── */}
        <div className="text-center">
          {/* Decorative Border */}
          <div className="inline-block border-2 border-brass/30 rounded-full p-4 mb-3">
            <div className="w-20 h-20 rounded-full bg-brass/10 flex items-center justify-center">
              <span className="text-3xl font-serif font-bold text-brass">📰</span>
            </div>
          </div>
          
          {/* Tamil Title */}
          <h1 className="font-serif text-4xl font-bold text-ink-900 tracking-wide">
            செலவாடம்
          </h1>
          
          {/* Subtitle */}
          <p className="font-serif text-xl text-brass font-semibold -mt-1">
            அட்சிஸ்
          </p>
          
          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 my-2">
            <span className="text-xs text-brass/40">✦</span>
            <div className="h-px flex-1 max-w-16 bg-gradient-to-r from-transparent via-brass/40 to-transparent"></div>
            <span className="text-xs font-medium text-ink-700/60 tracking-widest uppercase">
              மாத சேதி
            </span>
            <div className="h-px flex-1 max-w-16 bg-gradient-to-r from-transparent via-brass/40 to-transparent"></div>
            <span className="text-xs text-brass/40">✦</span>
          </div>
          
          {/* Motto */}
          <div className="mt-3 text-sm text-ink-700/70 leading-relaxed bg-ink-50/50 rounded-lg p-4 border border-ink-100/30">
            <p className="font-serif italic">
              "செலவாடம் என்பது உன் ஆத்மா மைத்தி பெறவும்,<br />
              பிறர் உன்மூலம் மைத்தி பெறவும் உள்ளதாகும்."
            </p>
          </div>
          
          <p className="text-xs text-ink-500/60 mt-2">
            Editor: <span className="font-medium">S. Kaja Mohideen, B.Sc.</span>
          </p>
        </div>

        {/* ─── LOGIN FORM ─── */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {error && (
            <div className="bg-oxblood/10 border border-oxblood/30 text-oxblood text-sm rounded-lg px-4 py-2">
              {error}
            </div>
          )}
          
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-line bg-ink-50/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brass/40 transition-colors"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-line bg-ink-50/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brass/40 transition-colors"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ink-900 text-white py-3 rounded-lg font-medium hover:bg-ink-700 transition-colors shadow-lg disabled:opacity-50"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
        
        <p className="text-center text-xs text-ink-500/50 mt-4">
          © {new Date().getFullYear()} செலவாடம் Magazine
        </p>
      </div>
    </div>
  )
}