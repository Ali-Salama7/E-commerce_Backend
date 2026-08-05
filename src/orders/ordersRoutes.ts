import { Router } from "express";
import { OrdersController } from "./ordersController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router()
const ordersController = new OrdersController()

router.post('/', authMiddleware, (req, res) => ordersController.createOrder(req, res))

export default router