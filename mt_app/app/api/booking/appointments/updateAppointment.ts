

export async function updateAppointment(bookingId: string, data: any) {
  const response = await fetch(`/api/booking/appointments/${bookingId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update package booking');
  }

  return await response.json();
}
