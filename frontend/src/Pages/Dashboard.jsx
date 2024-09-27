import React, { useEffect } from 'react';
import { useAuth } from '../ContextApi/AuthProvider';
import Sidebar from '../DashComp/Sidebar';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import AdminBlogs from '../DashComp/AdminBlogs';

const Dashboard = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();

  // Check if the profile is valid
  const isProfileValid = profile && typeof profile === 'object' && Object.keys(profile).length > 0;

  // Navigate if the profile is not valid
  useEffect(() => {
    if (!isProfileValid) {
      navigate('/');
      toast.error("ONLY ADMINS CAN ACCESS DASHBOARD")
    }
  }, [isProfileValid, navigate]);

  return (
    <>
      {isProfileValid ? (
       <div className='flex flex-row'>
         <div>
          <Sidebar />
        </div>
        <div className='h-screen'>
          <AdminBlogs/>
        </div>
       </div>
      ) : null}
    </>
  );
};

export default Dashboard;
