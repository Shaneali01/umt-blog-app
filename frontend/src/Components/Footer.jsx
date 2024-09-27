import React from 'react'
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import {Link} from 'react-router-dom'
import image from '../images/image.png'





const Footer = () => {
  return (
    <div className='       bg-slate-200 '>
      <div className=' flex flex-row justify-between sm:p-[10px] p-[5px] sm:mx-[90px] mx-[10px] '>
        <div>
          <ul className='sm:my-5 text-sm'>
            <li className='sm:text-lg  font-bold mr-[5px]'>Products</li>
            <li  className='my-[6px]'>services</li>
            <li className='my-[6px]'>services</li>
            <li className='my-[6px]'>services</li>
            <li className='my-[6px]'>services</li>

          </ul>
        </div>
        <div>
          <ul className='sm:my-5 text-sm'>
            <li className='sm:text-lg font-bold mr-[5px]'>Design to Code</li>
            <li className='my-[6px]'>services</li>
            <li className='my-[6px]'>services</li>
            <li className='my-[6px]'>services</li>
            <li className='my-[6px]'>services</li>

          </ul>
        </div>
        <div>
          <ul className='sm:my-5 text-sm'>
            <li className='sm:text-lg text-sm font-bold mr-[5px]'>Comparison</li>
            <li className='my-[6px]'>services</li>
            <li className='my-[6px]'>services</li>
            <li className='my-[6px]'>services</li>
            <li className='my-[6px]'>services</li>

          </ul>
        </div>
        <div>
          <ul className='sm:my-5 text-sm flex flex-col'>
            <li className='sm:text-lg text-sm font-bold mr-[5px]'>Company</li>
            <li className='my-[6px]'>services</li>
            <li className='my-[6px]'>services</li>
            <li className='my-[6px]'>services</li>
            <li className='my-[6px]'>services</li>

          </ul>
        </div>
       
      </div>


      <div className='flex flex-row justify-evenly  '>
      <div className='font-semibold text-sm sm:text-xl mt-1 flex flex-row '>
            <img src={image} className='sm:h-[40px] h-[25px] mt-[-2px] sm:mt-[-11px] mr-2 w-[25px] sm:w-[40px]' alt="" />
            UMT <span className='text-blue-500 ml-2'>Blogs</span>
          </div>
      <p className='font-bold mt-[4px]'>2024 private limited</p>
      <div className='flex flex-row mb-[10px] '>
        <Link to={'https://www.linkedin.com/in/shan-e-ali-shah-57ab72287/'}>        <FaLinkedin  className='mx-[4px] mb-[2px] hover:text-red-600'  size={25}/>
</Link>
<Link to={'https://github.com/Shaneali01'}>        <FaGithub  className='mx-[4px] mb-[2px] hover:text-red-600' size={25}/>
</Link>        <FaYoutube className='mx-[4px] mb-[2px] hover:text-red-600' size={25}/>
      </div>

      </div>
    </div>
  )
}

export default Footer
