import mongoose from 'mongoose'
import slugify from 'slugify'
import chalk from 'chalk'
import fs from 'fs'

import productModel from '../models/productModel.js'

export const createProductController = async (req, res) => {

    try {
        const { name, description, price, category, quantity } = req.fields
        const { image } = req.files

        if (!name) {
            return res.send({ message: "Name is required" })
        }
        if (!description) {
            return res.send({ message: "Description is required" })
        }
        if (!price) {
            return res.send({ message: "Price is required" })
        }
        if (!category) {
            return res.send({ message: "Category is required" })
        }
        if (!quantity) {
            return res.send({ message: "Quantity is required" })
        }
        if (!image || image.size > 1000000) {
            return res.send({ message: "Image is required and it's size must be less than 1Mb" })
        }

        const slug = slugify(name)

        const existingProduct = await productModel.findOne({ slug })

        if (existingProduct) {
            return res.status(400).send({
                success: false,
                message: "Product already exist",
            })
        }

        const product = await productModel.create({ ...req.fields, slug })

        if (image) {
            product.image.data = fs.readFileSync(image.path)
            product.image.contentType = image.type
        }

        await product.save()

        res.status(201).send({
            success: true,
            message: "Product successfully created",
            product
        })
    }
    catch (error) {
        console.log(chalk.red(error));

        res.status(500).send({
            success: false,
            message: "Error in creating product",
            error
        })
    }
}

export const updateProductController = async (req, res) => {

    try {
        const { name, description, price, category, quantity } = req.fields
        const { image } = req.files
        const { productId } = req.params

        if (!mongoose.isValidObjectId(productId)) {
            return res.status(400).send({
                success: false,
                message: "Invalid product Id"
            })
        }

        if (!name) {
            return res.send({ message: "Name is required" })
        }
        if (!description) {
            return res.send({ message: "Description is required" })
        }
        if (!price) {
            return res.send({ message: "Price is required" })
        }
        if (!category) {
            return res.send({ message: "Category is required" })
        }
        if (!quantity) {
            return res.send({ message: "Quantity is required" })
        }
        if (!image || image.size > 1000000) {
            return res.send({ message: "Image is required and it's size must be less than 1Mb" })
        }

        const slug = slugify(name)

        const existingProduct = await productModel.findById(productId)

        if (!existingProduct) {
            return res.status(400).send({
                success: false,
                message: "Product doesn't exist",
            })
        }

        const updatedProduct = await productModel.findByIdAndUpdate(productId, { ...req.fields, slug }, { new: true })

        if (image) {
            updatedProduct.image.data = fs.readFileSync(image.path)
            updatedProduct.image.contentType = image.type
        }

        await updatedProduct.save()

        res.status(201).send({
            success: true,
            message: "Product successfully updated",
            updatedProduct
        })
    }
    catch (error) {
        console.log(chalk.red(error));

        res.status(500).send({
            success: false,
            message: "Error in updating product",
            error
        })
    }
}

export const getAllProductsController = async (req, res) => {

    try {
        const products = await productModel.find().select("-image").limit(12).sort({ createdAt: -1 })

        res.send({
            success: true,
            message: "All products fetched successfully",
            totalProducts: products.length,
            products
        })
    }
    catch (error) {
        console.log(chalk.red(error));

        res.status(500).send({
            success: false,
            message: "Error in fetching all products",
            error
        })
    }
}

export const getOneProductController = async (req, res) => {

    try {
        const { slug } = req.params

        const product = await productModel.findOne({ slug })

        res.status(200).send({
            success: true,
            message: "Product fetched successfully",
            product
        })
    }
    catch (error) {
        console.log(chalk.red(error));

        res.status(500).send({
            success: false,
            message: "Error in fetching the product",
            error
        })
    }
}

export const getProductImageController = async (req, res) => {

    try {
        const { productId } = req.params

        if (!mongoose.isValidObjectId(productId)) {
            return res.status(400).send({
                success: false,
                message: "Invalid product Id"
            })
        }

        const product = await productModel.findById(productId).select("image")

        if (product.image.data) {
            res.set("Content-type", product.image.contentType)
            return res.status(200).send(product.image.data)
        }
    }
    catch (error) {
        console.log(chalk.red(error));

        res.status(500).send({
            success: false,
            message: "Error while getting the image of product",
            error
        })
    }
}

export const deleteProductController = async (req, res) => {

    try {
        const { productId } = req.params

        if (!mongoose.isValidObjectId(productId)) {
            return res.send({
                success: false,
                message: "Invalid product Id"
            })
        }

        await productModel.findByIdAndDelete(productId)

        res.status(200).send({
            success: true,
            message: "Product deleted successfully"
        })
    }
    catch (error) {
        console.log(chalk.red(error));

        res.status(500).send({
            success: false,
            message: "Error while deleting the product",
            error
        })
    }
}

export const productFilterController = async (req, res) => {

    try {
        const { checked, radio } = req.body

        let args = {}

        if (checked.length > 0) {
            args.category = checked
        }

        if (radio.length) {
            args.price = { $gte: radio[0], $lte: radio[1] }
        }

        const products = await productModel.find(args)

        res.status(200).send({
            success: true,
            message: "Products filtered successfully",
            products
        })
    }
    catch (error) {
        console.log(chalk.red(error));

        res.status(500).send({
            success: false,
            message: "Error while filtering the product",
            error
        })
    }
}

export const productCountController = async (req, res) => {

    try {
        const totalProducts = await productModel.find().estimatedDocumentCount()

        res.status(200).send({
            success: true,
            message: "Total product count fetched",
            totalProducts
        })
    }
    catch (error) {
        console.log(chalk.red(error));

        res.status(500).send({
            success: false,
            message: "Error while counting the products",
            error
        })
    }
}

export const productListController = async (req, res) => {

    try {
        const page = req.params.page ? req.params.page : 1

        const productsPerPage = 12

        const products = await productModel.find().select("-image").skip((page - 1) * productsPerPage).limit(productsPerPage).sort({ createdAt: -1 })

        res.status(200).send({
            success: true,
            message: "Products per page fetched successfully",
            products
        })
    }
    catch (error) {
        console.log(chalk.red(error));

        res.status(500).send({
            success: false,
            message: "Error in products per page controller",
            error
        })
    }
}

export const searchProductController = async (req, res) => {

    try {
        const { keyword } = req.params

        const result = await productModel.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        }).select("-image")

        res.status(200).send({
            success: true,
            message: "Searched product fetched",
            result
        })
    }
    catch (error) {
        console.log(chalk.red(error));

        res.status(500).send({
            success: false,
            message: "Error in searching the product",
            error
        })
    }
}