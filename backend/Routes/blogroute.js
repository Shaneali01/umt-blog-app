const express=require('express');
const { CreateBlog, DeleteBlog, GetAllBlogs,GetSingleBlog, Myblogs, UpdateBlogs } = require('../Controllers/blogcontroller');
const { verification,authorization} = require('../Middlewares/User');
const router=express.Router();
router.post('/blogcreate',verification,authorization,CreateBlog);
router.delete('/deleteblog/:id',verification,authorization,DeleteBlog);
router.get('/allblogs',GetAllBlogs);
router.get('/singleblog/:id',GetSingleBlog)
router.get('/myblogs',verification,authorization,Myblogs);
router.put('/updateblog/:id',verification,authorization,UpdateBlogs)
module.exports=router