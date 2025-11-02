
export async function createPatient(data: {
  appointment_id: string;
  gender: string;
  firstname: string;
  lastname: string;
  nationality: string;
  dateofbirth: Date | string;
  passport_number: string;
}[]) {
  try {
    const response = await fetch('/api/booking/patients', {
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
    console.error('Failed to create patients:', error)
    throw error
  }
}

