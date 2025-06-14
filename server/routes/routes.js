import express from "express"
import Product from "../models/product.models.js";
import upload from "../config/multer.js";

const Router = express.Router()

Router.post("/add", upload.single("image"), async (req, res) => {
    const { title, brand, description, price } = req.body;
    const image = req.file.filename;
    const product = await Product.create({
        title,
        brand,
        description,
        price,
        image
    })
    const Result = {
        status: 201,
        msg: "Product Add Successfully",
        product
    }
    res.send(Result)
})

Router.get("/view", async (req, res) => {
    const viewData = await Product.find()
    res.send({ status: 1, msg: "Your all data", viewData })
})


export default Router