import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { BACKEND_URL } from '../utlit';

const Deleteblog = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const [data, setData] = useState(null); // State for blog data
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error
  const navigate = useNavigate();

  async function getSingleBlog() {
    try {
      const response = await axios.get(`${BACKEND_URL}/blog/singleblog/${id}`, { withCredentials: true });
      if (response.data === "USER DONT EXIST WITH THIS ID") {
        setError("Blog not found");
      } else {
        setData(response.data);
      }
    } catch (err) {
      console.error("Error fetching the blog:", err);
      setError("An error occurred while fetching the blog");
    } finally {
      setLoading(false);
    }
  }

  async function deleteblog() {
    const confirmed = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmed) return; // If the user cancels, exit the function

    try {
      const token = localStorage.getItem('token'); // Adjust based on your implementation

      const response = await axios.delete(`${BACKEND_URL}/blog/deleteblog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}` // Add the token to headers
        },
        withCredentials: true
      });
      console.log(response);
      toast.success('Successfully deleted');
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete the blog');
    }
  }

  useEffect(() => {
    getSingleBlog(); // Fetch the blog on component mount
  }, [id]); // Ensure it runs when id changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>No blog data available</div>;
  }

  return (
    <div className='mx-[40px] shadow-2xl rounded-xl p-8'>
      <div className='mx-[10px] sm:mx-[120px]'>
        <div className='mt-[50px]'>
          <h1 className='mb-[10px] text-4xl font-bold'>{data.title}</h1>
          <p className='text-sm sm:text-md font-bold'>{data.about || "No description available."}</p>
        </div>
        <div className='mt-[20px]'>
          <h1 className='mb-[30px] text-2xl font-bold text-violet-800'>Category: {data.category}</h1>
        </div> 
        <div className='mt-[20px]'>
          <h1 className='mb-[30px] text-2xl font-bold text-violet-800'>Blog Photo</h1>
          {data.blogphoto ? (
            <img src={data.blogphoto.url} alt={data.title} className='w-[800px] rounded-lg h-[500px]' />
          ) : (
            <p>No blog photo available</p>
          )}
        </div> 
        <div className='mt-[20px]'>
          <h1 className='mb-[30px] text-2xl font-bold text-violet-800'>User Photo</h1>
          {data.UserPhoto ? (
            <img src={data.UserPhoto.url} alt="User" className='w-[150px] rounded-full h-[150px]' />
          ) : (
            <p>No user photo available</p>
          )}
        </div>
        <div className='mt-[20px]'>
          <h1 className='mb-[30px] font-bold text-violet-800'>Personal Interests and Inspiration</h1>
          <p className='mb-[60px] text-sm'>Additional details about the blog can go here.</p>
        </div>       
      </div>
      <button onClick={deleteblog} className='w-full mb-[40px] bg-red-500 hover:bg-red-800 p-2 text-xl text-white text-center'>Delete</button>
    </div>
  );
};

export default Deleteblog;
