import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader'; // Import ClipLoader for spinner
import 'react-multi-carousel/lib/styles.css';
import { BACKEND_URL } from '../utlit';

const Creators = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading status

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const token=localStorage.getItem('jwt')
        const response = await axios.get(`${BACKEND_URL}/api/users/allAdmins`,{
          headers:{
            Authorization: `Bearer ${token}`  
          },
          withCredentials:true
        });
        console.log('POOKIE SHAN', response.data);
        setAdmins(response.data);
      } catch (error) {
        console.error('Error fetching admins:', error);
      } finally {
        setLoading(false); // Stop loading after the request is done (success or fail)
      }
    };
    fetchAdmins();
  }, []);

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-[50px] ml-0   mx-[50px] sm:mx-[80px] space-x-3'>
        {loading ? ( // Show spinner while loading
          <div className="flex justify-center items-center h-screen">
            <ClipLoader className='' color={'#36d7b7'} loading={loading} size={150} />
          </div>
        ) : admins && admins.length > 0 ? (
          admins.map((item) => (
            <Link  key={item._id}>
              <div className='my-2 w-full mx-5 rounded-lg relative hover:scale-95 shadow-2xl duration-150 mb-[20px]'>
                <img
                  className='w-full rounded-lg h-[130px] object-cover'
                  src={item.photo?.url || 'default-image-url'}
                  alt="Blog"
                />
                <img
                  className='w-[60px] border-[2px] top-24 left-28 sm:left-72 md:left-28 absolute border-black rounded-full h-[60px] object-cover'
                  src={item.photo?.url || 'default-image-url'}
                  alt="Blog"
                />
                <p className='text-md font-bold absolute bottom-24 left-2 text-lime-400'>{item.title}</p>
                <div className='h-32 flex flex-col items-center mt-[20px] justify-evenly'>
                  <p className='font-bold text-[15px]'>{item.name}</p>
                  <p className='font-bold text-[15px]'>{item.email}</p>
                  <p className='font-bold text-[15px]'>{item.phone}</p>
                  <p className='font-bold text-[15px]'>{item.role}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className='text-xl font-bold'>No Admins available</p>
        )}
      </div>
    </>
  );
};

export default Creators;
