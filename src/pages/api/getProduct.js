import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
    // Ensure the database is connected before querying
    await connectDb();
    console.log("DB connected successfully");

    // Fetch products
    try{
        let products = await Product.find();
        console.log("DB data");
        res.status(200).json({ products });
    }
    catch(err){
        console.log("Error in fetching data:- ", err);
        res.status(400).json({"error": err})
    }
   
}

export default handler;