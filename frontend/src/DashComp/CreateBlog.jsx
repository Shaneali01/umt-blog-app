import React, { useState } from 'react';
import Sidebar from './Sidebar';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../utlit';

const CreateBlog = () => {
  const navigate=useNavigate();
  const [category, setCategory] = useState('devotional');
  const [title, setTitle] = useState('');
  const [photo, setPhoto] = useState('');
  const [prev, setPrev] = useState('');
  const [about, setAbout] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const photoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPrev(reader.result);
      setPhoto(file);
    };
  };

  async function handlePost(e) {
    e.preventDefault();
    if (category === '' || title === '' || photo === '' || about === '') {
      return toast.error('All fields are required');
    }
    if(about.length<200){
      return toast.error("Blog Must be Greater than 200 words")
    }

    const formdata = new FormData();
    formdata.append('category', category);
    formdata.append('title', title);
    formdata.append('blogphoto', photo);
    formdata.append('about', about);

    setLoading(true); // Start loading
    try {
      const response = await axios.post(`${BACKEND_URL}/blog/blogcreate`, formdata, { withCredentials: true });
      console.log(response.data.message);
      toast.success('Blog posted successfully!');
      navigate('/')
      setLoading(false); // Stop loading
    } catch (error) {
      toast.error('SOMETHING WENT WRONG');
      setLoading(false); // Stop loading
    }
  }

  return (
    <div className="flex flex-row">
      <div>
        <Sidebar />
      </div>
      <div className="flex flex-col shadow-2xl mx-[10px] sm:mx-[40px] md:mx-[70px] lg:mx-[180px] my-[10px] w-[700px] space-y-4 p-2 rounded-2xl">
        <h1 className="p-4 text-xl font-bold">CREATE BLOGS</h1>
        <form onSubmit={handlePost} className="">
          <p className="text-md font-semibold">Category</p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 text-sm mt-3 font-semibold"
          >
            <option value="devotional">Devotional</option>
            <option value="educational">Educational</option>
            <option value="entertainment">Entertainment</option>
            <option value="action">Action</option>
            <option value="islamic">Islamic</option>
            <option value="philosophy">Philosophy</option>
            <option value="nature">Nature</option>
            <option value="horror">Horror</option>
          </select>
          <p className="text-md font-semibold mt-5">Title</p>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 text-sm mt-3 font-semibold"
            placeholder="Title"
          />
          <p className="text-md font-semibold mt-5">Blog Image</p>
          <div>
            {prev && (
              <img
                className="h-[100px] w-[100px] rounded-full"
                src={prev}
                alt="Preview"
              />
            )}
            <input
              type="file"
              onChange={photoHandler}
              className="w-full p-3 text-sm mt-3 font-semibold"
              placeholder="Blog Image"
            />
          </div>
          <p className="text-md font-semibold mt-5">About</p>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-full h-36 p-3 mt-5 font-semibold"
            placeholder="Write about the blog here... must be greater than 200 words"
          />
          <button
            type="submit"
            className="w-full mt-[10px] h-[40px] bg-blue-500 text-white text-center text-sm font-bold"
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Posting...' : 'Post Blog'}
          </button>
        </form>
        {loading && (
          <div className="text-center mt-4 text-blue-500 font-semibold">
            Posting your blog, please wait...
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateBlog;
