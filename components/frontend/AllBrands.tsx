"use client"
import React from "react";
import  ContainerBox  from './ContainerBox';
import {useGetBrandQuery} from "../../lib/features/brandapi"
import MasonryContainer from './MasonaryContainer';
import { Card } from '@/components/ui/card';
import Image from "next/image"
import { useSelector, useDispatch } from "react-redux";
import { updateFilterData } from "../../lib/features/filterSlice";
import {useRouter} from "next/navigation"
import { RootState } from '../../lib/store';
const AllBrands = () => {
  const filter = useSelector((state: RootState) => state.filter.filter);
const dispatch = useDispatch()
const router = useRouter() 
  const handleBrand = (id: string) => {
    dispatch(updateFilterData({ ...filter, brand: id }));
    router.push("/products");
  };

  const {data:brands,isLoading }=useGetBrandQuery()
  return <ContainerBox>
   <MasonryContainer>
   {brands?.map((item,index)=>{
    return<Card key={index} className=" rounded-none">
      <Image blurDataURL={item?.imgUrl?item?.imgUrl:""} loading="lazy" onClick={() => handleBrand(item?.id)} className="cursor-pointer p-4" width={1000} height={1000} src={item?.imgUrl?item?.imgUrl:""} alt={item?.name}/>
      <div className="border-t-2 w-full px-4 py-2">
      <h5 onClick={() => handleBrand(item?.id)} className="text-slate-900 cursor-pointer  dark:slate-100">{item?.name}</h5>
      </div>
    </Card>
   })}
   </MasonryContainer>
  </ContainerBox>;
};

export default AllBrands;
