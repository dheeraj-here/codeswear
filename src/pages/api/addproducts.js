import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
    await connectDb();

    if (req.method == 'POST') {
        try {
            for (let i = 0; i < req.body.length; i++) {
                let p = new Product({
                    title: req.body[i].title,
                    slug: req.body[i].slug,
                    desc: req.body[i].desc,
                    img: req.body[i].img,
                    category: req.body[i].category,
                    size: req.body[i].size,
                    color: req.body[i].color,
                    price: req.body[i].price,
                    availability: req.body[i].availability,
                })
                await p.save()
            }
            res.status(200).json({ message: "Data saved successfully" });
        }
        catch (err) {
            res.status(500).json({ err: `${err}`})
        }
    }
    else {
        console.log("Error Found!!!!");
        res.status(400).json({ error: "This mehtod is not allowed" })
    }
}

export default handler