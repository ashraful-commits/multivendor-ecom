'use client';
import React from 'react';

import Image from 'next/image';
import ContainerBox from './ContainerBox';
import TitleComponent from './TitleComponent';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {useGetBrandQuery}from "../../lib/features/brandapi"
import Loading from "../Loading"
const BrandSlider = () => {

const {data:brands,isLoading} = useGetBrandQuery()
if (isLoading) return <div className="flex justify-center w-full items-center min-h-[200px] "><Loading className="mx-auto my-auto"/></div>;
   
  return (
    <ContainerBox className="my-2 w-full overflow-hidden ">
      <TitleComponent
        className="flex justify-between items-center my-2"
        title="Brand"
        link="/brands"
      />
      {brands&&brands?.length > 0 && (
        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-full group relative container-fluid md:container lg:container"
        >
          <CarouselContent className="">
            {brands?.map((item: any, index: number) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2 h-full lg:basis-1/5 basis-1/2"
              >
                <div className="p-1">
                  <Card className="border-none bg-slate-200 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer transition-all duration-500 ease-in-out">
                    <CardContent className="flex items-center justify-start p-4 gap-x-4">
                      <Image
                        width={1000}
                        height={1000}
                        className="w-14 h-14 object-cover rounded-md"
                        src={item?.imgUrl ? item.imgUrl : '/demo.png'}
                        alt={item?.name}
                      />
                      <h2 className="max-sm:truncate">{item.name}</h2>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 ease-in-out absolute left-5 top-12 max-sm:hidden" />
          <CarouselNext className="opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 ease-in-out absolute right-5 top-12 max-sm:hidden " />
        </Carousel>
      )}
    </ContainerBox>
  );
};

export default BrandSlider;
