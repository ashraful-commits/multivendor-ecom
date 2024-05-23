import React from "react";
import ContainerBox from './../../../components/frontend/ContainerBox';
import  Link  from 'next/link';
import { Card } from '@/components/ui/card';
import {MoveLeft,BadgeCheck} from "lucide-react"
const SuccessPage = () => {
  return <ContainerBox className="flex relative min-h-[50vh] flex-col justify-center items-center">
          <div  className="w-20 h-20 -mb-10 relative z-[999999] rounded-full flex justify-center items-center bg-slate-200 dark:bg-black shadow-xl">
          <BadgeCheck />
          </div>
          <Card className="p-10 border-none h-full text-center"><h2>Thanks you for order !</h2>
          <Link className="border transition-all duration-500 ease-in-out flex gap-x-4 items-center block px-5 py-2 mt-5 hover:bg-blue-500 hover:text-white" href="/"><MoveLeft />Back to Home page</Link></Card>
  </ContainerBox>;
};

export default SuccessPage;
