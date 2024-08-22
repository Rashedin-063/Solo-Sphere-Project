import { useLoaderData } from "react-router-dom"
import useAuth from "../hooks/useAuth";
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


const JobDetails = () => {
  const job = useLoaderData();
  const { user } = useAuth();
  const [startDate, setStartDate] = useState(new Date());

   const {
     _id,
     job_title,
     category,
     description,
     deadline,
     max_price,
     min_price,
     buyer_email,
   } = job;
  
  const handleBidForm = async (e) => {
    e.preventDefault();
    const form = e.target;
    const jobId = _id;
    const price = parseFloat(form.price.value);
    if (price < min_price) {
      return toast.error('Offer cannot be lower than minimum price')
    } else if (price > max_price) {
      return toast.error('Offer cannot be higher than maximum price')
    }
    const comment = form.comment.value;
    const deadline = startDate;
    const email = user?.email;
    if (user?.email === buyer_email) {
      return toast.warn('Action not permitted')
    } 
    // const buyer_email = buyer_email;
    const status = 'Pending';

    const bidData = {
      jobId, price, comment, deadline, job_title, category, email, status, buyer_email
    }
    

try {
  const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/bids`, bidData);
  console.log(data)

  if (data.insertedId) {
    toast.success('Your bid is placed successfully')
    form.reset()
  }  
} catch (error) {
  console.log(error.message)
  
}
  
    
    

  }
  
  return (
    <div className='flex flex-col md:flex-row justify-around gap-5  items-center min-h-[calc(100vh-306px)] md:max-w-screen-xl mx-auto '>
      {/* Job Details */}
      <div className='flex-1  px-4 py-7 bg-white rounded-md shadow-md md:min-h-[350px]'>
        <div className='flex items-center justify-between'>
          <span className='text-sm text-gray-800 '>Deadline: {deadline}</span>
          <span className='px-4 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full '>
            {category}
          </span>
        </div>

        <div>
          <h1 className='mt-2 text-3xl font-semibold text-gray-800 '>
            {job_title}
          </h1>

          <p className='mt-2 text-lg text-gray-600 '>{description}</p>
          <p className='mt-6 text-sm font-bold text-gray-600 '>
            Buyer Details:{' '}
          </p>
          <div className='flex items-center gap-5'>
            <div>
              <p className='mt-2 text-sm  text-gray-600 '>Name: Jhankar Vai.</p>
              <p className='mt-2 text-sm  text-gray-600 '>
                Email: {buyer_email}
              </p>
            </div>
            <div className='rounded-full object-cover overflow-hidden w-14 h-14'>
              <img src='' alt='' />
            </div>
          </div>
          <p className='mt-6 text-lg font-bold text-gray-600 '>
            Range: ${min_price} - ${max_price}
          </p>
        </div>
      </div>
      {/* Place A Bid Form */}
      <section className='p-6 w-full  bg-white rounded-md shadow-md flex-1 md:min-h-[350px]'>
        <h2 className='text-lg font-semibold text-gray-700 capitalize '>
          Place A Bid
        </h2>

        <form onSubmit={handleBidForm}>
          <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
            <div>
              <label className='text-gray-700 ' htmlFor='price'>
                Price
              </label>
              <input
                id='price'
                type='text'
                name='price'
                placeholder={`$${min_price} - $${max_price}`}
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>
            {/* email */}
            <div>
              <label className='text-gray-700 ' htmlFor='emailAddress'>
                Email Address
              </label>
              <input
                id='emailAddress'
                type='email'
                name='email'
                defaultValue={user?.email}
                disabled
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>
            {/* comment */}
            <div>
              <label className='text-gray-700 ' htmlFor='comment'>
                Comment
              </label>
              <input
                id='comment'
                name='comment'
                type='text'
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>
            {/* deadline */}
            <div className='flex flex-col gap-2 '>
              <label className='text-gray-700'>Deadline</label>

              {/* Date Picker Input Field */}
              <DatePicker
                className="border p-2 rounded-md"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
          </div>

          <div className='flex justify-end mt-6'>
            <button
              type='submit'
              className='px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'
            >
              Place Bid
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default JobDetails
