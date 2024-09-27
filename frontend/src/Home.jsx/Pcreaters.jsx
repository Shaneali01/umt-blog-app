import React, { useEffect, useState } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {Link} from 'react-router-dom'
import axios from 'axios';
import { BACKEND_URL } from '../../utlit';

const Pcreaters = () => {
  const[admins,setadmins]=useState([])
  useEffect(()=>{
    async function admins(){
      const response=await axios.get(`${BACKEND_URL}/api/users/allAdmins`);
      setadmins(response.data)
    }
    admins();
  },[])
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
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
  return (
    <div className=' mx-[10px]  md:mx-[80px]'>
    <h1 className='text-3xl font-bold m-[20px]'>Popular Creators</h1>
    <Carousel responsive={responsive}>

    {admins && admins.length>0 ? (
      admins.map((item, index) => (
        <div className=' '>
          <img className='  w-[200px] h-[200px] mx-2 rounded-full border-[2px] border-black  relative hover:scale-95 shadow-xl duration-150' src={item.photo.url} alt="" />

          <div className='h-20 flex flex-row items-center'>
          <p className='font-bold  text-xl ml-[60px] '>{item.name}</p>
        </div>
        </div>
        
      ))
    ) : (
      <p className='text-md font-bold text-red-500'>No Creators Available</p> // Display this message if admins is empty or undefined
    )}
  </Carousel>
  </div>
  )
}

export default Pcreaters
