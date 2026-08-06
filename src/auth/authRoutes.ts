import { Router } from "express";
import { AuthController } from "./authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router()
const authController = new AuthController()

router.post('/register', (req, res, next) => authController.register(req, res, next))
router.post('/login', (req, res, next) => authController.login(req, res, next))

router.get('/me', authMiddleware, (req, res) => {
    res.json({ message: "You are authenticated", user: req.user })
})

export default router