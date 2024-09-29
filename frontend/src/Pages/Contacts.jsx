import React from 'react';
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';

const Contacts = () => {
  const { register, handleSubmit, formState: { errors },reset } = useForm();

  const onSubmit = async (data) => {
    const Userdata = {
      access_key: 'c923b3eb-e737-490e-885b-1cdea6923ff6',
      name: data.name,
      email: data.email,
      message: data.message
    };
    try {
      await axios.post('https://api.web3forms.com/submit', Userdata);
      toast.success("Successfully sent message");
      reset(); 

    } catch (error) {
      toast.error("Failed to send message");
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='bg-white rounded-lg w-[700px] my-3 '>
        <h1 className='text-2xl font-bold text-center p-[20px] md:p-[30px]'>Contact Us</h1>
        <div className='flex flex-col md:flex-row p-[40px]'>
          <div className='mr-[40px]'>
            <h1 className='text-md font-bold'>Send Us a message</h1>
            <form className='flex flex-col justify-evenly' onSubmit={handleSubmit(onSubmit)}>
              <input
                className='my-[12px] placeholder:p-2 p-[5px] text-sm font-semibold w-[300px] rounded-lg border-[1px] border-gray-400'
                type="text"
                placeholder='Your Name'
                {...register("name", { required: true })}
              />
              {errors.name && <p className='text-red-600 font-bold'>Name is required.</p>}

              <input
                className='my-[12px] placeholder:p-2 text-sm font-semibold p-[5px] w-[300px] rounded-lg border-[1px] border-gray-400'
                type="email"
                placeholder='Your Email'
                {...register("email", { required: true })}
              />
              {errors.email && <p className='text-red-600 font-bold'>Email is required.</p>}

              <textarea
                className='border-[1px] placeholder:p-3 my-[12px] p-[5px] text-sm font-semibold rounded-lg h-[100px] border-gray-400'
                placeholder='Your Message'
                {...register("message", { required: true })}
              />
              {errors.message && <p className='text-red-600 font-bold'>Message is required.</p>}

              <button className='my-[12px] w-full bg-black text-white p-[5px] rounded-lg font-semibold' type="submit">
                Submit
              </button>
            </form>
          </div>
          <div className='mr-[30px]'>
            <h1 className='text-md font-bold'>Contact Information</h1>
            <div className='text-sm font-semibold mt-[20px] space-y-4'>
              <div className='flex flex-row'>
                <FaPhone size={15} className='mt-[2px] text-red-400' />
                <p className='ml-[5px]'>+923217526440</p>
              </div>
              <div className='flex flex-row'>
                <MdEmail size={19} className='mt-[2px] text-red-400' />
                <p className='ml-[5px]'>shanealisa456@gmail.com</p>
              </div>
              <div className='flex flex-row'>
                <IoLocationSharp size={19} className='mt-[2px] text-green-400' />
                <p className='ml-[5px]'>House No1 Behind Post Office Model Town Lahore</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
