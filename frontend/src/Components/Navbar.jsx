import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink
import { CiMenuBurger } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { useAuth } from '../ContextApi/AuthProvider';
import image from '../images/image.png';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { profile } = useAuth(); 
  const token = localStorage.getItem('jwt');
  const navLinkClass = ({ isActive }) => 
    isActive ? 'text-blue-500 font-bold' : 'hover:text-blue-200';
  const handleLogout = () => {
    localStorage.removeItem('jwt'); 
    window.location.reload();
    toast.success("SUCCESSFULL LOGOUT")
    Navigate('/login')

  };
  return (
    <>
      <nav className='shadow-lg px-4 py-2'>
        <div className='flex justify-between container mx-auto'>
          <div className='font-semibold text-xl mt-1 flex flex-row'>
            <img src={image} className='h-[40px] mt-[-5px] mr-2 w-[40px]' alt="" />
            UMT <span className='text-blue-500 ml-2'>Blogs</span>
          </div>
          <div>
            <ul className='md:space-x-4 md:justify-evenly md:text-sm lg:text-md md:font-bold lg:space-x-6 hidden md:flex md:mt-[8px] lg:mt-[5px]'>
              <NavLink className={navLinkClass} to='/'>HOME</NavLink>
              {token && ( 
                <>
                  <NavLink className={navLinkClass} to='/allblogs'>BLOGS</NavLink>
                  <NavLink className={navLinkClass} to='/creators'>CREATORS</NavLink>
                </>
              )}
              <NavLink className={navLinkClass} to='/about'>ABOUT</NavLink>
              <NavLink className={navLinkClass} to='/contact'>CONTACT</NavLink>
            </ul>
          </div>
          <div className='md:hidden'>
            {show ? (
              <RxCross2 size={24} onClick={() => setShow(!show)} />
            ) : (
              <CiMenuBurger onClick={() => setShow(!show)} size={24} />
            )}
          </div>
          <div className='space-x-2 hidden md:flex'>
            {profile?.role === 'admin' && (
              <NavLink to='/dashboard' className='bg-blue-600 text-white font-semibold hover:bg-blue-800 px-4 py-2 rounded'>
                DASHBOARD
              </NavLink>
            )}
            {token ? (
              <button onClick={handleLogout} className='bg-red-600 text-white font-semibold hover:bg-red-800 md:px-2 md:py-1 lg:px-4 lg:py-2 rounded'>
                Logout
              </button>
            ) : (
              <NavLink to='/login' className='bg-red-600 text-white font-semibold hover:bg-red-800 md:px-2 md:py-1 lg:px-4 lg:py-2 rounded'>
                Login
              </NavLink>
            )}
          </div>
        </div>

        {/* MOBILE NAVBAR */}
        {show && (
          <div>
            <ul className='space-y-4 rounded-lg mt-5 duration-700 transition-transform bg-slate-300 flex h-screen items-center justify-center flex-col md:hidden'>
              <NavLink onClick={() => setShow(false)} className={`${navLinkClass} bg-green-600 text-white font-semibold hover:bg-red-800 px-4 py-2 rounded`} to='/'>HOME</NavLink>
              {token && ( 
                <>
                  <NavLink onClick={() => setShow(false)} className={`${navLinkClass} bg-purple-600 text-white font-semibold hover:bg-red-800 px-4 py-2 rounded`} to='/allblogs'>BLOGS</NavLink>
                  <NavLink onClick={() => setShow(false)} className={`${navLinkClass} bg-yellow-600 text-white font-semibold hover:bg-red-800 px-4 py-2 rounded`} to='/creators'>CREATORS</NavLink>
                </>
              )}
              <NavLink onClick={() => setShow(false)} className={`${navLinkClass} bg-gray-600 text-white font-semibold hover:bg-red-800 px-4 py-2 rounded`} to='/about'>ABOUT</NavLink>
              <NavLink onClick={() => setShow(false)} className={`${navLinkClass} bg-emerald-600 text-white font-semibold hover:bg-red-800 px-4 py-2 rounded`} to='/contact'>CONTACT</NavLink>
              {profile?.role === 'admin' && (
                <NavLink to='/dashboard' className='bg-blue-600 text-white font-semibold hover:bg-blue-800 px-4 py-2 rounded'>
                  DASHBOARD
                </NavLink>
              )}
              {token ? (
                <button onClick={handleLogout} className='bg-red-600 text-white font-semibold hover:bg-red-800 px-4 py-2 rounded'>
                  Logout
                </button>
              ) : (
                <NavLink to='/login' className='bg-red-600 text-white font-semibold hover:bg-red-800 px-4 py-2 rounded'>
                  Login
                </NavLink>
              )}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
