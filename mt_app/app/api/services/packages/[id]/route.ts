
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';


export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: package_id } = await params; // Convert ID to integer
  
  
      // Fetch package along with associated data
      const packageData = await prisma.packages.findUnique({
        where: { package_id },
        select: {
          package_name: true,
          package_type: true,
          detail: true,
          hospitals: true,
          trips: {
            include:{
              languages: true,
              images: true,
              Trip_Routes: {
                select:{
                  routes:{
                    select:{
                      route_id: true,
                      description: true,
                      duration: true,
                      title: true,
                      image: true,
                      adult_price: true,
                      child_price: true,
                      guide_price: true,
                      car_service_price: true,
                      tags: {
                        select:{
                          tag_id: true,
                          tag: true,
                        }
                      },
                      attractions:{
                        select:{
                          places: {
                            select:{
                              name: true,
                              image: true,
                              description: true,
                                location: true,
                                place_image: true,
                                includes: true,
                                highlights: true,
                                important_info:{
                                  include:{
                                    not_allowed: true,
                                    recommend_to_bring: true,
                                    know_before_you_go: true
                                  }
                                }
                            },
                          }
                        }
                      }
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
