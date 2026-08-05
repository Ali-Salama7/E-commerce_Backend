import type { Request, Response } from "express";
import { createOrderSchema } from "./ordersValidator.js";
import { OrdersService } from "./ordersService.js";
import type { JwtPayload } from "jsonwebtoken";

const ordersService = new OrdersService()

export class OrdersController{
    async createOrder(req: Request, res: Response){
        try {
            const validatedData = createOrderSchema.parse(req.body)

            const user = req.user
            if(!user || typeof user === 'string'){
                return res.status(401).json({error: "Unauthorized"})
            }

            const userId = (user as JwtPayload).userID

            const order = await ordersService.createOrder(userId, validatedData.items)
            return res.status(201).json({
                status: "Created",
                data: order
            })
        } catch (error: any) {
            return res.status(400).json({error: error.message})
        }
    }

    async getMyOrders(req: Request, res: Response){
        try {
             const user = req.user;
             if (!user || typeof user === "string") {
               return res.status(401).json({ error: "Unauthorized" });
             }

             const userId = (user as JwtPayload).userID;

             const myOrders = await ordersService.getMyOrders(userId);
             return res.status(200).json({
               data: myOrders
             });
        } catch (error: any) {
            return res.status(400).json({error: error.message})
        }
    }
}