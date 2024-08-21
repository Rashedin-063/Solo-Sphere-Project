import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import JobCard from '../../components/JobCard';

const TabCAtegories = () => {
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
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3  justify-center items-center gap-x-4'>
              <JobCard />
              <JobCard />
              <JobCard />
            </div>
          </TabPanel>
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel>
          <TabPanel>
            <h2>Any content 3</h2>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}
export default TabCAtegories