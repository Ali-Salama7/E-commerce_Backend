import type { Request, Response } from "express";
import { validateRegister } from "./authValidator.js";
import { AuthService } from "./authService.js";

const authService = new AuthService()

export class AuthController{
    async register(req: Request, res: Response){
        try {
            validateRegister(req.body)

            const newUser = await authService.registerUser(req.body)
            return res.status(201).json({
                message: "User registered successfully",
                data: newUser
            })
        } catch (error: any) {            
            return res.status(400).json({error: error.message})
        }
    }
}