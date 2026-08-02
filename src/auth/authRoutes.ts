import { Router } from "express";
import { AuthController } from "./authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router()
const authController = new AuthController()

router.post('/register', (req, res) => authController.register(req, res))
router.post('/login', (req, res) => authController.login(req, res))

router.get('/me', authMiddleware, (req, res) => {
    res.json({ message: "You are authenticated", user: req.user })
})

export default router