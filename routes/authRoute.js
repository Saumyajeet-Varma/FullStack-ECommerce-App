import express from 'express'
import { registerController, loginController, testController } from '../controllers/authController.js'
import { isAdmin, verifyJWT } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/register', registerController)

router.post("/login", loginController)

router.get("/test", verifyJWT, isAdmin, testController)

export default router