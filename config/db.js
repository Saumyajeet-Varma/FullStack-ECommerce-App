import mongoose from 'mongoose'
import chalk from 'chalk';

const connectDB = async () => {

    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
        console.log(chalk.green(`Connected to MongoDB: ${connectionInstance.connection.host}`));
    } catch (err) {
        console.log(chalk.red(`Error in MongoDB connection: ${err.message}`));
    }
}

export default connectDB