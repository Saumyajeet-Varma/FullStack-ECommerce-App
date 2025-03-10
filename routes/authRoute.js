import express from 'express'
import { registerController, loginController } from '../controllers/authController.js'
import { isAdmin, verifyJWT } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/register', registerController)

router.post("/login", loginController)

// Protected Routes
router.get("/userAuth", verifyJWT, (req, res) => {
    res.status(200).send({ ok: true })
})

router.get("/adminAuth", verifyJWT, isAdmin, (req, res) => {
    res.status(200).send({ ok: true })
})

export default router