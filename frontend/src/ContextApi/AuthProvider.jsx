import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utlit";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [useblogs, setBlogs] = useState([]);
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState(null);

  async function getProfile() {
    try {
      const token = localStorage.getItem('jwt');
      if (token) {
        const response = await axios.get(`${BACKEND_URL}/api/users/getprofile`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true,
        });

        setProfile(response.data);
      } else {
      }
    } catch (error) {
      setProfileError(error);
    } finally {
      setProfileLoading(false);
    }
  }

  async function fetchBlogs() {
    try {
      const response = await axios.get(`${BACKEND_URL}/blog/allblogs`);
      setBlogs(response.data);
    } catch (err) {
    }
  }

  useEffect(() => {
    fetchBlogs();
    getProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ useblogs, profile, profileLoading, profileError, getProfile, fetchBlogs }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
