import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("MongoDB Connection Successfully");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error.message);
    }
};

export default connectDB;
