import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan';
import chalk from 'chalk';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get('/', (req, res) => {
    res.send("Server is listening");
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(chalk.magenta(`\nServer is running on ${process.env.DEV_MODE} mode at ${PORT}`));
    console.log(chalk.magenta(`http://localhost:${PORT}`));
})