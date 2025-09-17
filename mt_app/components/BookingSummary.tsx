'use client'

interface BookingData {
  type: 'hospital' | 'trip' | null
  date?: string
  time?: string
  startDate?: string
  endDate?: string
  adults: number
  children: number
  guideLang?: string
  priceAdult?: number
  priceChild?: number
  guide?: number
  car?: number
}

interface BookingSummaryProps {
  bookingData: BookingData
  onConfirmBooking: () => void
  editSelectionHref?: string
}

export default function BookingSummary({ 
  bookingData, 
  onConfirmBooking,
  editSelectionHref = '/'
}: BookingSummaryProps) {
  if (!bookingData?.type) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-semibold mb-4">No Booking Information</h1>
        <p className="text-gray-600 mb-8">Please select a booking type to view details.</p>
        <div className="space-y-4">
          <a
            href="/user/booking_detail_new?type=hospital&date=2025-10-05&time=07:00&adults=1&children=0"
            className="block bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors"
          >
            View Sample Hospital Booking
          </a>
          <a
            href="/user/booking_detail_new?type=trip&start=2025-10-08&end=2025-10-10&adults=1&children=1&guideLang=English&priceAdult=1000&priceChild=500&guide=1000&car=1000"
            className="block border border-emerald-500 text-emerald-500 px-6 py-3 rounded-lg hover:bg-emerald-50 transition-colors"
          >
            View Sample Trip Booking
          </a>
        </div>
      </div>
    )
  }

  const calculateTotal = () => {
    if (bookingData.type !== 'trip') return 0
    const adultTotal = (bookingData.priceAdult || 0) * bookingData.adults
    const childTotal = (bookingData.priceChild || 0) * bookingData.children
    const guideTotal = bookingData.guide || 0
    const carTotal = bookingData.car || 0
    return adultTotal + childTotal + guideTotal + carTotal
  }

  const isEndDateBeforeStart = bookingData.endDate && bookingData.startDate && 
    new Date(bookingData.endDate) < new Date(bookingData.startDate)

  const hasValidPricing = bookingData.type === 'trip' && 
    ((bookingData.priceAdult || 0) > 0 || (bookingData.priceChild || 0) > 0 || 
     (bookingData.guide || 0) > 0 || (bookingData.car || 0) > 0)

  return (
    <>
      <nav className="text-sm text-gray-600 mb-4">
        User / Booking / Details
      </nav>

      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">Booking Details</h1>
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <span>Created: {new Date().toLocaleString()}</span>
          <span className={`rounded-full px-3 py-1 text-sm ${
            bookingData.type === 'hospital' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
          }`}>
            {bookingData.type === 'hospital' ? 'Hospital' : 'Trip'}
          </span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white/95 rounded-2xl shadow border p-5 lg:p-6">
          <h2 className="text-lg font-medium mb-4">Selection Summary</h2>
          
          <div className="space-y-3">
            {bookingData.type === 'hospital' && (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{bookingData.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium">{bookingData.time}</span>
                </div>
              </>
            )}

            {bookingData.type === 'trip' && (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-600">Start Date:</span>
                  <span className="font-medium">{bookingData.startDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">End Date:</span>
                  <span className="font-medium flex items-center gap-2">
                    {bookingData.endDate}
                    {isEndDateBeforeStart && (
                      <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded">
                        Invalid dates
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Guide Language:</span>
                  <span className="font-medium">{bookingData.guideLang}</span>
                </div>
              </>
            )}

            <div className="flex justify-between">
              <span className="text-gray-600">Adults:</span>
              <span className="font-medium">{bookingData.adults}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Children:</span>
              <span className="font-medium">{bookingData.children}</span>
            </div>
          </div>
        </div>

        {bookingData.type === 'trip' && (
          <div className="bg-white/95 rounded-2xl shadow border p-5 lg:p-6">
            {hasValidPricing ? (
              <>
                <h2 className="text-lg font-medium mb-4">Price Breakdown</h2>
                
                <div className="space-y-3">
                  {(bookingData.priceAdult || 0) > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Adult (ages 16–80):</span>
                      <span>THB {bookingData.priceAdult} × {bookingData.adults}</span>
                    </div>
                  )}
                  {(bookingData.priceChild || 0) > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Child (ages 4–15):</span>
                      <span>THB {bookingData.priceChild} × {bookingData.children}</span>
                    </div>
                  )}
                  {(bookingData.guide || 0) > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Guide:</span>
                      <span>THB {bookingData.guide}</span>
                    </div>
                  )}
                  {(bookingData.car || 0) > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Car Service:</span>
                      <span>THB {bookingData.car}</span>
                    </div>
                  )}
                  
                  <hr className="my-4" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">GRAND TOTAL:</span>
                    <span className="text-2xl font-bold text-red-500">
                      THB {calculateTotal().toLocaleString()}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <h2 className="text-lg font-medium mb-2">Price Breakdown</h2>
                <p className="text-gray-600">Pricing not provided</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-8 sticky bottom-4 lg:static lg:bottom-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={() => window.history.back()}
            className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Go Back
          </button>
          <a
            href={editSelectionHref}
            className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium text-center"
          >
            Edit Selection
          </a>
          <button
            onClick={onConfirmBooking}
            className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors font-medium"
          >
            Confirm Booking
          </button>
          <button
            onClick={() => window.print()}
            className="border border-emerald-500 text-emerald-500 px-6 py-3 rounded-lg hover:bg-emerald-50 transition-colors font-medium"
          >
            Print / Save PDF
          </button>
        </div>
      </div>
    </>
  )
}