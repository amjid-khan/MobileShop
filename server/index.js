//All import Here
import express from "express"
import dotenv from "dotenv"
import ConnectDB from "./DB/db.js"
import Router from "./routes/routes.js"
import cors from "cors"

const app = express()
dotenv.config()
app.use(cors())
app.use(express.json());
app.use("/uploads", express.static("uploads"));

//Routes
app.use("/api/product", Router)


// connect mongoDB and Listening Server
ConnectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Server is listening on Port : ", process.env.PORT)
    })
})