"use client"
import React from "react";
import  ContainerBox  from './ContainerBox';
import {useGetBrandQuery} from "../../lib/features/brandapi"
import MasonryContainer from './MasonaryContainer';
import { Card } from '@/components/ui/card';
import Image from "next/image"
const AllBrands = () => {
  const {data:brands,isLoading}=useGetBrandQuery()
  return <ContainerBox>
   <MasonryContainer>
   {brands?.map((item,index)=>{
    return<Card key={index}>
      <Image width={1000} height={1000} src={item.imgUrl} alt={item.name}/>
    </Card>
   })}
   </MasonryContainer>
  </ContainerBox>;
};

export default AllBrands;
