import express from "express"
import Product from "../models/product.models.js";

const Router = express.Router()

Router.post("/add", async (req, res) => {
    const { title, brand, description, image } = req.body;
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