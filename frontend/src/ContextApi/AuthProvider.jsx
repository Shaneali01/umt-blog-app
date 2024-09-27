import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import { BACKEND_URL } from "../../utlit";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [useblogs, setBlogs] = useState([]);
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState(null);

  async function getProfile() {
    try {
      const token = Cookies.get('jwt');
      console.log("Token:", token);

      // Only fetch the profile if the token exists
      if (token) {
        const response = await axios.get(`${BACKEND_URL}/api/users/getprofile`, {
          headers: { Authorization: `Bearer ${token}` }, // Sending token in headers
          withCredentials: true,
        });

        console.log("Profile Data:", response.data);
        setProfile(response.data);
      } else {
        console.log("No token found, skipping profile fetch.");
      }
    } catch (error) {
      console.log("Error fetching profile:", error);
      setProfileError(error);
    } finally {
      setProfileLoading(false);
    }
  }
  async function fetchBlogs() {
    try {
      const response = await axios.get(`${BACKEND_URL}/blog/allblogs`);
      console.log("Blogs Response:", response.data);
      setBlogs(response.data);
    } catch (err) {
      console.log("Error fetching blogs:", err);
    }
  }

  useEffect(() => {


    fetchBlogs();
    getProfile(); // Only called if the token exists
  }, []);

  return (
    <AuthContext.Provider value={{ useblogs, profile, profileLoading, profileError,getProfile,fetchBlogs }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
