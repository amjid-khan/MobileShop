import express from "express"
import Product from "../models/product.models.js";
import upload from "../config/multer.js";
import Cart from "../models/cart.models.js";
import { status } from "init";

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


Router.post("/addcart", async (req, res) => {
    try {
        const { title, brand, description, price, image, quantity } = req.body;
        const cartItems = await Cart.create({
            title,
            brand,
            description,
            price,
            image,
            quantity
        })
        res.send({ status: 1, msg: "Item Add Successfully", cartItems })
    } catch (error) {
        console.log("Cart Error", error)
    }
})

Router.get("/addcartview", async (req, res) => {
    const viewCartData = await Cart.find()
    let Result = ({
        status: 1,
        msg: "Cart Data",
        viewCartData
    })
    res.send(Result)
})

Router.delete("/deletecart/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const DeleteItem = await Cart.deleteOne({ _id: id });

        res.send({
            status: 1,
            msg: "Deleted Successfully",
            DeleteItem,
        });
    } catch (err) {
        res.status(500).send({
            status: 0,
            msg: "Error while deleting",
            error: err.message,
        });
    }
});

export default Router