// A subscription is ACTIVE while today falls on or before its end date.
// Anything past the end date (and not renewed into a new receipt) is INACTIVE.
export function getStatus(endDate) {
  if (!endDate) return 'unknown'
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const end = new Date(endDate)
  end.setHours(0, 0, 0, 0)
  return end >= today ? 'active' : 'inactive'
}

export function daysRemaining(endDate) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const end = new Date(endDate)
  end.setHours(0, 0, 0, 0)
  return Math.round((end - today) / (1000 * 60 * 60 * 24))
}

export function formatDate(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function yearOf(dateStr) {
  if (!dateStr) return null
  return new Date(dateStr).getFullYear()
}
