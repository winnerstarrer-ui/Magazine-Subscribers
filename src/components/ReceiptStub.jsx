import React from 'react'

// The signature visual element of the app: renders a Book No / Receipt No
// pair as a two-part ticket stub with a perforated centre line, mirroring
// the physical 50-receipt subscription books the data is modelled on.
export default function ReceiptStub({ bookNo, receiptNo }) {
  return (
    <span className="stub" title={`Book ${bookNo}, Receipt ${receiptNo}`}>
      <span className="stub__half stub__half--book">BK {bookNo}</span>
      <span className="stub__perf" aria-hidden="true" />
      <span className="stub__half stub__half--receipt">No {String(receiptNo).padStart(2, '0')}</span>
    </span>
  )
}
