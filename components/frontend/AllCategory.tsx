"use client"
import React from "react";
import  ContainerBox  from './ContainerBox';
import {useGetCategoryQuery} from "../../lib/features/categoryapi"
import { Card } from '@/components/ui/card';
import MasonryContainer from './MasonaryContainer';
import Image from "next/image"
import { useSelector, useDispatch } from "react-redux";
import { updateFilterData } from "../../lib/features/filterSlice";
import {useRouter} from "next/navigation"
import { RootState } from '../../lib/store';
const AllCategory = () => {
  const filter = useSelector((state: RootState) => state.filter.filter);
  const handleCategory = (id: string) => {
    dispatch(updateFilterData({ ...filter, category: id }));
    router.push("/products");
  };
const dispatch = useDispatch()
const router = useRouter() 
  const {data:categories,isLoading}=useGetCategoryQuery()
  return <ContainerBox>
   <MasonryContainer>
   {categories?.map((item,index)=>{
    return<Card key={index} className=" rounded-none">
      <Image onClick={() => handleCategory(item?.id)} width={1000} height={1000} className="p-4 cursor-pointer" src={item.imgUrl} alt={item.name}/>
      <div className="px-4 py-2 border-t-2">
      <h5 onClick={() => handleCategory(item?.id)} className="text-slate-900 dark:slate-100 cursor-pointer">{item?.name}</h5>
      </div>
    </Card>
   })}
   </MasonryContainer>
  </ContainerBox>;
};

export default AllCategory;
