
const cloudinary = require('cloudinary').v2;
const { default: mongoose } = require('mongoose');
const blogmodel=require('../Models/BlogModel')
async function CreateBlog(req, res) {
    try {
        if (!req.files || !req.files.blogphoto) {
            return res.status(400).json({ message: 'PHOTO IS REQUIRED' });
        }
        const { blogphoto } = req.files;
        const formats = ['image/jpeg', 'image/png'];
        if (!formats.includes(blogphoto.mimetype)) {
            return res.status(400).json({ message: 'INVALID FORMAT' });
        }
        const adminName=req.user.name;
        const UserPhoto=req.user.photo

        const { title,category,about } = req.body;
        if(!title || !category || !about ){
            return res.json({message : 'ALL FIELDS ARE REQUIRED'})
        }

        // Upload photo to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(blogphoto.tempFilePath);


        // Create a new user
        const createBlog = new blogmodel({
            title,
            category,
            about,
            adminName,
            UserPhoto: {
                public_id: req.user.photo.public_id,
                url: req.user.photo.url
            },
            createdBy: req.user._id,
            blogphoto: {
                public_id: uploadResult.public_id,
                url: uploadResult.url
            }
        });
        if(about.length<200){
            return res.send({message:'200 words'})
        }
        

        // Save the user in the database
        await createBlog.save();

        // Generate token and store it in the user's document

        // Send response
        return res.status(201).send({ message: "SUCCESS", });
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
}
async function DeleteBlog(req,res){
   try{
    const blogid=req.params.id;
    await blogmodel.findByIdAndDelete(blogid)
    return res.json("SUCCESSFULLY DELETED")

   }
   catch(error){
    return res.json("FAILED TO DELETE")
   }
}
async function GetAllBlogs(req,res){
    try{
        const Data=await blogmodel.find({});
        if(!Data){
            return res.json("DATA NOT FOUND")
        }
        return res.json(Data)
    }
    catch(error){
        return res.json('FAILED TO GET DATA')
    }
}
async function GetSingleBlog(req,res){
    try{
        const blogid=req.params.id;
        const Data=await blogmodel.findById(blogid);
        if(!Data){
            return res.json("USER DONT EXIST WITH THIS ID")
        }
        return res.json(Data)

    }
    catch(error){
        return res.json("NOT FOUND")
    }
}
async function Myblogs(req,res){
   try{
    const userid=req.user.id;
    console.log(userid)
    const Data=await blogmodel.find({createdBy:userid});
   if(Data.length===0){
    return res.json({message:"NO RECORDS FOUND"})
   }
    return res.json(Data)

   }
   catch(error){
    return res.json("SOWMTHING WENT WRONG")
   }
}
async function UpdateBlogs(req, res) {
    try {
        const id = req.params.id;

        // Prepare the update object
        const updateData = {
            title: req.body.title,
            category: req.body.category,
            about: req.body.about
        };

        // Check for a new image upload
        if (req.files && req.files.blogphoto) {
            const { blogphoto } = req.files;

            // Validate image type
            const formats = ['image/jpeg', 'image/png'];
            if (!formats.includes(blogphoto.mimetype)) {
                return res.status(400).json({ message: 'INVALID FORMAT' });
            }

            // Optional: Remove the old image from Cloudinary if necessary
            const blog = await blogmodel.findById(id);
            if (blog && blog.blogphoto && blog.blogphoto.public_id) {
                await cloudinary.uploader.destroy(blog.blogphoto.public_id);
            }

            // Upload the new image to Cloudinary
            const uploadResult = await cloudinary.uploader.upload(blogphoto.tempFilePath);
            updateData.blogphoto = {
                public_id: uploadResult.public_id,
                url: uploadResult.url
            };
        }

        // Update the blog using findByIdAndUpdate
        const updatedBlog = await blogmodel.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        return res.status(200).json({ message: "SUCCESS", data: updatedBlog });
    } catch (error) {
        console.error('Error occurred during update:', error);
        return res.status(500).json({ message: 'INTERNAL SERVER ERROR' });
    }
}

    

module.exports = { CreateBlog,DeleteBlog,GetAllBlogs,GetSingleBlog,Myblogs,UpdateBlogs };
