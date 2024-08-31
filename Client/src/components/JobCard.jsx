/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
 
  const { _id, job_title, category, description, deadline, max_price, min_price } = job;
  
  return (
    <Link
      to={`job/${_id}`}
      className='w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-md hover:scale-[1.05] transition-all mt-8 space-y-4 lg:space-y-8'
    >
      <div className='flex items-center justify-between'>
        <span className='text-xs text-gray-800 '>
          Deadline: {new Date(deadline).toLocaleDateString()}
        </span>
        <span
          className={`px-3 py-1 text-[10px]  rounded-full font-semibold ${
            category === 'Web Development' &&
            'text-blue-600 uppercase bg-blue-100'
          } ${
            category === 'UI/UX Design' ||
            category === 'Graphics Design' ?
              'text-red-600 uppercase bg-red-100' : ''
          } ${
            category === 'Digital Marketing' &&
            'text-green-600 uppercase bg-green-100'
          }`}
        >
          {category}
        </span>
      </div>

      <div>
        <h1 className='mt-2 text-lg font-semibold text-gray-800 '>
          {job_title}
        </h1>

        <p title={description} className='mt-2 text-sm text-gray-600 '>
          {description.slice(0, 70)}....
        </p>
        <p className='mt-2 text-sm font-bold text-gray-600 '>
          Range: ${min_price} - ${max_price}
        </p>
      </div>
    </Link>
  );
}

export default JobCard
