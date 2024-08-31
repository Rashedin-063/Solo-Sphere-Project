import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';

const UpdateJob = () => {
   
  const navigate = useNavigate();
  const { user } = useAuth();
  const job = useLoaderData();
  const axiosSecure = useAxiosSecure()
  const queryClient = useQueryClient();
  
  const {
    _id,
    job_title,
    category,
    description,
    deadline,
    max_price,
    min_price,
    buyer,
  } = job;

   const [startDate, setStartDate] = useState(
     deadline ? new Date(deadline) : new Date()
   );

  // update data using tanstack query
  const { mutateAsync } = useMutation({
    mutationFn: async ({ jobData, id }) => {
  
      const { data } = await axiosSecure.put(`/job/${_id}`, jobData);
      return data;
    },
      onSuccess: (data) => {
        if (data.modifiedCount > 0) {
          toast.success('Job data updated successfully');

          // refetching UI
          queryClient.invalidateQueries(['job']);

          navigate('/myPostedJobs');
        }
      },
      onError: (error) => {
        toast.error(error.message);
      },   
  }
)

  const handleUpdateForm = async (e) => {
    e.preventDefault();
    const form = e.target;
    const job_title = form.job_title.value;
    const email = form.email.value;
    const deadline = startDate;
    const category = form.category.value;
    const min_price = parseFloat(form.min_price.value);
    const max_price = parseFloat(form.max_price.value);
    const description = form.description.value;

    const jobData = {
      job_title,
      category,
      deadline,
      description,
      min_price,
      max_price,

      buyer: {
        email,
        name: user?.displayName,
        photo: user?.photoURL,
      },
    };

    await mutateAsync({jobData})

    // try {
    //   const { data } = await axios.put(
    //     `${import.meta.env.VITE_API_URL}/job/${_id}`,
    //     jobData
    //   );

    //   if (data.modifiedCount > 0) {
    //     toast.success('Job data updated successfully');
    //     navigate('/myPostedJobs')
    //   }
    // } catch (error) {
    //   toast.error(error.message);
    // }
  };

  return (
    <div className='w-11/12 lg:w-3/4 mx-auto my-12'>
      <section className=' p-4 md:p-6 mx-auto bg-white rounded-md shadow-md '>
        <h2 className='text-lg font-semibold text-gray-700 capitalize '>
          Update a Job
        </h2>

        <form onSubmit={handleUpdateForm}>
          <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
            {/* job title */}
            <div>
              <label className='text-gray-700 ' htmlFor='job_title'>
                Job Title
              </label>
              <input
                id='job_title'
                name='job_title'
                type='text'
                defaultValue={job_title}
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>
            {/* buyer email */}
            <div>
              <label className='text-gray-700 ' htmlFor='emailAddress'>
                Email Address
              </label>
              <input
                id='emailAddress'
                type='email'
                name='email'
                defaultValue={buyer?.email}
                disabled
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>
            <div className='flex flex-col gap-2 '>
              <label className='text-gray-700'>Deadline</label>

              {/* Date picker input field */}
              {/* {new Date(deadline).toLocaleDateString()} */}
              <DatePicker
                className='border p-2 rounded-md'
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>

            <div className='flex flex-col gap-2 '>
              <label className='text-gray-700 ' htmlFor='category'>
                Category
              </label>
              <select
                name='category'
                id='category'
                defaultValue={category}
                className='border p-2 rounded-md'
              >
                <option value='Web Development'>Web Development</option>
                <option value='Graphics Design'>Graphics Design</option>
                <option value='Digital Marketing'>Digital Marketing</option>
              </select>
            </div>
            <div>
              <label className='text-gray-700 ' htmlFor='min_price'>
                Minimum Price
              </label>
              <input
                id='min_price'
                name='min_price'
                type='number'
                defaultValue={`${min_price}`}
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>

            <div>
              <label className='text-gray-700 ' htmlFor='max_price'>
                Maximum Price
              </label>
              <input
                id='max_price'
                name='max_price'
                type='number'
                defaultValue={max_price}
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>
          </div>
          <div className='flex flex-col gap-2 mt-4'>
            <label className='text-gray-700 ' htmlFor='description'>
              Description
            </label>
            <textarea
              defaultValue={description}
              className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              name='description'
              id='description'
              cols='30'
            ></textarea>
          </div>
          <div className='flex justify-end mt-6'>
            <button className='px-8 py-2.5 leading-5 text-white transition-colors duration-300 htmlForm bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'>
              Save
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default UpdateJob;
