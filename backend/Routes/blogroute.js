const express=require('express');
const { CreateBlog, DeleteBlog, GetAllBlogs,GetSingleBlog, Myblogs, UpdateBlogs } = require('../Controllers/blogcontroller');
const { verification,authorization} = require('../Middlewares/User');
const router=express.Router();
router.post('/blogcreate',CreateBlog);
router.delete('/deleteblog/:id',DeleteBlog);
router.get('/allblogs',GetAllBlogs);
router.get('/singleblog/:id',GetSingleBlog)
router.get('/myblogs',Myblogs);
router.put('/updateblog/:id',UpdateBlogs)
module.exports=router