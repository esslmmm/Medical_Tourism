export async function POST(request: Request) {
    try {
        
    } catch (error) 
    {
        console.log('Stripe Booking Error:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}