"use client"
import React from "react";
import {useSelector} from "react-redux"
import ContainerBox from '@/components/frontend/ContainerBox';

import {CircleCheck} from "lucide-react"
import { RootState } from '../../../lib/store';
const Steps = ({steps}:{steps:string[]}) => {
          const stepOfStep = useSelector((state:RootState)=>state.checkout.currentStep)
  return <ContainerBox>
     <h2 className="text-blue-500 my-5">Checkout</h2>
     <ol className="items-center flex w-full text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
  {steps?.map((item: string, index: number) => {
    const isLastItem = index === steps.length - 1;
    return (
      <li
        key={index}
        className={`flex items-center ${stepOfStep===index+1 && "text-blue-500"} text-primary-700 ${!isLastItem && "after:border-1 after:mx-1 after:hidden after:h-1 after:w-[50%] max-sm:after:w-[5%] after:border-b after:border-gray-200 dark:after:border-gray-700 sm:after:inline-block sm:after:content-['']"} md:w-full xl:after:mx-2`}
      >
        <h2 className="items-center flex max-sm:text-[10px] justify-center gap-x-2">
          <CircleCheck />
          {item}
        </h2>
      </li>
    );
  })}
</ol>

  </ContainerBox>;
};

export default Steps;
