import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useAuth } from '../ContextApi/AuthProvider';
import {Link} from 'react-router-dom'

const Devotional = () => {
  let { useblogs } = useAuth(); // Destructure useblogs from the context
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  useblogs=useblogs?.filter((item,_)=>item.category==='educational')


  return (
    <div className=' mx-[10px]  md:mx-[80px]'>
    <h1 className='text-3xl font-bold m-[20px]'>Education</h1>
    <Carousel responsive={responsive}>

    {useblogs && useblogs.length>0 ? (
      useblogs.map((item, index) => (
       <Link to={`/blogs/${item._id}`} key={item._id}>
        <div className='my-2 wfull mx-2 rounded-lg  relative hover:scale-95 shadow-xl duration-150'>
          <img className='w-full rounded-lg h-[200px] object-cover' src={item.blogphoto.url} alt="" />
          <p className='text-sm font-bold absolute bottom-24 left-2 text-white'>{item.title}</p>
          <p className='text-sm font-bold bg-violet-300  rounded-2xl p-[7px] absolute bottom-60 left-1 '>{item.category}</p>

          <div className='h-20 flex flex-row items-center'>
          <img className='w-[50px] mr-[9px] h-[50px] ml-[20px] rounded-full' src={item.UserPhoto.url} alt="" />
          <p className='font-bold text-[15px] '>{item.adminName}</p>
        </div>
        </div>
        
       </Link>
      ))
    ) : (
      <p className='text-md text-red-500 font-bold'>No blogs available</p> // Display this message if useblogs is empty or undefined
    )}
  </Carousel>
  </div>
  )
}

export default Devotional
