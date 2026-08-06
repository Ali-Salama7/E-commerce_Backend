import { Router } from "express";
import { OrdersController } from "./ordersController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router()
const ordersController = new OrdersController()

router.post('/', authMiddleware, (req, res, next) => ordersController.createOrder(req, res, next))
router.get('/my-orders', authMiddleware, (req, res, next) => ordersController.getMyOrders(req, res, next))

export default router