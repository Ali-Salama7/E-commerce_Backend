import type { Request, Response } from "express";
import { ProductsService } from "./productsService.js";
import { createProductSchema, updateProductSchema } from "./productValidator.js";

const productsService = new ProductsService();

export class ProductsController {
  async getAllProduct(req: Request, res: Response) {
    try {
      const products = await productsService.getAllProducts();
      return res.status(200).json({
        status: "success",
        data: products,
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getProductById(req: Request, res: Response) {
    try {
      const product = await productsService.getProductById(
        Number(req.params.id),
      );
      return res.status(200).json({
        status: "success",
        data: product,
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async createProduct(req: Request, res: Response) {
    try {
      const validatedData = createProductSchema.parse(req.body);
      const create = await productsService.createProduct(validatedData);
      return res.status(201).json({
        status: "success",
        data: create,
      });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async updateProduct(req: Request, res: Response) {
    try {
      const validatedData = updateProductSchema.parse(req.body);
      const update = await productsService.updateProduct(
        Number(req.params.id),
        validatedData,
      );
      return res.status(200).json({
        status: "update",
        data: update,
      });
    } catch (error: any) {
      if (error.message === "Product not found") {
        return res.status(404).json({ error: error.message });
      }
      return res.status(400).json({ error: error.message });
    }
  }

  async deleteProduct(req: Request, res: Response) {
    try {
      const delProduct = await productsService.deleteProduct(
        Number(req.params.id),
      );
      return res.status(200).json({
        status: "deleted done",
        data: delProduct,
      });
    } catch (error: any) {
      if (error.message === "Product not found") {
        return res.status(404).json({ error: error.message });
      }
      return res.status(400).json({ error: error.message });
    }
  }
}
