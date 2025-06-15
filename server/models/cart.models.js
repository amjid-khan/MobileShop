import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    title: String,
    brand: String,
    description: String,
    price: String,
    image: String,
    quantity: Number
}, {});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;