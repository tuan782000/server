// console.log("Hello world!!!")

const express = require('express')
const cors = require('cors')
const authRouter = require('./src/routers/authRouter')
const connectDB = require('./src/configs/connectDb')
const errorMiddleHandle = require('./src/middlewares/errorMiddleware')
const app = express()
require('dotenv').config();

const PORT = 3001

app.use(cors())

//để đọc json
app.use(express.json())

app.use('/auth', authRouter)

connectDB(); // phải đứng trước app.listen mới hoạt động được nha

app.use(errorMiddleHandle);

app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
        return
    }
    console.log(`Server starting at http://localhost:${PORT}`)
})
