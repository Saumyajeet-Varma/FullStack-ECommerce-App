import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan';
import chalk from 'chalk';
import cors from 'cors';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import authRoute from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import orderRoute from "./routes/orderRoute.js";

dotenv.config();

connectDB();

const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors())
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./frontend/dist")))

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/category', categoryRoute)
app.use('/api/v1/product', productRoute)
app.use('/api/v1/order', orderRoute)

app.use('*', function (req, res) {
    res.sendFile(path.join(__dirname, "./frontend/dist/index.html"))
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(chalk.blue(`\nServer is running on ${process.env.DEV_MODE} mode at ${PORT}`));
    console.log(chalk.blue(`http://localhost:${PORT}`));
})