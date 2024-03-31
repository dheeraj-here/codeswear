import mongoose from "mongoose";

const connectDb = async (handler) => {
    if (mongoose.connections[0].readyState) {
        return; // Call next to proceed to the next middleware or route handler
    }
    try {
        await mongoose.connect('mongodb+srv://codesWear:codeswear@cluster0.e6lt0tj.mongodb.net/');
        console.log('DB connected');
    } catch (error) {
        console.error('DB connection error:', error);
    }
}

export default connectDb;
