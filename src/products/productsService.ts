import prisma from "../config/db.js";
import { NotFoundError } from "../shared/errors.js";
import { createProductSchema, updateProductSchema } from "./productValidator.js";
import { z } from "zod";

type CreateProductInput = z.infer<typeof createProductSchema>
type UpdateProductInput = z.infer<typeof updateProductSchema>

export class ProductsService{
    async getAllProducts() {
        const products = await prisma.product.findMany()
        return products
    }

    async getProductById(id: number){
        const product = await prisma.product.findUnique({
            where: {id: id}
        })

        if(!product){
            throw new NotFoundError("Product not found");
        }

        return product
    }

    async createProduct(data: CreateProductInput){
        const newProduct = await prisma.product.create({
            data: {
                name: data.name,
                description: data.description ?? null,
                price: data.price,
                quantity: data.quantity
            }
        })

        return newProduct
    }
    async updateProduct(id: number, data: UpdateProductInput){
        const existingProduct = await prisma.product.findUnique({
            where: {id: id}
        })

        if(!existingProduct){
            throw new NotFoundError("Product not found");
        }

        const cleanData = Object.fromEntries(
            Object.entries(data).filter(([_, value]) => value !== undefined)
        )

        const updateProduct = await prisma.product.update({
        where: { id: id },
        data: cleanData,
        });

        return updateProduct
    }

    async deleteProduct(id: number){
        const existingProduct = await prisma.product.findUnique({
            where: {id: id}
        })

        if(!existingProduct){
            throw new NotFoundError("Product not found");
        }

        const delProduct = await prisma.product.delete({
            where: {id: id}
        })

        return delProduct
    }

}
