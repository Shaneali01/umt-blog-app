const cloudinary = require('cloudinary').v2;
const blogmodel = require('../Models/BlogModel');

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

        const adminName = req.user.name;
        const UserPhoto = req.user.photo;
        const { title, category, about } = req.body;

        if (!title || !category || !about) {
            return res.status(400).json({ message: 'ALL FIELDS ARE REQUIRED' });
        }

        // Validate the length of the "about" field
        if (about.length < 200) {
            return res.status(400).send({ message: 'ABOUT MUST BE AT LEAST 200 WORDS' });
        }

        // Upload photo to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(blogphoto.tempFilePath);

        // Create a new blog post
        const createBlog = new blogmodel({
            title,
            category,
            about,
            adminName,
            UserPhoto: {
                public_id: UserPhoto.public_id,
                url: UserPhoto.url
            },
            createdBy: req.user._id,
            blogphoto: {
                public_id: uploadResult.public_id,
                url: uploadResult.url
            }
        });

        // Save the blog post
        await createBlog.save();
        return res.status(201).send({ message: "SUCCESS" });
    } catch (error) {
        console.error('Error creating blog:', error);
        return res.status(500).json({ message: 'INTERNAL SERVER ERROR' });
    }
}

async function DeleteBlog(req, res) {
    try {
        const blogId = req.params.id;
        const deletedBlog = await blogmodel.findByIdAndDelete(blogId);
        if (!deletedBlog) {
            return res.status(404).json("BLOG NOT FOUND");
        }

        // Optionally, remove the blog photo from Cloudinary
        if (deletedBlog.blogphoto && deletedBlog.blogphoto.public_id) {
            await cloudinary.uploader.destroy(deletedBlog.blogphoto.public_id);
        }

        return res.json("SUCCESSFULLY DELETED");
    } catch (error) {
        console.error('Error deleting blog:', error);
        return res.status(500).json("FAILED TO DELETE");
    }
}

async function GetAllBlogs(req, res) {
    try {
        const data = await blogmodel.find({});
        return res.json(data);
    } catch (error) {
        console.error('Error fetching all blogs:', error);
        return res.status(500).json('FAILED TO GET DATA');
    }
}

async function GetSingleBlog(req, res) {
    try {
        const blogId = req.params.id;
        const data = await blogmodel.findById(blogId);
        if (!data) {
            return res.status(404).json("BLOG NOT FOUND");
        }
        return res.json(data);
    } catch (error) {
        console.error('Error fetching single blog:', error);
        return res.status(500).json("NOT FOUND");
    }
}

async function Myblogs(req, res) {
    try {
        const userId = req.user.id;
        const data = await blogmodel.find({ createdBy: userId });
        if (data.length === 0) {
            return res.json({ message: "NO RECORDS FOUND" });
        }
        return res.json(data);
    } catch (error) {
        console.error('Error fetching user blogs:', error);
        return res.status(500).json("SOMETHING WENT WRONG");
    }
}

async function UpdateBlogs(req, res) {
    try {
        const id = req.params.id;
        const updateData = {
            title: req.body.title,
            category: req.body.category,
            about: req.body.about
        };

        // Check for a new image upload
        if (req.files && req.files.blogphoto) {
            const { blogphoto } = req.files;
            const formats = ['image/jpeg', 'image/png'];
            if (!formats.includes(blogphoto.mimetype)) {
                return res.status(400).json({ message: 'INVALID FORMAT' });
            }

            // Remove the old image from Cloudinary if necessary
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
            return res.status(404).json({ message: "BLOG NOT FOUND" });
        }

        return res.status(200).json({ message: "SUCCESS", data: updatedBlog });
    } catch (error) {
        console.error('Error updating blog:', error);
        return res.status(500).json("FAILED TO UPDATE");
    }
}

module.exports = {
    CreateBlog,
    DeleteBlog,
    GetAllBlogs,
    GetSingleBlog,
    Myblogs,
    UpdateBlogs
};
