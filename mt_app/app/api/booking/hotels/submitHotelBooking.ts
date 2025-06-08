
export async function submitHotelBooking(data: {
  hotel_id: number;
  check_in_date: Date;
  check_out_date: Date;
  guest_children: number;
  guest_adult: number;
  total_price: number;
  status: string;
  room_aggregate: { room_id: number; amount: number }[];
}) {
  try {
    const res = await fetch('/api/booking/hotels', {
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
