import chalk from "chalk"

import userModel from "../models/userModel.js"
import { hashPassword } from "../utils/authHelper.js"

export const registerController = async (req, res) => {

    try {
        const { name, email, password, phone, address } = req.body

        if (!name) {
            return res.send({ error: "Name is required" })
        }
        if (!email) {
            return res.send({ error: "Email is required" })
        }
        if (!password) {
            return res.send({ error: "Password is required" })
        }
        if (!phone) {
            return res.send({ error: "Phone number is required" })
        }
        if (!address) {
            return res.send({ error: "Address is required" })
        }

        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
            res.status(200).send({
                success: true,
                message: "Already registered, please login"
            })
        }

        const hashedPassword = await hashPassword(password)

        const user = (await userModel.create({ name, email, phone, address, password: hashedPassword })).save()

        res.status(200).send({
            success: true,
            message: "User registered successfully",
            user
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
