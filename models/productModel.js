import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    slug: {
        type: String,
        lowercase: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose.ObjectId,
        ref: "category",
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    },
    shipping: {
        type: Boolean,
    }
}, { timestamps: true })

export default mongoose.model("products", productSchema)