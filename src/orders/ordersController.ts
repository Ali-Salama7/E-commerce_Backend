import type { Request, Response, NextFunction } from "express";
import { createOrderSchema } from "./ordersValidator.js";
import { OrdersService } from "./ordersService.js";
import type { JwtPayload } from "jsonwebtoken";
import { getUserId } from "../shared/getUserId.js";

const ordersService = new OrdersService()

export class OrdersController{
    async createOrder(req: Request, res: Response, next: NextFunction){
        try {
            const validatedData = createOrderSchema.parse(req.body)
            const userId = getUserId(req)
            const order = await ordersService.createOrder(userId, validatedData.items)
            return res.status(201).json({
                status: "Created",
                data: order
            })
        } catch (error: any) {
            next(error)
        }
    }

    async getMyOrders(req: Request, res: Response, next: NextFunction){
        try {
            const userId = getUserId(req)
             const myOrders = await ordersService.getMyOrders(userId);
             return res.status(200).json({
               data: myOrders
             });
        } catch (error: any) {
            next(error)
        }
    }
}