// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import './styles.css';

// import required modules
import {Autoplay, Pagination, Navigation } from 'swiper/modules';
import Slide from '../../components/Slide';

import banner1 from '../../assets/images/carousel1.jpg'
import banner2 from '../../assets/images/carousel2.jpg';
import banner3 from '../../assets/images/carousel3.jpg';

export default function Carousel() {
  return (
    <div className='mx-4 my-4 lg:my-6'>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className='mySwiper'
      >
        <SwiperSlide>
          <Slide
            image={banner1}
            text='Get Your Web Development Projects Done in Minutes'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={banner2}
            text='Get Your Graphics Design Projects Done in Minutes'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={banner3}
            text='Get Your Digital Marketing Campaigns Done in Minutes'
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
