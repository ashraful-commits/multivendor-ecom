"use client"
import React from 'react';
import Image from 'next/image';
import { Loader2, ShoppingCart, Plus, Eye } from 'lucide-react';
import TitleComponent from './TitleComponent';
import ContainerBox from './ContainerBox';
import { Button } from '@/components/ui/button';
import Link from "next/link"
import TagSlider from './TagSlider';
import Products from './Products';
import {useGetProductQuery} from "../../lib/features/productapi"
import Loading from '../Loading';
import { ProductData } from '../../typescript';

const MasonryGallery = ({ title }:{title?:string}) => {
  const {data:products,isLoading} = useGetProductQuery()
  if(isLoading) return <div className="w-full h-full"><Loading className="mx-auto my-auto"/></div>
  return (
    <ContainerBox className="w-full">
      <div className="w-full flex flex-wrap justify-between container-fluid md:container lg:container">
     
      <TagSlider/>
      </div>
      <TitleComponent
        className="my-5 flex justify-between items-center"
        title="Products"
        link="/products"
      />
      <div className="w-full flex flex-wrap justify-between container-fluid md:container lg:container">
     
      
          <Products products={products as ProductData[]}/>
      </div>
    </ContainerBox>
  );
};

export default MasonryGallery;
