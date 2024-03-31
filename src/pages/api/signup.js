import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
var CryptoJS = require('crypto-js')

const handler = async (req, res) => {
    await connectDb();
    if (req.method == 'POST') {
        try {
                const {name, email} = req.body;
                let u = new User({ name, email, password: CryptoJS.AES.encrypt(req.body.password, "secret123").toString() });
                console.log(u);
                await u.save()
            
            res.status(200).json({success:true, message: "Data saved successfully" });
        }
        catch (err) {
            res.status(500).json({ err: `${err}`})
        }
    }
    else {
        res.status(400).json({ error: "This mehtod is not allowed" })
    }
}

export default handler;