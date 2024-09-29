import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../utlit';

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    if (!token) {
      setLoading(false); 
      return; 
    }
    
    async function getAdminBlogs() {
      try {
        const response = await axios.get(`${BACKEND_URL}/blog/myblogs`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlogs(response.data); 
      } catch (err) {
        setError('Failed to fetch blogs: ' + (err.response?.data?.message || err.message)); 
      } finally {
        setLoading(false); 
      }
    }

    getAdminBlogs(); 
  }, [token]); 

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : blogs.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-[50px] mx-[20px] md:mx-[80px]'>
          {blogs.map((item) => (
            <div key={item._id} className='my-2  mx-2 rounded-lg relative hover:scale-95 shadow-2xl duration-150'>
              <img className='w-full rounded-lg h-[200px] object-cover' src={item.blogphoto.url} alt="" />
              <div className='items-center h-40'>
                <p className='text-md mt-5 p-3 text-md font-semibold'>{item.title}</p>
                <div className='flex flex-row justify-between p-3'>
                  <button onClick={() => navigate(`/updateblog/${item._id}`)} className='border-[2px] shadow-2xl border-gray-500 font-semibold text-green-400 text-sm p-1'>Update</button>
                  <button onClick={() => navigate(`/deleteblog/${item._id}`)} className='border-[2px] shadow-2xl border-gray-600 font-semibold text-red-400 text-sm p-1'>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='flex justify-center h-[100px] sm:h-[200px] rounded-3xl items-center bg-slate-200 ml-[15px] mr-4 sm:ml-[50px] lg:ml-[200px] mt-[200px] w-auto lg:w-full'>
                  <p className='text-center font-bold text-sm sm:text-xl m-20'>No blogs available</p>

          </div>
      )}
    </div>
  );
};

export default AdminBlogs;
