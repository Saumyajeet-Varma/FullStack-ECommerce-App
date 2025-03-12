import express from 'express'
import formidable from 'express-formidable'
import { isAdmin, verifyJWT } from '../middlewares/authMiddleware.js'
import { createProductController, deleteProductController, getAllProductsController, getOneProductController, getProductImageController, updateProductController } from '../controllers/productController.js'

const router = express.Router()

router.post("/create-product", verifyJWT, isAdmin, formidable(), createProductController)

router.post("/update-product/:productId", verifyJWT, isAdmin, formidable(), updateProductController)

router.get("/get-products", getAllProductsController)

router.get("/get-product/:slug", getOneProductController)

router.get("/get-product-image/:productId", getProductImageController)

router.delete("/delete-product/:productId", verifyJWT, isAdmin, deleteProductController)

export default router