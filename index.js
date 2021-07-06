const express = require('express');
const todoRoutes = require('./routes/todoRoutes')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

dotenv.config()
const app = express();


app.use(express.json());
connectDB()

app.use('/api/todos', todoRoutes)

const PORT = process.env.PORT || 3000;
app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)