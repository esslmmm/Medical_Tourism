import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
      const packages = await prisma.packages.findMany();
      return NextResponse.json(packages);
    } catch (error) {
      console.error("Error fetching Packages:", error);
      return NextResponse.json({ error: "Failed to fetch Packages" }, { status: 500 });
    }
  }





// {
//     "package_name": "Luxury Medical Package",
//     "package_type": "Medical_Tourism",
//     "hospital_id": 1,
//     "image": "/img/Packages/medical4.png",
//     "detail": "A premium medical package with top-tier services.",
//     "duration": 7,
//     "expired_date": "2025-12-31",
//     "guide_ids": [1],
//     "doctor_ids": [3],
//     "hotel_ids": [1],
//     "descriptions": [
//       "Includes 24/7 medical consultation.",
//       "Luxury accommodation in a 5-star hotel.",
//       "Personal guide and medical concierge."
//     ],
//     "images": [
//       "https://example.com/image1.jpg",
//       "https://example.com/image2.jpg"
//     ],
//     "trips": [
//       {"description": "hi"}
//     ],
//     "package_places": [
//       {
//     "place_id": 1,
//     "date": "2025-04-02",
//     "start": "2025-04-02T14:30:00Z",
//     "end": "2025-04-02T16:45:00Z"
//   }
//   ,
//       {
//     "place_id": 1,
//     "date": "2025-04-02",
//     "start": "2025-04-02T14:30:00Z",
//     "end": "2025-04-02T16:45:00Z"
//   }
  
//     ]
//   }
  