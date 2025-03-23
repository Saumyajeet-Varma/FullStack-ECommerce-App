import express from 'express'
import { isAdmin, verifyJWT } from '../middlewares/authMiddleware.js'
import { registerController, loginController, updateProfileController, changePasswordController } from '../controllers/authController.js'

const router = express.Router()

router.post('/register', registerController)

router.post("/login", loginController)

router.put("/update-profile", verifyJWT, updateProfileController)

router.put("/change-password", verifyJWT, changePasswordController)

router.get("/userAuth", verifyJWT, (req, res) => {
    res.status(200).send({ ok: true })
})

router.get("/adminAuth", verifyJWT, isAdmin, (req, res) => {
    res.status(200).send({ ok: true })
})

export default router