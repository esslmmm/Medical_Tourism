// utils/api.ts
export async function createContactDetails(data: any) {
  try {
    const response = await fetch('/api/booking/user_contact_details', {
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
    console.error('Failed to create ContactDetails:', error)
    throw error
  }
}
