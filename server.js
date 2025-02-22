import express from 'express'
import dotenv from 'dotenv'

dotenv.config();

const app = express();

app.get('/', (req, res) => {
    res.send("Server is listening");
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`\nServer is running on ${process.env.DEV_MODE} mode at ${PORT}`);
    console.log(`http://localhost:${PORT}`)
})