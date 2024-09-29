import React from 'react'
import axios from 'axios';
import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BACKEND_URL } from '../utlit';

const Blogs = () => {
  const { id } = useParams(); 
  const [data, setData] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  async function getSingleBlog() {
    try {
      const response = await axios.get(`${BACKEND_URL}/blog/singleblog/${id}`, { withCredentials: true });
      if (response.data === "USER DONT EXIST WITH THIS ID") {
        setError("Blog not found");
      } else {
        setData(response.data);
      }
    } catch (err) {
      setError("An error occurred while fetching the blog");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getSingleBlog(); 
  }, [id]); 

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
    <div className=' mx-[10px]  sm:mx-[40px] shadow-2xl rounded-2xl p-8 my-6 '>
      <div className='     sm:mx-[120px]'>
        <div className='mt-[50px]'>
          <h1 className='mb-[10px] text-4xl font-bold'>{data.title}</h1>
          <p className=' text-sm font-semibold sm:text-md '>{data.about || "No description available."}</p>
        </div>
        <div className='mt-[20px]'>
          <h1 className='mb-[30px] text-3xl font-bold text-black'>Category: {data.category}</h1>
        </div> 
        <div className='mt-[20px]'>
          {data.blogphoto ? (
            <img src={data.blogphoto.url} alt={data.title} className='sm:w-[800px] rounded-lg h-[400px] sm:h-[500px]' />
          ) : (
            <p>No blog photo available</p>
          )}
        </div> 
        <div className='mt-[20px]'>
          <h1 className='mb-[30px] text-3xl font-bold text-black'>Admin</h1>
          {data.UserPhoto ? (
            <img src={data.UserPhoto.url} alt="User" className='w-[150px] h-[150px] rounded-full' />
          ) : (
            <p>No user photo available</p>
          )}
        </div>
        <div className='mt-[20px]'>
          <h1 className='mb-[30px] ml-[40px] text-xl font-bold text-violet-800'>{data.adminName}</h1>
        </div>       
      </div>
    </div>
  )
}

export default Blogs
