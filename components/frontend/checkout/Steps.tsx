"use client"
import React from "react";
import ContainerBox from '@/components/frontend/ContainerBox';
import {CircleCheck} from "lucide-react"
const Steps = ({steps}:{steps:string[]}) => {
  console.log(steps)
  return <ContainerBox>
     <h2>Steps</h2>
     <ol className="items-center flex w-full text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
           {steps?.map((item:string,index:number)=>{
             return<li key={index} className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
             <h2 className="items-center flex justify-center gap-x-2">
               <CircleCheck/>
               {item}
             </h2>
           </li>
           })}
           
          </ol>
  </ContainerBox>;
};

export default Steps;
