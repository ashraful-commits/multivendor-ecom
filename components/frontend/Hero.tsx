"use client"
import React,{useEffect,useState} from 'react'
import Carousel from './Carousel';
import {useGetBannerQuery}from "../../lib/features/bannerapi"
import Loading from './../Loading';
import { Skeleton } from "@/components/ui/skeleton"

const Hero = () => {
  const {data,isLoading} = useGetBannerQuery()
  if (isLoading) return <div className="flex max-sm:px-4 mt-5 justify-center w-full items-center min-h-[300px]">
    <Skeleton className="w-full bg-slate-200 dark:bg-slate-800  md:min-h-[50vh]  lg:min-h-[70vh] max-sm:min-h-[300px]"/>
  </div>;
   
  return (
    <div className="w-full min-md:container container-fluid">
      <Carousel data={data||[]}/>
    </div>
  )
}

export default Hero
