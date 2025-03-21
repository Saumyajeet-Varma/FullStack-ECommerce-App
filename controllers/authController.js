import chalk from "chalk"
import JWT from "jsonwebtoken"

import userModel from "../models/userModel.js"
import orderModel from "../models/orderModel.js"
import { comparePassword, hashPassword } from "../utils/authHelper.js"
import mongoose from "mongoose"

export const registerController = async (req, res) => {

    try {
        const { name, email, password, phone, address } = req.body

        if (!name) {
            return res.send({ message: "Name is required" })
        }
        if (!email) {
            return res.send({ message: "Email is required" })
        }
        if (!password) {
            return res.send({ message: "Password is required" })
        }
        if (!phone) {
            return res.send({ message: "Phone number is required" })
        }
        if (!address) {
            return res.send({ message: "Address is required" })
        }

        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
            return res.status(401).send({
                success: false,
                message: "Already registered, please login"
            })
        }

        const hashedPassword = await hashPassword(password)

        const user = await userModel.create({ name, email, phone, address, password: hashedPassword })

        res.status(200).send({
            success: true,
            message: "User registered successfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
            }
        })
    }
    catch (error) {
        console.log(chalk.red(error));

        res.status(500).send({
            success: false,
            message: "Error in registration",
            error
        })
    }
}

export const loginController = async (req, res) => {

    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password",
            })
        }

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email not registered",
            })
        }

        const correctPassword = await comparePassword(password, user.password)

        if (!correctPassword) {
            return res.status(403).send({
                success: false,
                message: "Invalid password",
            })
        }

        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

        res.status(200).send({
            success: true,
            message: "User logged in successfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token
        })
    }
    catch (error) {
        console.log(chalk.red(error));

        res.status(500).send({
            success: false,
            message: "Error in login",
            error
        })
    }
}

export const updateProfileController = async (req, res) => {

    try {
        const { name, email, phone, address } = req.body

        const user = await userModel.findById(req.user._id)

        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            email: email || user.email,
            phone: phone || user.phone,
            address: address || user.address,
        }, { new: true })

        res.status(200).send({
            success: true,
            message: "User profile updated successfully",
            user: {
                name: updatedUser.name,
                email: updatedUser.email,
                phone: updatedUser.phone,
                address: updatedUser.address,
            }
        })
    }
    catch (error) {
        console.log(chalk.red(error));

        res.status(500).send({
            success: false,
            message: "Error in updating profile",
            error
        })
    }
}

export const changePasswordController = async (req, res) => {

    try {
        const { currentPassword, newPassword } = req.body

        if (!currentPassword || !newPassword) {
            return res.status(400).send({ message: "All fields are required" })
        }

        const user = await userModel.findById(req?.user?._id)

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            })
        }

        const correctPassword = await comparePassword(currentPassword, user.password)

        if (!correctPassword) {
            return res.status(403).send({
                success: false,
                message: "Crrent password is wrong",
            })
        }

        const hashedPassword = await hashPassword(newPassword)

        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, { password: hashedPassword }, { new: true })

        return res.status(200).send({
            success: true,
            message: "Password changed successfully",
        })
    }
    catch (error) {
        console.log(chalk.red(error));

        res.status(500).send({
            success: false,
            message: "Error in changing password",
            error
        })
    }
}

export const getAllOrdersController = async (req, res) => {

    try {
        const orders = await orderModel.find({ buyer: req?.user?._id }).populate("products", "-image").populate("buyer", "name")

        res.status(200).send({
            success: true,
            message: "All orders fetched successfully",
            orders
        })
    }
    catch (error) {
        console.log(chalk.red(error));

        res.status(500).send({
            success: false,
            message: "Error in fetching all orders",
            error
        })
    }
}

export const getOrderController = async (req, res) => {

    try {
        const { orderId } = req.params

        const order = await orderModel.findById(orderId).populate("products", "-image")

        res.status(200).send({
            success: true,
            message: "Order fetched successfully",
            order
        })
    }
    catch (error) {
        console.log(chalk.red(error));

        res.status(500).send({
            success: false,
            message: "Error in fetching order",
            error
        })
    }
}