import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();



export async function GET(){
    try{
    const newUser = await prisma.user.findMany()
    return Response.json({
         message : 'get data',
         data: {
            newUser
         }
    })
    }catch(error){
        console.log(error)
        return Response.json({
            error
        }, {status:500})
    }
}

export async function POST(request : Request){
    try{
        const { name, email, password} = await request.json()
    const hashPassword = bcrypt.hashSync(password, 10)
    const newUser = await prisma.user.create({
        data:{ 
            name, 
            email, 
            password:hashPassword}
    })
    return Response.json({
         message : 'create user ok',
         data: {
            newUser
         }
    })
    }catch(error){
        console.log(error)
        return Response.json({
            error
        }, {status:500})
    }
}