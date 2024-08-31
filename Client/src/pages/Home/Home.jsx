import { useLoaderData } from 'react-router-dom';
import Carousel from './Carousel';
import TabCategories from './TabCAtegories';


const Home = () => {
  const jobs = useLoaderData();
  return (
    <div>
      <Carousel />
      <TabCategories jobs={jobs} />
    </div>
  );
}
export default Home