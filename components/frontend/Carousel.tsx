import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import Image from 'next/image';
import 'swiper/css/zoom';
// import required modules
import { Mousewheel,Zoom ,Autoplay, EffectFade,Pagination } from 'swiper/modules';
import {bannerData} from "../../typescript"
export default function Carousel({ data }:{data:bannerData[]}) {
  return (
    <div className="max-sm:h-[25vh] h-[70vh] w-full container-fluid md:container lg:container px-3  mx-auto">
      <Swiper
        direction={'vertical'}
        zoom={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
        }}
        slidesPerView={1}
        mousewheel={true}
        spaceBetween={30}
        centeredSlides={true}
        effect={'fade'}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay,Zoom, EffectFade, Mousewheel,Pagination]}
        className="mySwiper"
      >
        {data?.map((item:any, index:number) => (
          <SwiperSlide key={index}>
            <Image placeholder="blur" blurDataURL={item.imgUrl} width={1000} height={1000} className="h-full w-full" src={item.imgUrl} alt={item.title} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
