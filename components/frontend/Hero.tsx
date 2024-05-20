"use client"
import React,{useEffect,useState} from 'react'
import Carousel from './Carousel';

import {useGetBannerQuery}from "../../lib/features/bannerapi"
import Loading from './../Loading';
const Hero = () => {
  const {data,isLoading} = useGetBannerQuery()
  if (isLoading) return <div className="flex justify-center w-full items-center min-h-[700px]"><Loading className="mx-auto my-auto"/></div>;
   
  return (
    <div className="w-full min-md:container mt-5">
      <Carousel data={data||[]}/>
    </div>
  )
}

export default Hero
