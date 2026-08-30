import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

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
    <main
      className="relative min-h-screen overflow-hidden bg-[#071b14] text-slate-900"
      style={{
        backgroundImage: "url('/login-bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Elegant veil over the original magazine artwork */}
      <div className="absolute inset-0 bg-[#071b14]/55" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#061b13]/80 via-[#0b3527]/35 to-[#020b08]/75" />

      {/* Soft focus layer keeps the artwork visible without competing with the form */}
      <div
        className="absolute inset-0 scale-105 opacity-30 blur-[2px]"
        style={{
          backgroundImage: "url('/login-bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-[28px] border border-white/20 bg-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-md lg:grid-cols-[1.15fr_0.85fr]">

          {/* Brand panel */}
          <section className="relative hidden min-h-[650px] overflow-hidden border-r border-white/15 lg:flex lg:flex-col lg:justify-between">
            <div className="absolute inset-0 bg-gradient-to-br from-[#073c28]/85 via-[#0b2b20]/65 to-[#06140f]/80" />

            <div className="relative z-10 p-12 xl:p-16">
              <div className="mb-10 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#d7b76a] text-[#082419]">
                  ★
                </span>
                <span>Islam Diary • Monthly Magazine</span>
              </div>

              <h1
                className="max-w-xl text-5xl font-extrabold leading-tight tracking-tight text-white xl:text-6xl"
                style={{ fontFamily: "'Noto Sans Tamil', 'Latha', sans-serif" }}
              >
                இஸ்லாம் டைரி
              </h1>

              <p className="mt-3 text-2xl font-semibold tracking-[0.18em] text-[#e6cf8a]">
                ISLAM DIARY
              </p>

              <div className="mt-8 h-px w-28 bg-[#d7b76a]" />

              <p
                className="mt-7 max-w-xl text-lg leading-9 text-white/85"
                style={{ fontFamily: "'Noto Sans Tamil', 'Latha', sans-serif" }}
              >
                இஸ்லாம் என்பது உன் ஆத்மா அமைதி பெறவும்,
                பிறர் உன்மூலம் அமைதி பெறவும் உள்ளதாகும்.
              </p>

              <p className="mt-5 max-w-md text-sm leading-6 text-white/65">
                A calm, private workspace for managing your magazine
                subscriptions and editorial records.
              </p>
            </div>

            <div className="relative z-10 px-12 pb-10 xl:px-16">
              <p className="text-xs uppercase tracking-[0.25em] text-white/45">
                Editor
              </p>
              <p className="mt-2 text-lg font-semibold text-white">
                S. Kaja Mohideen, B.Sc.
              </p>
            </div>
          </section>

          {/* Login panel */}
          <section className="flex min-h-[650px] items-center justify-center bg-[#faf8f1]/95 px-6 py-10 sm:px-10">
            <div className="w-full max-w-md">
              {/* Mobile brand — same content as the desktop panel, stacked into its own card */}
              <div className="relative mb-8 overflow-hidden rounded-2xl p-7 text-center shadow-lg lg:hidden">
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(135deg, #073c28 0%, #0b2b20 55%, #06140f 100%)' }}
                />

                <div className="relative z-10">
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#d7b76a] text-[10px] text-[#082419]">
                      ★
                    </span>
                    <span>Islam Diary • Monthly Magazine</span>
                  </div>

                  <h1
                    className="text-3xl font-extrabold leading-tight text-white"
                    style={{ fontFamily: "'Noto Sans Tamil', 'Latha', sans-serif" }}
                  >
                    இஸ்லாம் டைரி
                  </h1>

                  <p className="mt-1 text-sm font-bold tracking-[0.18em] text-[#e6cf8a]">
                    ISLAM DIARY
                  </p>

                  <div className="mx-auto mt-5 h-px w-16 bg-[#d7b76a]" />

                  <p
                    className="mx-auto mt-5 max-w-xs text-sm leading-7 text-white/85"
                    style={{ fontFamily: "'Noto Sans Tamil', 'Latha', sans-serif" }}
                  >
                    இஸ்லாம் என்பது உன் ஆத்மா அமைதி பெறவும், பிறர் உன்மூலம் அமைதி பெறவும் உள்ளதாகும்.
                  </p>

                  <p className="mx-auto mt-4 max-w-xs text-xs leading-5 text-white/60">
                    A calm, private workspace for managing your magazine subscriptions and editorial records.
                  </p>

                  <div className="mx-auto mt-6 h-px w-16 bg-white/15" />

                  <p className="mt-5 text-[10px] uppercase tracking-[0.25em] text-white/40">
                    Editor
                  </p>
                  <p className="mt-1.5 text-sm font-semibold text-white">
                    S. Kaja Mohideen, B.Sc.
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-[#8c6f2d]">
                  Secure access
                </p>
                <h2 className="text-3xl font-bold tracking-tight text-[#10251d]">
                  Welcome back
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Sign in to continue to your Islam Diary workspace.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-[#24382f]"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="editor@yourmagazine.com"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#0b6b48] focus:ring-4 focus:ring-[#0b6b48]/10"
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-[#24382f]"
                    >
                      Password
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 pr-12 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#0b6b48] focus:ring-4 focus:ring-[#0b6b48]/10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-[#0b5b3d]"
                    >
                      {showPassword ? '◉' : '○'}
                    </button>
                  </div>
                </div>

                {error && (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700"
                  >
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={busy}
                  className="group relative flex h-12 w-full items-center justify-center overflow-hidden rounded-xl bg-[#0b5b3d] px-5 text-sm font-bold text-white shadow-lg shadow-[#0b5b3d]/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#084b32] hover:shadow-xl hover:shadow-[#0b5b3d]/25 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <span className="relative">
                    {busy ? 'Signing in…' : 'Sign in securely'}
                  </span>
                </button>
              </form>

              <div className="my-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Islam Diary
                </span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <p className="text-center text-xs leading-5 text-slate-400">
                Authorized users only. Your login details are kept private.
              </p>

              <p
                className="mt-6 text-center text-sm font-medium text-[#35584a]"
                style={{ fontFamily: "'Noto Sans Tamil', 'Latha', sans-serif" }}
              >
                இஸ்லாம் டைரி — மாத இதழ்
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
