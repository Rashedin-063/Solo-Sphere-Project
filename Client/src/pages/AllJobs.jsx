import { useQuery } from '@tanstack/react-query';
import JobCard from '../components/JobCard';
import axios from 'axios';
import { useLoaderData } from 'react-router-dom';
import { useEffect, useState } from 'react';

const AllJobs = () => {
  const [jobs, setJobs] = useState([])
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('')
  const [count, setCount] = useState(0)

//   const { data: jobs, isLoading, isError, error } = useQuery({
//     queryKey: ['bids', currentPage, itemsPerPage, filter],
//     queryFn: async () => {
//       const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/all-jobs?page=${currentPage}&size=${itemsPerPage}&filter=${filter}`);
//       return data;
//     },
// onError: (err) => {
//       console.error('Error fetching jobs:', err);
//     },
//   });

   useEffect(() => {
     const getData = async () => {
       const { data } = await axios(
         `${
           import.meta.env.VITE_API_URL
         }/all-jobs?page=${currentPage}&size=${itemsPerPage}&filter=${filter}`
       );
       setJobs(data);
     };
     getData();
   }, [currentPage, filter, itemsPerPage,]);

   useEffect(() => {
     const getCount = async () => {
       const { data } = await axios(
         `${
           import.meta.env.VITE_API_URL
         }/jobCount?filter=${filter}`
       );

       setCount(data.count);
     };
     getCount();
   }, [filter]);

 

  
  const jobsPerPage = Math.ceil(count / itemsPerPage);

  const pages = [...Array(jobsPerPage).keys()].map((ell) => ell + 1);

   const handleCurrentPage = (value) => {
     setCurrentPage(value);
   };

  const handlePrevBtn = () => {
  
    if (currentPage > 1) {
       setCurrentPage(currentPage - 1);
    } 
    if (currentPage === 1) {
      disabled
    }
  }
  const handleNextBtn = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1)
    }
  }
  

  // if (isLoading) {
  //   return <div className='flex items-center justify-center min-h-screen text-red-400'>Loading...</div>;
  // }

  // if (isError) {
  //   return <div className='flex items-center justify-center min-h-screen text-red-600'>Error: {error.message}</div>;
  // }
  

  return (
    <div className='container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between'>
      <div>
        <div className='flex flex-col md:flex-row justify-center items-center gap-5 '>
          <div>
            <select
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
              name='category'
              id='category'
              className='border p-4 rounded-lg'
            >
              <option value=''>Filter By Category</option>
              <option value='Web Development'>Web Development</option>
              <option value='Graphics Design'>Graphics Design</option>
              <option value='Digital Marketing'>Digital Marketing</option>
            </select>
          </div>

          <form>
            <div className='flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300'>
              <input
                className='px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
                type='text'
                name='search'
                placeholder='Enter Job Title'
                aria-label='Enter Job Title'
              />

              <button className='px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'>
                Search
              </button>
            </div>
          </form>
          <div>
            <select
              name='category'
              id='category'
              className='border p-4 rounded-md'
            >
              <option value=''>Sort By Deadline</option>
              <option value='dsc'>Descending Order</option>
              <option value='asc'>Ascending Order</option>
            </select>
          </div>
          <button className='btn'>Reset</button>
        </div>
        {/* mapping the all jobs data */}
        <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {jobs?.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      </div>
      {/* pagination section */}
      <div className='flex justify-center mt-12'>
        {/* previous btn */}
        <button
          onClick={handlePrevBtn}
          disabled={currentPage === 1}
          className={`px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500  hover:text-white`}
        >
          <div className='flex items-center -mx-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6 mx-1 rtl:-scale-x-100'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M7 16l-4-4m0 0l4-4m-4 4h18'
              />
            </svg>

            <span className='mx-1'>previous</span>
          </div>
        </button>

        {/* dynamic btn */}
        {pages.map((btnNum) => (
          <button
            key={btnNum}
            onClick={() => handleCurrentPage(btnNum)}
            className={`hidde px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-blue-800  hover:text-white ${
              currentPage === btnNum ? 'bg-blue-600 text-white' : ''
            } `}
          >
            {btnNum}
          </button>
        ))}

        {/* next btn */}
        <button
          onClick={handleNextBtn}
          disabled={currentPage === pages.length}
          className='px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500'
        >
          <div className='flex items-center -mx-1'>
            <span className='mx-1'>Next</span>

            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6 mx-1 rtl:-scale-x-100'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M17 8l4 4m0 0l-4 4m4-4H3'
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default AllJobs;
