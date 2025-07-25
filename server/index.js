//All import Here
import express from "express"
import dotenv from "dotenv"
import ConnectDB from "./DB/db.js"
import Router from "./routes/routes.js"
import cors from "cors"

const app = express()
dotenv.config()
app.use(express.json());

// ✅ Allowed frontend origins
const allowedOrigins = [
    "http://localhost:5173", // Local dev
    "https://amazing-cobbler-29b6f1.netlify.app", // Production frontend
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("CORS policy: Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);

// 🔽 Your other middlewares and routes
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