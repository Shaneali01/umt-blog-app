import React, { useState, useEffect } from 'react';
import { useAuth } from '../ContextApi/AuthProvider';
import { Link } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';

const Hero = () => {
  const { useblogs } = useAuth(); 
  const [loading, setLoading] = useState(true); // Loading state

  // Simulating a delay in data fetching (replace this with actual data fetching logic)
  useEffect(() => {
    if (useblogs) {
      setLoading(false); // Set loading to false when blogs are available
    }
  }, [useblogs]);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-[50px] mx-[20px] md:mx-[80px]'>

      {loading ? (
        <div className="flex justify-center items-center w-full h-[200px]">
          <BeatLoader color="#4A90E2" loading={loading} />
        </div>
      ) : (
        useblogs && useblogs.length > 0 ? (
          useblogs.slice(0, 4).map((item, index) => (
            <Link to={`/blogs/${item._id}`} key={item._id}>
              <div className='my-2 wfull mx-2 rounded-lg relative hover:scale-95 shadow-2xl duration-150'>
                <img className='w-full rounded-lg h-[200px] object-cover' src={item.blogphoto.url} alt={item.title} />
                <p className='text-sm font-bold absolute bottom-24 left-2 text-white'>{item.title}</p>
                <div className='h-20 flex flex-row items-center'>
                  <img className='w-[50px] mr-[5px] h-[50px] rounded-full ml-[20px]' src={item.UserPhoto.url} alt={item.adminName} />
                  <p className='font-bold text-[15px]'>{item.adminName}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className='text-md text-red-500 font-bold'>No blogs available</p>
        )
      )}
    </div>
  );
};

export default Hero;
