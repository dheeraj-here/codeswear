import User from "@/models/User"
var CryptoJS = require('crypto-js')
var jwt = require('jsonwebtoken')


const hand = async(req, res) => {
    if(req.method == "POST"){
        let user = await User.findOne({"email": req.body.email});
       
        if(user){
            const bytes  = CryptoJS.AES.decrypt(user.password, 'secret123');
            let decrePass = bytes.toString(CryptoJS.enc.Utf8);
            console.log(req.body.email, user.email, req.body.password, decrePass);
    
            if(req.body.email == user.email && req.body.password == decrePass){
                var token = jwt.sign({email: user.email, name: user.name}, "jwtsecret");
                res.status(200).json({"success": true, token})
            }
            else{
                res.status(200).json({success: false, error: "Invalid Credentials"})
            }
        }
        else{
            res.status(200).json({success: false, error: "User not found"})
        }
    }
    else{
        res.status(400).json({messg: "This method is not allowed"})
    }
}

export default hand;