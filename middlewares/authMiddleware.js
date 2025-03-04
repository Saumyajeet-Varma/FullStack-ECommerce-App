import JWT from "jsonwebtoken"
import chalk from "chalk"

import userModel from "../models/userModel.js"

export const verifyJWT = async (req, res, next) => {

    try {
        const token = req.headers.authorization

        const decode = JWT.verify(token, process.env.JWT_SECRET)

        req.user = decode
        next()
    }
    catch (error) {
        console.log(chalk.red(error));

        res.status(400).send({
            success: false,
            message: "Error while verifying token",
            error
        })
    }
}

export const isAdmin = async (req, res, next) => {

    try {
        const user = await userModel.findById(req.user._id)

        if (user.role !== 1) {
            return res.status(403).send({
                success: false,
                message: "Unauthorized access"
            })
        }
        else {
            next()
        }
    }
    catch (error) {
        console.log(chalk.red(error));

        res.status(400).send({
            success: false,
            message: "Error while verifying admin",
            error
        })
    }
}