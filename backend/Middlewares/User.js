const jwt=require('jsonwebtoken');
const usermodel = require('../Models/UserModel');



async function verification(req,res,next){
    try{
        const token=req.cookies.jwt;
        const decoded=jwt.verify(token,process.env.SECRET_key);
        const id=decoded.userid;
        const User=await usermodel.findById(id);
        req.user=User
        next();
        
    }
    catch(error){
        return res.json({message:'USER NOT AUTHENTICATED'})
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