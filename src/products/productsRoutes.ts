import { Router } from "express";
import { ProductsController } from "./productsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = Router()
const productsController = new ProductsController

router.get('/', (req, res) => productsController.getAllProduct(req, res))
router.get('/:id', (req, res) => productsController.getProductById(req, res))
router.post('/', authMiddleware, adminMiddleware, (req, res) => productsController.createProduct(req, res))
router.put('/:id', authMiddleware, adminMiddleware, (req, res) => productsController.updateProduct(req, res))
router.delete('/:id', authMiddleware, adminMiddleware, (req, res) => productsController.deleteProduct(req, res))


export default router