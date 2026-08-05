import prisma from "../config/db.js";

export class OrdersService{
     async createOrder(userId: number, items: {productId: number, quantity: number}[]){
        return await prisma.$transaction(async (tx) => {
            let totalPrice = 0
            const orderItemsData: {productId: number, quantity: number, price: number}[] = []

            for(const item of items){
                const product = await tx.product.findUnique({
                    where: {id: item.productId}
                })

                if(!product){
                    throw new Error(`Product with id ${item.productId} not found`);
                }

                if(item.quantity > product.quantity){
                    throw new Error(`Insufficient stock for product ${product.name}. Available: ${product.quantity}`);
                }

                totalPrice += Number(product.price) * item.quantity

                orderItemsData.push({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: Number(product.price)
                })
            }

            const order = await tx.order.create({
                data: {
                    userId: userId,
                    status: "PENDING",
                    totalPrice: totalPrice,
                    items: {
                        create: orderItemsData
                    }
                }
            })

            for(const item of items){
                await tx.product.update({
                    where: {id: item.productId},
                    data: {
                        quantity: {
                            decrement: item.quantity
                        }
                    }
                })
            }
            return order
        })
    }
}
