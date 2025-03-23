import braintree from 'braintree'
import dotenv from "dotenv";
import chalk from 'chalk'

import orderModel from '../models/orderModel.js'

dotenv.config();

// * Payment Gateway
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

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

export const getAllAdminOrdersController = async (req, res) => {

    try {
        const orders = await orderModel.find().populate("products", "-image").populate("buyer", "name").sort({ createdAt: -1 })

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

export const changeOrderStatusController = async (req, res) => {

    try {
        const { status } = req.body
        const { orderId } = req.params

        const order = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true })

        res.status(200).send({
            success: true,
            message: "Order status changed successfully",
            order
        })
    }
    catch (error) {
        console.log(chalk.red(error));

        res.status(500).send({
            success: false,
            message: "Error in changing the status",
            error
        })
    }
}

export const braintreeTokenController = async (req, res) => {

    try {
        gateway.clientToken.generate({}, function (error, response) {

            if (error) {
                res.status(500).send({
                    success: false,
                    message: "Error in braintree client token generation",
                    error
                })
            }
            else {
                if (response.success) {
                    res.status(200).send({
                        success: true,
                        message: "Token generated successfully",
                        token: response.clientToken
                    })
                }
                else {
                    res.status(500).send({
                        success: false,
                        message: "Braintree client token generation failed",
                        error
                    })
                }
            }
        })
    }
    catch (error) {
        console.log(chalk.red(error));

        res.status(500).send({
            success: false,
            message: "Error in braintree token",
            error
        })
    }
}

export const braintreePaymentController = async (req, res) => {

    try {
        const { cart, nonce } = req.body

        const total = cart.reduce((acc, item) => acc + item.price, 0)

        let newTransaction = gateway.transaction.sale(
            {
                amount: total,
                paymentMethodNonce: nonce,
                options: {
                    submitForSettlement: true,
                }
            },
            function (error, result) {
                if (result.success) {
                    const order = orderModel.create({
                        products: cart,
                        payment: result,
                        buyer: req.user._id,
                    })

                    return res.status(200).send({
                        success: true,
                        message: "Braintree payment done",
                    })
                }
                else {
                    return res.status(500).send({
                        success: false,
                        message: "Braintree payment failed",
                    })
                }
            })
    }
    catch (error) {
        console.log(chalk.red(error));

        res.status(500).send({
            success: false,
            message: "Error in braintree payment",
            error
        })
    }
}