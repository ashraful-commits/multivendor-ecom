import React from "react";
import ContainerBox from './../../../components/frontend/ContainerBox';
import  Link  from 'next/link';
import { Card } from '@/components/ui/card';
import {MoveLeft} from "lucide-react"
const SuccessPage = () => {
  return <ContainerBox className="flex min-h-[50vh] justify-center items-center">
          <Card className="p-10 border-none"><h2>Order Successful!</h2>
          <Link className="border transition-all duration-500 ease-in-out flex gap-x-4 items-center block px-5 py-2 mt-5 hover:bg-blue-500 hover:text-white" href="/"><MoveLeft />Back to Home page</Link></Card>
  </ContainerBox>;
};

export default SuccessPage;
