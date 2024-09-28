import React from 'react'
import Hero from '../Home.jsx/Hero'
import Trending from '../Home.jsx/Trending'
import Devotional from '../Home.jsx/Devotional'
import Pcreaters from '../Home.jsx/Pcreaters'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie';
import { useEffect } from 'react'

const Home = () => {
  const token = localStorage.getItem('jwt'); // Get token from cookies

  useEffect(() => {
    if (!token) {
      toast('Please Login to access more features!', {
        icon: '👏',
        duration: 5000, // Show toast for 4 seconds
      });
    }
  }, [token]);
  return (
    <>
    <Hero/>
    <Trending/>
    <Devotional/>
    <Pcreaters/>
    </>
  )
}

export default Home
