"use client";
import React from "react";
import Image from "next/image";
import ContainerBox from "./ContainerBox";
import TitleComponent from "./TitleComponent";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGetCategoryQuery } from "../../lib/features/categoryapi";
import Loading from "./../Loading";

const CategoriesSlider = () => {
  const { data: categories, isLoading } = useGetCategoryQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center container min-w-screen items-center sm:min-h-[200px] lg:min-h-[200px] md:min-h-[200px]">
        <Loading className="mx-auto my-auto" />
      </div>
    );
  }

  return (
    <ContainerBox className="my-5">
      <TitleComponent
        className="flex justify-between items-center my-2 w-full"
        title="Category"
        link="/categories"
      />

      {categories && categories?.length > 0 && (
        <Carousel
          opts={{ align: "start" }}
          className="w-full group relative container-fluid md:container lg:container"
        >
          <CarouselContent className="">
            {categories.map((item: any, index: number) => (
              <CarouselItem
                key={index}
                className="md:basis-1/1 h-full lg:basis-1/5 basis-1/2"
              >
                <div className="p-1">
                  <Card className="border-none  bg-slate-200 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer  transition-all duration-500 ease-in-out">
                    <CardContent className="flex items-center justify-start p-4 gap-x-4">
                      <Image
                        width={1000}
                        height={1000}
                        className="w-14 h-14 object-cover rounded-md"
                        src={item?.imgUrl ? item.imgUrl : "/demo.png"}
                        alt={item?.name}
                      />
                      <h2>{item.name}</h2>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="opacity-0 group-hover:opacity-100 left-5 top-12 max-sm:hidden" />
          <CarouselNext className="opacity-0 group-hover:opacity-100 right-5 top-12 max-sm:hidden" />
        </Carousel>
      )}
    </ContainerBox>
  );
};

export default CategoriesSlider;
