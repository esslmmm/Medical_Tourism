import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();



export async function GET(){
    const hospitals = await prisma.hospitals.findMany()
    return Response.json(hospitals)
}

export async function POST(request: Request){
    const {name, hospital_code, location, city, description, contact_info,rating, image} = await request.json()
    const newHospital = await prisma.hospitals.create({
        data:{
            name,
            hospital_code,
            location,
            city,
            description,
            contact_info,
            rating,
            image
        },
    })
    return Response.json(newHospital)
}