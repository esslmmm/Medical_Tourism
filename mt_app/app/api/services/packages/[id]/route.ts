
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';


export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const resolvedParams = await params;
        const package_id = resolvedParams.id; // Convert ID to integer
  
  
      // Fetch package along with associated data
      const packageData = await prisma.packages.findUnique({
        where: { package_id },
        include: {
          package_guides: true,
          package_doc: true,
          package_hotels: true,
          routes:{
            include: {
                trips: {
                    include: {
                      package_places: {
                        include: {
                            places: true
                        }
                      }
                    }
                  },
            }
          },
          package_image: true,
          description:true,
        },
      });
  
      if (!packageData) {
        return NextResponse.json({ error: "Package not found" }, { status: 404 });
      }
  
      return NextResponse.json(packageData, { status: 200 });
    } catch (error) {
      console.error("Error fetching package:", error);
      return NextResponse.json({ error: "Failed to fetch package" }, { status: 500 });
    }
  }


  
  
  
  /**
 * PUT: TEST CASE
 */
//   {
//   "package_name": "Premium Health Package",
//   "expired_date": "2025-12-31",

//   "images": [
//    { "images": "https://example.com/image2.jpg" }
//   ],
//   "descriptions": [
//     { "id": 27, "text": "Includes full body check-up and diagnostic tests." }],
//        "trips": [
//     { "description": "Guided tour of the hospital facilities." }
//   ],

//   "package_places": [
//     {
//       "place_id": 1,
//       "date": "2025-05-16",
//       "start": "14:00",
//       "end": "16:00"
//     }
//   ]
// }
