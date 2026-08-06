import { Router } from "express";
import { ProductsController } from "./productsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = Router()
const productsController = new ProductsController

router.get('/', (req, res, next) => productsController.getAllProduct(req, res, next))
router.get('/:id', (req, res, next) => productsController.getProductById(req, res, next))
router.post('/', authMiddleware, adminMiddleware, (req, res, next) => productsController.createProduct(req, res, next))
router.put('/:id', authMiddleware, adminMiddleware, (req, res, next) => productsController.updateProduct(req, res, next))
router.delete('/:id', authMiddleware, adminMiddleware, (req, res, next) => productsController.deleteProduct(req, res, next))


export default router