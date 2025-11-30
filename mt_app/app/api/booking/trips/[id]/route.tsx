import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server'



// GET request - Fetch a single tourism booking by ID
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
    
      const { id } = await params;
      const tourismBooking = await prisma.tourism_bookings.findUnique({
        where: { tourism_id: id },
        select: {
          child: true,
          adult: true,
          start: true,
          end: true,
          routes: {
            select: {
              attractions: {
                select: {
                  attraction_id: true,
                  places: {
                    select: {
                      place_id: true,
                      name: true,
                      image: true,
                      description: true,
                    },
                  },
                },
              },
            },
          },
          guide_bookings: {
            select: {
              language: true,
            }
          },
        }
        },
      );
  
      if (!tourismBooking) {
        return NextResponse.json({ error: 'Tourism booking not found' }, { status: 404 })
      }
  
      return NextResponse.json(tourismBooking, { status: 200 })
    } catch (error) {
      console.error('Error fetching tourism booking:', error)
      return NextResponse.json({ error: 'Failed to fetch tourism booking' }, { status: 500 })
    }
  }