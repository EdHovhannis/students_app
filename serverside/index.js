import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import mongoose from 'mongoose'
import postRouter from './api/postRouter.js'
import authRouter from './api/authRouter.js'
import shortRouter from './api/shortpostRouter.js'
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.status(200).json({ message: "Server is OK." })
})

app.use("/api/posts", postRouter)
app.use("/api/auth", authRouter)
app.use("/api/shortpost", shortRouter)

app.use((error, req, res, next)=>{
    res.status(500).send({message: error.message})
    next()
})

const port = process.env.PORT || 8000
const DBconnect = process.env.DB_URI || "mongodb+srv://Edo:QJYuQhMnenHLED60@cluster0.brfcq.mongodb.net/Students_App?retryWrites=true&w=majority"
const foo = async () => {
    await mongoose.connect(DBconnect, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }, ()=>{console.log(` Data Base is connected . `)})
    app.listen(port, () => { console.log(` Server is running on port: ${port} . `) })
}
foo()

