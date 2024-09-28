const { createToken } = require("../Auth");
const usermodel = require("../Models/UserModel");
const cloudinary = require('cloudinary').v2;
const bcrypt = require('bcryptjs');

async function registerUser(req, res) {
    try {
        if (!req.files || !req.files.photo) {
            return res.status(400).json({ message: 'PHOTO IS REQUIRED' });
        }

        const { photo } = req.files;
        const formats = ['image/jpeg', 'image/png'];
        if (!formats.includes(photo.mimetype)) {
            return res.status(400).json({ message: 'INVALID FORMAT' });
        }

        const { name, email, password, phone, role, education } = req.body;
        if (!name || !email || !password || !phone || !role || !education) {
            return res.status(400).json({ message: 'ALL FIELDS ARE REQUIRED' });
        }

        const findemail = await usermodel.findOne({ email });
        if (findemail) {
            return res.status(400).json({ message: 'EMAIL ALREADY EXISTS' });
        }

        // Upload photo to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(photo.tempFilePath);

        // Hash the password
        const hashpassword = await bcrypt.hash(password, 10);

        // Create a new user
        const UserCreate = new usermodel({
            name,
            email,
            password: hashpassword,
            phone,
            role,
            education,
            photo: {
                public_id: uploadResult.public_id,
                url: uploadResult.url
            }
        });

        // Save the user in the database
        await UserCreate.save();

        // Generate token
        const token = await createToken(UserCreate._id, res);

        // Send response
        return res.status(201).send({ message: "SUCCESS", token });
    } catch (error) {
        console.error('Error occurred during registration:', error);
        return res.status(500).json({ message: 'INTERNAL SERVER ERROR' });
    }
}

async function loginUser(req, res) {
    try {
        const { role, email, password } = req.body;
        if (!role || !email || !password) {
            return res.status(400).json({ message: "ALL FIELDS ARE REQUIRED" });
        }

        const user = await usermodel.findOne({ email }).select("+password");
        if (!user) {
            return res.status(404).json({ message: 'USER DOES NOT EXIST WITH THIS EMAIL' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "WRONG PASSWORD" });
        }

        if (user.role !== role) {
            return res.status(403).json({ message: "USER WITH THIS ROLE NOT FOUND" });
        }

        const token = await createToken(user._id, res);
        return res.json({ message: 'SUCCESSFUL LOGIN', token });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'INTERNAL SERVER ERROR' });
    }
}

async function logoutUser(req, res) {
    try {
        res.clearCookie('jwt', { httpOnly: true });
        return res.json("USER LOGGED OUT SUCCESSFULLY");
    } catch (error) {
        console.error('Error during logout:', error);
        return res.status(500).json("INTERNAL SERVER ERROR");
    }
}

async function getProfile(req, res) {
    try {
        const user = req.user;
        return res.json(user);
    } catch (error) {
        console.error('Error fetching profile:', error);
        return res.status(500).json({ message: "SOMETHING WENT WRONG" });
    }
}

async function GetAllAdmins(req, res) {
    try {
        const data = await usermodel.find({ role: 'admin' });
        return res.json(data);
    } catch (error) {
        console.error('Error fetching admins:', error);
        return res.status(500).json("SOMETHING WENT WRONG");
    }
}

module.exports = { registerUser, loginUser, logoutUser, getProfile, GetAllAdmins };
