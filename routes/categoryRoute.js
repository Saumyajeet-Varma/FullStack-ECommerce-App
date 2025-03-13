import express from 'express'
import { isAdmin, verifyJWT } from '../middlewares/authMiddleware.js'
import { createCategoryController, deleteCategoryController, getAllCategoryController, getOneCategoryController, updateCategoryController } from '../controllers/categoryController.js'

const router = express.Router()

router.post("/create-category", verifyJWT, isAdmin, createCategoryController)

router.put("/update-category/:categoryId", verifyJWT, isAdmin, updateCategoryController)

router.get("/categories", getAllCategoryController)

router.get("/category/:slug", getOneCategoryController)

router.delete("/delete-category/:categoryId", verifyJWT, isAdmin, deleteCategoryController)

export default router