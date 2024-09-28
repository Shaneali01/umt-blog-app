const jwt=require('jsonwebtoken');
const usermodel = require('../Models/UserModel');



async function verification(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1]; // Get the token from Authorization header
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const id = decoded.userid;
        const User = await usermodel.findById(id);
        req.user = User;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'USER NOT AUTHENTICATED' });
    }
}

async function authorization(req,res,next){
    if(!req.user){
        return res.json("SOMETHING WENT WRONG")
    }
    if(req.user.role==='admin'){
        next();
    }
    else{
        res.json("CANNOT CREATE BLOG BECAUSE YOU ARE NOT ADMIN")
    }
}
module.exports={verification,authorization}