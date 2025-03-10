import chalk from "chalk"
import JWT from "jsonwebtoken"

import userModel from "../models/userModel.js"
import { comparePassword, hashPassword } from "../utils/authHelper.js"

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
            return res.status(200).send({
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
            message: "User logged in seuccessfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
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

export const testController = (req, res) => {
    res.send("Protected Route")
}
