import logo from "./logo.svg";
import  { Toaster } from 'react-hot-toast';

import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import Blogs from './Pages/Blogs'
import About from './Pages/About'
import Contacts from './Pages/Contacts'
import Login from './Pages/Login'
import Register from './Pages/Register'
import { Route, Routes, useLocation } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import { useAuth } from "./ContextApi/AuthProvider";
import Craetors from "./Pages/Craetors";
import AdminBlogs from './DashComp/AdminBlogs'
import CreateBlog from "./DashComp/CreateBlog";
import Updateblog from "./DashComp/Updateblog";
import Deleteblog from "./DashComp/Deleteblog";
import Mybllogs from "./AdminPages/Mybllogs";
function App() {
  const location = useLocation();
  const hide=['/login','/register','/dashboard','/createblog','/deleteblog','/updateblog'].includes(location.pathname)
  return (
    <>
    {!hide && <Navbar/>}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/blogs/:id" element={<Blogs/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contacts/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/creators" element={<Craetors/>}/>
        <Route path="/myblogs" element={<AdminBlogs/>}/>
        <Route path="/createblog" element={<CreateBlog/>}/>
        <Route path="/updateblog/:id" element={<Updateblog/>}/>
        <Route path="/deleteblog/:id" element={<Deleteblog/>}/>
        <Route path="/allblogs" element={<Mybllogs/>}/>





      </Routes>
      <Toaster />
      {!hide && <Footer/>}


    </>
  );
}

export default App;
