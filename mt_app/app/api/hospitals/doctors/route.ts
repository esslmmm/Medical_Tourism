import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();



export async function GET(){
    const doctors = await prisma.doctors.findMany({
    }
    )
    return Response.json(doctors)
}

export async function POST(request: Request){
    const {name,specialization,hospital_id,experience,description,image} = await request.json()
    const newDoctor = await prisma.doctors.create({
        data:{
            name,specialization,hospital_id,experience,description,image
        }
    })
    return Response.json(newDoctor)
}