import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { toast } from 'react-hot-toast'; 
import image from '../images/image.png';   
import axios from 'axios'; 
import { BACKEND_URL } from '../utlit';  

const Register = () => {   
  const navigate = useNavigate();   
  const [name, setName] = useState('');   
  const [email, setEmail] = useState('');   
  const [password, setPassword] = useState('');   
  const [phone, setPhone] = useState('');   
  const [role, setRole] = useState('');   
  const [education, setEducation] = useState('');   
  const [photo, setPhoto] = useState('');   
  const [prev, setPrev] = useState('');   
  const [loading, setLoading] = useState(false); 
  const [imageChosen, setImageChosen] = useState(false); 

  const photoHandler = (e) => {     
    const file = e.target.files[0];     
    const reader = new FileReader();     
    reader.readAsDataURL(file);     
    reader.onload = () => {       
      setPrev(reader.result);       
      setPhoto(file);       
      setImageChosen(true); 
    };   
  };   

  async function handleRegister(e) {     
    e.preventDefault();     
    setLoading(true);     
    const formData = new FormData();     
    formData.append('name', name);     
    formData.append('email', email);     
    formData.append('password', password);     
    formData.append('role', role);     
    formData.append('phone', phone);     
    formData.append('education', education);     
    formData.append('photo', photo);      

    try {       
      const { data } = await axios.post(         
        `${BACKEND_URL}/api/users/register`,         
        formData, { withCredentials: true }       
      );       
      toast.success("SUCCESSFULLY REGISTERED");       
      localStorage.setItem('jwt', data.token); 

      // Reset form fields
      setName('');       
      setEmail('');       
      setPassword('');       
      setPhone('');       
      setPhoto('');       
      setEducation('');       
      setRole('');       
      setPrev('');       
      setImageChosen(false); 
      toast('Please Login to access more features!', {         
        icon: '👏',         
        duration: 5000, 
      });       
      navigate('/login')     
    } catch (error) {       
      alert("SOMETHING WENT WRONG");       
      console.log(error);     
    } finally {       
      setLoading(false);     
    }   
  }   

  return (     
    <div className="min-h-screen flex items-center justify-center bg-gray-100 my-2">       
      <div className="w-full max-w-md bg-white rounded-lg p-8">         
        <form onSubmit={handleRegister}>         
          <div className='flex justify-center'>           
            <div className='font-semibold text-xl mt-1 flex flex-row'>             
              <img src={image} className='h-[40px] mt-[-5px] mr-2 w-[40px]' alt="" />             
              UMT <span className='text-blue-500 ml-2'>Blogs</span>           
            </div>           
          </div>           
          <h1 className="text-xl font-semibold mb-6">REGISTER</h1>            

          <select             
            className="w-full p-1 rounded border mb-4"             
            onChange={(e) => setRole(e.target.value)}             
            value={role}             
            disabled={loading}           
          >             
            <option value="">Select Role</option>             
            <option value="user">User</option>             
            <option value="admin">Admin</option>           
          </select>            

          <div className="mb-4">             
            <input               
              className="w-full p-1 rounded border"               
              type="text"               
              value={name}               
              onChange={(e) => setName(e.target.value)}               
              placeholder="Your Name"               
              disabled={loading}             
            />           
          </div>            

          <div className="mb-4">             
            <input               
              className="w-full p-1 rounded border"               
              type="email"               
              onChange={(e) => setEmail(e.target.value)}               
              value={email}               
              placeholder="Enter Your Email Address"               
              disabled={loading}             
            />           
          </div>            

          <div className="mb-4">             
            <input               
              className="w-full p-1 rounded border"               
              type="password"               
              onChange={(e) => setPassword(e.target.value)}               
              value={password}               
              placeholder="Enter Your Password"               
              disabled={loading}             
            />           
          </div>            

          <div className="mb-4">             
            <input               
              className="w-full p-1 rounded border"               
              type="text"               
              onChange={(e) => setPhone(e.target.value)}               
              value={phone}               
              placeholder="Enter Your Phone Number"               
              disabled={loading}             
            />           
          </div>            

          <select             
            className="w-full p-1 rounded border mb-4"             
            onChange={(e) => setEducation(e.target.value)}             
            value={education}             
            disabled={loading}           
          >             
            <option value="">Select Your Education</option>             
            <option value="BCA">BCA</option>             
            <option value="MCA">MCA</option>             
            <option value="BSCS">BSCS</option>             
            <option value="BSSE">BSSE</option>           
          </select>            

          <div className="flex items-center mb-4">             
            <div className="photo h-20 w-[140px] mr-4 mt-6">               
              {prev && <img className='h-[100px] w-[100px] rounded-full' src={prev} alt="Preview" />}             
            </div>             
            <label className="w-full p-1 rounded border cursor-pointer">
              Choose image
              <input               
                className="hidden" // Hide the actual file input               
                onChange={photoHandler}               
                type="file"               
                disabled={loading}             
              />           
            </label>
          </div>            

          {/* Conditional message for image selection */}
          {imageChosen && (
            <p className="text-center text-green-500 mb-4">Image chosen</p>
          )}

          <p className="text-center items-center mb-4">             
            Already Registered?             
            <Link className="text-blue-600 ml-3" to="/login">               
              Login Now             
            </Link>           
          </p>            

          <button             
            type="submit"             
            className="w-full bg-blue-500 hover:bg-blue-600 text-center text-xl p-1 text-white duration-300 rounded"             
            disabled={loading}           
          >             
            {loading ? 'Registering...' : 'Register'}           
          </button>         
        </form>       
      </div>     
    </div>   
  ); 
};  

export default Register; 
