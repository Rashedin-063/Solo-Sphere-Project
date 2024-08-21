/* eslint-disable react/prop-types */

const JobCard = ({ job }) => {
 
  const { _id, job_title, category, description, deadline, max_price, min_price, buyer_email } = job;
  
  return (
    <div className='w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-md hover:scale-[1.05] transition-all mt-8 space-y-4 lg:space-y-8'>
      <div className='flex items-center justify-between'>
        <span className='text-xs text-gray-800 '>Deadline: {deadline}</span>
        <span
          className={`px-3 py-1 text-[8px]  rounded-full ${
            category === 'Web Development' &&
            'text-blue-800 uppercase bg-blue-200'
          } ${
            category === 'UI/UX Design' && 'text-red-800 uppercase bg-red-200'
          } ${
            category === 'Digital Marketing' && 'text-green-800 uppercase bg-green-200'
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
    </div>
  );
}

export default JobCard
