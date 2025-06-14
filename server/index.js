//All import Here
import express from "express"
import dotenv from "dotenv"
import ConnectDB from "./DB/db.js"

dotenv.config()



const app = express()

// connect mongoDB and Listening Server
ConnectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Server is listening on Port : ", process.env.PORT)
    })
})