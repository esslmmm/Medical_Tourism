
export async function createAppointmentFile(patient_id: string, fileId: string) {
  try {
    const response = await fetch('/api/files', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ patient_id, fileId }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create appointment file: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in createAppointmentFile:', error);
    throw error;
  }
}
