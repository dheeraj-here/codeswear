import User from "@/models/User";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
    // Ensure the database is connected before querying
    await connectDb();
    console.log("DB connected successfully");

    // Fetch products
    let users = await User.find();
    console.log("DB data");
    res.status(200).json({ users });
}

export default handler;s