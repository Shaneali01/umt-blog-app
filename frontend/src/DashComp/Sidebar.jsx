import React from "react";
import { useAuth } from "../ContextApi/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Sidebar = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  async function handlelogout(){
    try{
      const response=await axios.get('http://localhost:8000/api/users/logout',{withCredentials:true})
      console.log("myrespnse",response)
      toast.success('SUCCESSFULL LOGOUT')
      navigate('/login')

    }
    catch(error){
      console.log("LOGIN FAILED",error)
    }
  }
  return (
    <div className="h-[900px]    sm:w-56    md:w-64 shadow-2xl bg-yellow-50">
      <div className="flex flex-col items-center justify-center">
        <img
          className="w-[100px] mt-[40px] h-[100px] rounded-full"
          src={profile.photo.url}
          alt=""
        />
        <p className="font-semibold font-xl mt-2">{profile.name}</p>
        <ul className="flex flex-col mt-14 space-y-4">
          <button onClick={() => navigate("/")}>
            {" "}
            <li className="  mx-3   sm:w-[180px]  md:w-[240px] p-2 rounded-lg text-center bg-green-500 font-semibold text-md">
              Home
            </li>
          </button>
          <button
            onClick={() => {
              navigate("/createblog");
            }}
          >
            {" "}
            <li className="  mx-3   sm:w-[180px]     md:w-[240px] p-2 rounded-lg text-center bg-blue-500 font-semibold text-md">
              CreateBlog
            </li>
          </button>
         
         <button onClick={handlelogout}> <li className=" mx-3   sm:w-[180px]  md:w-[240px] p-2 rounded-lg text-center bg-yellow-500 font-semibold text-md">
            Logout
          </li></button>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
