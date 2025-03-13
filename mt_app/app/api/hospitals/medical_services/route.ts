import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();



export async function GET(){
    const medical_services = await prisma.medical_services.findMany()
    return Response.json(medical_services)
}

export async function POST(request: Request){
    const {hospital_id, service_name, description} = await request.json()
    const newMedicalServices = await prisma.medical_services.create({
        data:{
            hospital_id,
            service_name,
            description
        }
    })
    return Response.json(newMedicalServices)
}