"use client"
import React from "react";
import  ContainerBox  from './ContainerBox';
import {useGetCategoryQuery} from "../../lib/features/categoryapi"
import { Card } from '@/components/ui/card';
import MasonryContainer from './MasonaryContainer';
import Image from "next/image"
const AllCategory = () => {
  const {data:categories,isLoading}=useGetCategoryQuery()
  return <ContainerBox>
   <MasonryContainer>
   {categories?.map((item,index)=>{
    return<Card key={index}>
      <Image width={1000} height={1000} src={item.imgUrl} alt={item.name}/>
    </Card>
   })}
   </MasonryContainer>
  </ContainerBox>;
};

export default AllCategory;
