import z from "zod";

const orderItemSchema = z.object({
    productId: z.number().int().positive(),
    quantity: z.number().int().positive()
})

export const createOrderSchema = z.object({
    items: z.array(orderItemSchema).min(1)
})