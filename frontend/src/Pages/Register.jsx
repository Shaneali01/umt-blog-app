import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../utlit';

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  async function handleRegister(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', role);

    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/users/register`,
        formData,
        { withCredentials: true }
      );

      if (data.message) {
        toast.error(data.message); // Display error message if exists
      } else {
        // Store JWT in localStorage
        localStorage.setItem('jwt', data.token); // Assuming data.token contains the JWT

        toast.success("Registration successful!");
        setEmail('');
        setPassword('');
        setRole('');
        navigate('/'); // Redirect to the home page or another page
      }
    } catch (error) {
      toast.error("SOMETHING WENT WRONG");
      console.log(error);
    }
  }

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg p-8">
          <form onSubmit={handleRegister}>
            <div className="font-semibold text-xl items-center text-center">
              Cili <span className="text-violet-500">Blogs</span>
            </div>
            <h1 className="text-xl font-semibold mb-6">REGISTER</h1>

            <select
              className="w-full p-2 rounded border mb-4"
              onChange={(e) => setRole(e.target.value)}
              value={role}
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <div className="mb-4">
              <input
                className="w-full p-2 rounded border"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Enter Your Email Address"
              />
            </div>

            <div className="mb-4">
              <input
                className="w-full p-2 rounded border"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Enter Your Password"
              />
            </div>

            <p className="text-center items-center mb-4">
              Already have an account?
              <Link className="text-blue-600 ml-3" to="/login">
                Login Now
              </Link>
            </p>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-center text-xl p-2 text-white duration-300 rounded"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
