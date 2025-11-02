
export async function createPackageBooking(data: any) {
  try {
    const response = await fetch('/api/booking/packages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const err = await response.json()
      throw new Error(err.error || 'Unknown error')
    }

    return await response.json()
  } catch (error) {
    console.error('Failed to create appointment:', error)
    throw error
  }
}

