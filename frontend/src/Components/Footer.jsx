import React from 'react'
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import {Link} from 'react-router-dom'
import image from '../images/image.png'





const Footer = () => {
  return (
    <div className='       bg-slate-200 '>
      <div className=' flex flex-row justify-between sm:p-[10px] p-[3px] sm:mx-[90px] mx-[10px] '>
      <div>
  <ul className='sm:my-5 text-[11px] sm:text-sm'>
    <li className='sm:text-lg font-bold mr-[5px]'>Products</li>
    <li className='my-[6px]'>E-commerce Solutions</li>
    <li className='my-[6px]'>Mobile Apps</li>
    <li className='my-[6px]'>Software Development</li>
    <li className='my-[6px]'>Cloud Services</li>
  </ul>
</div>
<div>
  <ul className='sm:my-5 text-[11px] sm:text-sm'>
    <li className='sm:text-lg font-bold mr-[5px]'>Design to Code</li>
    <li className='my-[6px]'>UI/UX Design</li>
    <li className='my-[6px]'>Responsive Design</li>
    <li className='my-[6px]'>Prototyping</li>
    <li className='my-[6px]'>Front-end Development</li>
  </ul>
</div>
<div>
  <ul className='sm:my-5 text-[11px] sm:text-sm'>
    <li className='sm:text-lg font-bold mr-[5px]'>Comparison</li>
    <li className='my-[6px]'>Feature Analysis</li>
    <li className='my-[6px]'>Pricing Plans</li>
    <li className='my-[6px]'>Customer Reviews</li>
    <li className='my-[6px]'>Competitor Insights</li>
  </ul>
</div>
<div>
  <ul className='sm:my-5 text-[11px] sm:text-sm'>
    <li className='sm:text-lg font-bold mr-[5px]'>Company</li>
    <li className='my-[6px]'>About Us</li>
    <li className='my-[6px]'>Careers</li>
    <li className='my-[6px]'>Newsroom</li>
    <li className='my-[6px]'>Contact</li>
  </ul>
</div>
       
      </div>


      
      <div className='flex flex-row justify-evenly  '>
      <div className='font-semibold text-sm sm:text-xl  flex flex-row '>
            <img src={image} className='sm:h-[40px] h-[25px] mt-[-2px] sm:mt-[-12px] mr-2 w-[25px] sm:w-[40px]' alt="" />
            UMT <span className='text-blue-500 ml-2'>Blogs</span>
          </div>
      <p className='font-bold sm:text-md text-[13px] mt-[4px]'>2024 private limited</p>
      <div className='flex flex-row mb-[10px] '>
        <Link to={'https://www.linkedin.com/in/shan-e-ali-shah-57ab72287/'}>        <FaLinkedin  className='mx-[4px] mb-[2px] hover:text-red-600'  size={20}/>
</Link>
<Link to={'https://github.com/Shaneali01'}>        <FaGithub  className='mx-[4px] mb-[2px] hover:text-red-600' size={20}/>
</Link>        <FaYoutube className='mx-[4px] mb-[2px] hover:text-red-600' size={20}/>
      </div>

      </div>
    </div>
  )
}

export default Footer
