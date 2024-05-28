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
import { RootState } from "../../lib/store";
import { useSelector, useDispatch } from "react-redux";
import { updateFilterData } from "../../lib/features/filterSlice";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AllCategory from "./AllCategory";
import { Skeleton } from "@/components/ui/skeleton"
const CategoriesSlider = () => {
  const { data: categories, isLoading } = useGetCategoryQuery();
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.filter.filter);
  const router = useRouter();
<Skeleton className="w-full bg-slate-200 dark:bg-slate-800 lg:min-h-[70vh] max-sm:min-h-[300px]"/>
  if (isLoading) {
    return (
      <div className="w-full max-sm:px-4 mt-10 gap-x-5 h-full flex  min-h-[300px]">
       <Skeleton className="w-full h-full bg-slate-200 min-h-[10vh] dark:bg-slate-800"/>
       <Skeleton className="w-full max-sm:hidden h-full bg-slate-200 min-h-[10vh] dark:bg-slate-800"/>
       <Skeleton className="w-full max-sm:hidden h-full bg-slate-200 min-h-[10vh] dark:bg-slate-800"/>
       <Skeleton className="w-full max-sm:hidden h-full bg-slate-200 min-h-[10vh] dark:bg-slate-800"/>
       <Skeleton className="w-full max-sm:hidden h-full bg-slate-200 min-h-[10vh] dark:bg-slate-800"/>
      </div>
    );
  }
  const handleCategory = (id: string) => {
    dispatch(updateFilterData({ ...filter, category: id }));
    router.push("/products");
  };

  return (
    <ContainerBox className="my-5">
      <div className=" items-center w-full flex justify-between container-fluid md:container lg:container ">
        <TitleComponent
          className="flex justify-between !px-0  items-center my-2 w-full"
          title="Category"
          link=""
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">view all</Button>
          </DialogTrigger>
          <DialogContent className="lg:min-w-[70vw] border-none  md:min-w-[90vw] max-sm:w-[100%] overflow-y-scroll max-h-[70vh] max-sm:max-h-[80vh]">
            <DialogHeader>Categorys</DialogHeader>
            <AllCategory />
          </DialogContent>
        </Dialog>
      </div>
      {categories && categories?.length > 0 && (
        <Carousel
          opts={{ align: "start" }}
          className="w-full group relative container-fluid md:container lg:container"
        >
          <CarouselContent className="">
            {categories.map((item: any, index: number) => (
              <CarouselItem
                key={index}
                onClick={() => handleCategory(item?.id)}
                className={`md:basis-1/1 h-full lg:basis-1/5 basis-1/2 `}
              >
                <div className="p-1">
                  <Card
                    className={` ${
                      filter?.category === item?.id
                        ? "border border-blue-500"
                        : "border-none"
                    } bg-slate-200 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer  transition-all duration-500 ease-in-out`}
                  >
                    <CardContent className="flex items-center justify-start p-4 gap-x-4">
                      <Image
                      blurDataURL={item?.imgUrl ? item.imgUrl : "/demo.png"} loading="lazy"
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
          <CarouselPrevious className="opacity-0 group-hover:opacity-100 left-5 top-12 max-sm:hidden" />
          <CarouselNext className="opacity-0 group-hover:opacity-100 right-5 top-12 max-sm:hidden" />
        </Carousel>
      )}
    </ContainerBox>
  );
};

export default CategoriesSlider;
