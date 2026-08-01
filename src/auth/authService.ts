import prisma from "../config/db.js"
import bcrypt from 'bcrypt'

export class AuthService{
    async registerUser(userData: {name: string, email: string, password: string}) {
        const existUser = await prisma.user.findUnique({
            where: {email: userData.email}
        })

        if(existUser){
            throw new Error("Email is already in use");
            
        }

        const hashPassword = await bcrypt.hash(userData.password, 10)

        const newUser = await prisma.user.create({
            data: {
                name: userData.name,
                email: userData.email,
                password: hashPassword,
            },
        });

        const {password, ...userWithoutPassword} = newUser
        return userWithoutPassword
    }
}