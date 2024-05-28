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
import { useGetBrandQuery } from "../../lib/features/brandapi";
import Loading from "../Loading";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../lib/store";
import { updateFilterData } from "../../lib/features/filterSlice";
import AllBrands from "./AllBrands";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Skeleton } from "@/components/ui/skeleton"
const BrandSlider = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.filter.filter);
  const router = useRouter();
  const handleBrand = (id: string) => {
    dispatch(updateFilterData({ ...filter, brand: id }));
    router.push("/products");
  };
  const { data: brands, isLoading } = useGetBrandQuery();
  if (isLoading) {
    return (
      <div className="w-full max-sm:px-4 mt-10 gap-x-5 h-full flex  max-sm:min-h-[11vh]">
       <Skeleton className="w-full h-full bg-slate-200 min-h-[10vh] dark:bg-slate-800"/>
       <Skeleton className="w-full max-sm:hidden h-full bg-slate-200 min-h-[10vh] dark:bg-slate-800"/>
       <Skeleton className="w-full max-sm:hidden h-full bg-slate-200 min-h-[10vh] dark:bg-slate-800"/>
       <Skeleton className="w-full max-sm:hidden h-full bg-slate-200 min-h-[10vh] dark:bg-slate-800"/>
       <Skeleton className="w-full max-sm:hidden h-full bg-slate-200 min-h-[10vh] dark:bg-slate-800"/>
      </div>
    );
  }

  return (
    <ContainerBox className="my-2 w-full overflow-hidden ">
      <div className=" items-center w-full flex  justify-between container-fluid md:container lg:container">
        <TitleComponent
          className="my-5 flex justify-between w-full !px-0 items-center"
          title="Brand"
          link=""
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">view all</Button>
          </DialogTrigger>
          <DialogContent className="lg:min-w-[70vw] border-none  md:min-w-[90vw] max-sm:w-[100%] overflow-y-scroll max-h-[70vh] max-sm:max-h-[80vh]">
            <DialogHeader>Brands</DialogHeader>
            <AllBrands />
          </DialogContent>
        </Dialog>
      </div>
      {brands && brands?.length > 0 && (
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full group relative container-fluid md:container lg:container"
        >
          <CarouselContent className="">
            {brands?.map((item: any, index: number) => (
              <CarouselItem
                onClick={() => handleBrand(item?.id)}
                key={index}
                className="md:basis-1/2 h-full lg:basis-1/5 basis-1/2"
              >
                <div className="p-1">
                  <Card
                    className={`${
                      filter.brand == item.id
                        ? "border border-blue-500"
                        : "border-none"
                    } bg-slate-200 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer transition-all duration-500 ease-in-out`}
                  >
                    <CardContent className="flex items-center justify-start p-4 gap-x-4">
                      <Image
                      blurDataURL={item.imgUrl?item.imgUrl:"/demo.png"} loading="lazy"
                        width={1000}
                        height={1000}
                        className="w-14 h-14 object-cover rounded-md"
                        src={item?.imgUrl ? item.imgUrl : "/demo.png"}
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
