import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import JobCard from '../../components/JobCard';
import { useEffect, useState } from 'react';
import axios from 'axios';

const TabCAtegories = () => {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/jobs`);
      setJobs(data)
    };
    fetchDetails()
  },[])

  return (
    <div className='text-center my-12'>
      <h1 className='text-3xl lg:text-4xl font-semibold mb-2 lg:mb-4'>
        Browse Jobs By Categories
      </h1>
      <p className='max-w-xl lg:max-w-2xl mx-auto'>
        Three categories available for the time being. The are Web Development,
        Graphics Design and Digital Marketing. Browse them by clicking on the
        table below
      </p>
      <div className=' mt-4 lg:mt-8'>
        <Tabs>
          <TabList>
            <Tab>Web Development</Tab>
            <Tab>Graphics Design</Tab>
            <Tab>Digital Marketing</Tab>
          </TabList>

          <TabPanel>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  justify-center items-center gap-x-4 w-3/4 mx-auto md:w-full'>
              {jobs
                .filter((j) => j.category === 'Web Development')
                .map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  justify-center items-center gap-x-4 w-3/4 mx-auto md:w-full'>
              {jobs
                .filter(
                  (j) =>
                    j.category === 'UI/UX Design' ||
                    j.category === 'Graphics Design'
                )
                .map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  justify-center items-center gap-x-4 w-3/4 mx-auto md:w-full'>
              {jobs
                .filter((j) => j.category === 'Digital Marketing')
                .map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}
export default TabCAtegories