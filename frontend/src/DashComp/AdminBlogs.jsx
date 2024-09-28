import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../utlit';

const AdminBlogs = () => {
  const [useblogs, setblogs] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // Loading state to handle async operations
  const [error, setError] = useState(null); // State to handle errors
  const navigate=useNavigate();
  const token=localStorage.getItem("jwt");
  if (!token) {
    console.log("No token found. Cannot fetch blogs.");
    return; // Early exit if token is not available
  }

  async function getadminblogs() {
    try {
      const response = await axios.get(`${BACKEND_URL}/blog/myblogs`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`, // Add the Bearer token here
        },
      });
      setblogs(response.data); // Set the fetched data to state
      console.log(useblogs)
    } catch (err) {
      setError('Failed to fetch blogs'); // Set error state if the request fails
      console.error(err);
    } finally {
      setLoading(false); // Stop the loading spinner regardless of success or failure
    }
  }

  useEffect(() => {
    getadminblogs();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : useblogs.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-[50px] mx-[20px] md:mx-[80px]'>
          {useblogs.map((item) => (
             <div className='my-2 wfull mx-2 rounded-lg  relative hover:scale-95 shadow-2xl duration-150'>
               <img className='w-full rounded-lg h-[200px] object-cover' src={item.blogphoto.url} alt="" />
               <div className='  items-center h-32'>
               <p className='text-md mt-5 p-3  text-md font-semibold'>{item.title}</p>

               <div className='flex flex-row justify-between p-3'>
                <button onClick={()=>navigate(`/updateblog/${item._id}`)} className='border-[2px] shadow-2xl border-gray-500 font-semibold text-green-400 text-sm p-1'>Update</button>
                <button onClick={()=>navigate(`/deleteblog/${item._id}`)} className='border-[2px] shadow-2xl border-gray-600 font-semibold text-red-400 text-sm p-1'>Delete</button>
               </div>

             </div>
             </div>
             
          ))}
        </div>
      ) : (
        <div className='flex justify-center rounded-3xl items-center bg-slate-200 ml-[200px] mt-[200px] w-full'>
                  <p className='text-center font-bold text-xl m-20'>No blogs available</p>

          </div>
      )}
    </div>
  );
};

export default AdminBlogs;
