
export async function createtrip(data: any) {
  try {
    const response = await fetch('/api/booking/trips', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      let err = 'Unknown error';
      try {
        const resJson = await response.json();
        err = resJson.error || err;
      } catch (_) {
        // If response is not JSON, keep default error
      }
      throw new Error(err);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to create trip:', error);
    throw error; // re-throw so it can be handled in calling code
  }
}


