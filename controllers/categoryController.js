import slugify from "slugify";
import mongoose from "mongoose";

import categoryModel from "../models/categoryModel.js";

export const createCategoryController = async (req, res) => {

    try {
        const { name } = req.body

        if (!name) {
            return res.send({ message: "Name is required" })
        }

        const existingCategory = await categoryModel.findOne({ name })

        if (existingCategory) {
            return res.status(401).send({
                success: false,
                message: "Category already exist"
            })
        }

        const category = await categoryModel.create({ name, slug: slugify(name) })

        return res.status(201).send({
            success: true,
            message: "New category created",
            category
        })
    }
    catch (error) {
        console.log(chalk.red(error));

        res.status(500).send({
            success: false,
            message: "Error in creating category",
            error
        })
    }
}

export const updateCategoryController = async (req, res) => {

    try {
        const { name } = req.body
        const { categoryId } = req.params

        if (!mongoose.isValidObjectId(categoryId)) {
            return res.status(400).send({
                success: false,
                message: "Invalid category Id",
            })
        }

        const updatedCategory = await categoryModel.findByIdAndUpdate(categoryId, { name, slug: slugify(name) }, { new: true })

        if (!updatedCategory) {
            return res.status(500).send({
                success: false,
                message: "Category updation failed"
            })
        }

        res.status(200).send({
            success: true,
            message: "Category updated successfully",
            category: updatedCategory
        })
    }
    catch (error) {
        console.log(chalk.red(error));

        res.status(500).send({
            success: false,
            message: "Error in updating category",
            error
        })
    }
}

export const getAllCategoryController = async (req, res) => {

    try {
        const categories = await categoryModel.find()

        res.status(200).send({
            success: true,
            message: "All categories fetched successfully",
            categories
        })
    }
    catch (error) {
        console.log(chalk.red(error));

        res.status(500).send({
            success: false,
            message: "Error in fetching all categories",
            error
        })
    }
}

export const getOneCategoryController = async (req, res) => {

    try {
        const { slug } = req.params

        const category = await categoryModel.findOne({ slug })

        res.status(200).send({
            success: true,
            message: "Category fetched successfully",
            category
        })
    }
    catch (error) {
        console.log(chalk.red(error));

        res.status(500).send({
            success: false,
            message: "Error in fetching category",
            error
        })
    }
}

export const deleteCategoryController = async (req, res) => {

    try {
        const { categoryId } = req.params

        if (!mongoose.isValidObjectId(categoryId)) {
            return res.status(400).send({
                success: false,
                message: "Invalid category Id",
            })
        }

        await categoryModel.findByIdAndDelete(categoryId)

        res.status(200).send({
            success: true,
            message: "Category deleted successfully"
        })
    }
    catch (error) {
        console.log(chalk.red(error));

        res.status(500).send({
            success: false,
            message: "Error in deleting category",
            error
        })
    }
}