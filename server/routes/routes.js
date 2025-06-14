import express from "express"
import Product from "../models/product.models.js";
import upload from "../config/multer.js";

const Router = express.Router()

Router.post("/add", upload.single("image"), async (req, res) => {
    const { title, brand, description } = req.body;
    const image = req.file.filename;
    const product = await Product.create({
        title,
        brand,
        description,
        image
    })
    const Result = {
        status: 201,
        msg: "Product Add Successfully",
        product
    }
    res.send(Result)
})


export default Router