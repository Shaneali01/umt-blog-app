import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { BACKEND_URL } from '../../utlit';

const Updateblog = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const [data, setData] = useState(null); // State for blog data
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error
  const [category, setCategory] = useState('devotional');
  const [title, setTitle] = useState('');
  const [photo, setPhoto] = useState('');
  const [prev, setPrev] = useState(''); // State for image preview
  const [about, setAbout] = useState('');

  // Function to handle form submission
  async function formhandling(e) {
    e.preventDefault();
    if (category === '' || title === '' || about === '') {
      return toast.error('All fields are required');
    }

    const formdata = new FormData();
    formdata.append('category', category);
    formdata.append('title', title);
    formdata.append('blogphoto', photo); // Sending the file
    formdata.append('about', about);

    setLoading(true); // Start loading
    try {
      const response = await axios.put(`http://localhost:8000/blog/updateblog/${id}`, formdata, { withCredentials: true });
      console.log(response);
      toast.success('Blog updated successfully!');
      setLoading(false); // Stop loading
    } catch (error) {
      toast.error('SOMETHING WENT WRONG');
      setLoading(false); // Stop loading
    }
  }

  // Function to get single blog details by ID
  async function getSingleBlog() {
    setLoading(true); // Add loading state for fetching blog
    try {
      const response = await axios.get(`${BACKEND_URL}/blog/singleblog/${id}`, { withCredentials: true });
      if (response.data === "USER DONT EXIST WITH THIS ID") {
        setError("Blog not found");
      } else {
        const blogdata = response.data;
        setData(blogdata);
        setCategory(blogdata.category);
        setTitle(blogdata.title);
        setPrev(blogdata.blogphoto.url); 
        setPhoto(blogdata.blogphoto);
        console.log(photo)// For pr;eview
        setAbout(blogdata.about);
      }
    } catch (err) {
      console.error("Error fetching the blog:", err);
      setError("An error occurred while fetching the blog");
    } finally {
      setLoading(false); // Stop loading after fetching
    }
  }

  // Fetch the blog when the component mounts
  useEffect(() => {
    getSingleBlog();
  }, []);

  // Function to handle image file selection and preview
  const photoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPrev(reader.result); // Preview the image
      setPhoto(file); // Store the selected file
    };
  };

  return (
    <div className='flex'>
      <div className="flex flex-col justify-center my-7 shadow-2xl mx-[10px] sm:mx-[40px] md:mx-[70px] lg:mx-[180px] border-[2px]  w-[1100px] space-y-2 p-2 rounded-2xl">
        <h1 className="p-4 text-3xl font-bold text-center">Update Blog</h1>
        {error && <p className="text-red-500">{error}</p>} {/* Display error if any */}
        {loading ? (
          <p>Loading...</p> // Show loading state
        ) : (
          <form onSubmit={formhandling} className="">
            <p className="text-xl font-semibold">Category</p>
            <select value={category} onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 text-md bg-gray-100 mt-3 font-semibold"
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

            <p className="text-xl font-semibold mt-5">Title</p>
            <input value={title} onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="w-full p-3 text-md mt-3 bg-gray-100 font-semibold"
              placeholder="Title"
            />

            <p className="text-xl font-semibold mt-5">Blog Image</p>
            <div>
             <div className='flex justify-center'>
             <img src={prev} 
                className="h-[300px] border-[2px] border-black w-[600px] rounded-lg mt-3"
                alt="Preview"
              />
             </div>
              <input
                type="file"
                onChange={photoHandler}
                className="w-full p-3 text-sm mt-3 font-semibold"
                placeholder="Blog Image"
              />
            </div>

            <p className="text-xl font-bold mt-5">About</p>
            <textarea value={about} onChange={(e) => setAbout(e.target.value)}
              className="w-full h-72 p-3 text-md mt-5 bg-gray-100  rounded-lg"
              placeholder="Write about the blog here... must be greater than 200 words"
            />

            <button
              type="submit"
              className={`w-full mt-[10px] h-[40px] ${loading ? 'bg-gray-500' : 'bg-green-500'} hover:bg-green-600 text-white text-center text-sm font-bold`}
              disabled={loading} // Disable the button when loading
            >
              {loading ? 'Updating...' : 'Update'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Updateblog;
 