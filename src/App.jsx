import React from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

function Gate() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-ink-700">
        Loading…
      </div>
    )
  }

  return user ? <Dashboard /> : <Login />
}

export default function App() {
  return (
    <AuthProvider>
      <Gate />
    </AuthProvider>
  )
}
