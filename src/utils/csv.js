export function exportToCsv(rows, filename = 'subscribers.csv') {
  const headers = [
    'Book No',
    'Receipt No',
    'Name',
    'Address',
    'Phone',
    'Start Date',
    'End Date',
    'Status',
  ]

  const lines = [headers.join(',')]

  rows.forEach((r) => {
    const line = [
      r.bookNo,
      r.receiptNo,
      csvEscape(r.name),
      csvEscape(r.address),
      csvEscape(r.phone),
      r.startDate,
      r.endDate,
      r.status,
    ].join(',')
    lines.push(line)
  })

  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

function csvEscape(value) {
  const str = String(value ?? '')
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}
