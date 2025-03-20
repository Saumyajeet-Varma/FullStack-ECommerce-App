import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products"
        }
    ],
    payment: {},
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    status: {
        type: String,
        default: "Not processed",
        enum: ["Not processed", "processing", "Shipped", "Delivered", "Cancel"]
    }
}, { timestamps: true })

export default mongoose.model("order", orderSchema)