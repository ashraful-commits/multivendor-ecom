"use client";
import React from "react";
import { useGetTagQuery } from "../../lib/features/tagapi";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Loading from "../Loading";
import ContainerBox from "../frontend/ContainerBox";
import TitleComponent from "../frontend/TitleComponent";
const TagSlider = () => {
  const { data: tags, isLoading: isTagLoading } = useGetTagQuery();
  if (isTagLoading)
    return (
      <div className="flex justify-center w-full container items-center sm:min-h-[500px] md:min-h-[500px] lg:min-h-[200px]">
        <Loading className="mx-auto my-auto" />
      </div>
    );

  return (
    <div className="my-2 w-full ">
      <TitleComponent
        className="my-5 flex justify-between w-full !px-0 items-center"
        title="Tags"
        link="/tags"
      />
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full group relative "
      >
        <CarouselContent className="">
          {tags?.map((item: any, index: number) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 h-full lg:basis-1/4 basis-1/2"
            >
              <div className="p-1">
                <Card className="border-none bg-slate-200 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer transition-all duration-500 ease-in-out">
                  <CardContent className="flex items-center justify-center p-4 gap-x-4">
                    <span className="flex justify-center items-center text-center">
                      {item.name}
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="opacity-0 group-hover:opacity-100 absolute -left-3 top-8 max-sm:hidden" />
        <CarouselNext className="opacity-0 group-hover:opacity-100 absolute -right-3 top-8 max-sm:hidden " />
      </Carousel>
    </div>
  );
};

export default TagSlider;
