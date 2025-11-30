import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
      const packages = await prisma.packages.findMany(
        {
          select:{
            package_id:true,
            image:true,
            package_name:true,
            package_type:true,
            detail:true,
            expired_date:true,
            hospitals:{
              select:{
                name:true,
                location:true,
              }
            }
          }
        }
      );
      return NextResponse.json(packages);
    } catch (error) {
      console.error("Error fetching Packages:", error);
      return NextResponse.json({ error: "Failed to fetch Packages" }, { status: 500 });
    }
  }
