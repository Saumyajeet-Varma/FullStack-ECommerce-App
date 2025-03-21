import express from 'express'
import { registerController, loginController, updateProfileController, changePasswordController, getAllOrdersController, getOrderController, getAllAdminOrdersController, changeOrderStatusController } from '../controllers/authController.js'
import { isAdmin, verifyJWT } from '../middlewares/authMiddleware.js'

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

router.get("/orders", verifyJWT, getAllOrdersController)

router.get("/order/:orderId", verifyJWT, getOrderController)

router.get("/admin-orders", verifyJWT, isAdmin, getAllAdminOrdersController)

router.put("/change-order-status/:orderId", verifyJWT, isAdmin, changeOrderStatusController)

export default router