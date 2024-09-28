const express=require('express');
const { registerUser,loginUser, logoutUser, getProfile, GetAllAdmins } = require('../Controllers/userContorller');
const { verification, authorization } = require('../Middlewares/User');
const router=express.Router();
router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/logout',logoutUser);
router.get('/getprofile',verification,getProfile)
router.get('/allAdmins',GetAllAdmins)
module.exports=router