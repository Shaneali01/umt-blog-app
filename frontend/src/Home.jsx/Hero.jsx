import React from 'react';
import { useAuth } from '../ContextApi/AuthProvider';
import { Link } from 'react-router-dom';

const Hero = () => {
  const { useblogs } = useAuth(); // Destructure useblogs from the context

  // Log useblogs to ensure it's not undefined

  // If useblogs is undefined or null, provide a default empty array
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-[50px] mx-[20px] md:mx-[80px]'>
      {useblogs && useblogs.length>0 ? (
        useblogs.slice(0,4).map((item, index) => (
         <Link to={`/blogs/${item._id}`} key={item._id}>
          <div className='my-2 wfull mx-2 rounded-lg  relative hover:scale-95 shadow-2xl duration-150'>
            <img className='w-full rounded-lg h-[200px] object-cover' src={item.blogphoto.url} alt="" />
            <p className='text-sm font-bold absolute bottom-24 left-2 text-white'>{item.title}</p>
            <div className='h-20 flex flex-row items-center'>
            <img className='w-[50px] mr-[5px] h-[50px] rounded-full ml-[20px] rounded=full' src={item.UserPhoto.url} alt="" />
            <p className='font-bold text-[15px] '>{item.adminName}</p>
          </div>
          </div>
          
         </Link>
        ))
      ) : (
        <p className='text-md text-red-500 font-bold'>No blogs available</p> // Display this message if useblogs is empty or undefined
      )}
  
      
    </div>
  
      
  );
};

export default Hero;
