
export async function submitInterBooking(data: {
    interpreter_id: number;
    start: null;
    end: null;
    status: string;
}) {
  try {
    const res = await fetch('/api/booking/interpreters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Booking failed');
    }

    return await res.json();
  } catch (error) {
    console.error('Booking error:', error);
    throw error;
  }
}
