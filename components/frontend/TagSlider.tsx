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
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../lib/store";
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
import { Skeleton } from "@/components/ui/skeleton"

const TagSlider = () => {
  const router = useRouter();
  const { data: tags, isLoading: isTagLoading } = useGetTagQuery();
  const filter = useSelector((state: RootState) => state.filter.filter);
  const dispatch = useDispatch();
  if (isTagLoading)
    return (

        <div className="w-full mt-10  gap-x-5 flex">
       <Skeleton className="w-full h-full bg-slate-200 min-h-[7vh] dark:bg-slate-800"/>
       <Skeleton className="w-full max-sm:hidden h-full bg-slate-200 min-h-[7vh] dark:bg-slate-800"/>
       <Skeleton className="w-full max-sm:hidden h-full bg-slate-200 min-h-[7vh] dark:bg-slate-800"/>
       <Skeleton className="w-full max-sm:hidden h-full bg-slate-200 min-h-[7vh] dark:bg-slate-800"/>
       <Skeleton className="w-full max-sm:hidden h-full bg-slate-200 min-h-[7vh] dark:bg-slate-800"/>
      </div>

    );
  const handleTagClick = (isSelected: boolean, id: string) => {
    if (isSelected) {
      // Remove the tag if it is already selected
      dispatch(
        updateFilterData({
          ...filter,
          tag: filter.tag.filter((tagId) => tagId !== id),
        })
      );
      router.push("/products");
    } else {
      // Add the tag if it is not selected
      dispatch(
        updateFilterData({
          ...filter,
          tag: [...filter.tag, id],
        })
      );
      router.push("/products");
    }
  };

  return (
    <div className="my-2 w-full ">
      <div className="flex item-center">
        <TitleComponent
          className="my-5 flex justify-between w-full !px-0 items-center"
          title="Tags"
          link=""
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">view all</Button>
          </DialogTrigger>
          <DialogContent className="lg:min-w-[70vw] border-none  md:min-w-[90vw] max-sm:w-[100%] overflow-y-scroll max-h-[70vh] max-sm:max-h-[80vh]">
            <DialogHeader>Tags</DialogHeader>
            <div className="flex flex-wrap gap-4">
            {tags?.map((item: any, index: number) => {
              const isSelected = filter.tag.includes(item.id);

              return (
                <div key={index} className="bg-slate-100 dark:bg-slate-800 rounded-md p-2 hover:bg-blue-500">
                    <span
                      onClick={() => handleTagClick(isSelected, item?.id)}
                      className="flex  cursor-pointer max-sm:truncate justify-center items-center text-center"
                    >
                      {item.name}
                    </span>
               
                </div>
              );
            })}
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full group relative "
      >
        <CarouselContent className="">
          {tags?.map((item: any, index: number) => {
            const isSelected = filter.tag.includes(item.id);

            return (
              <CarouselItem
                key={index}
                className="md:basis-1/2 h-full lg:basis-1/4 basis-1/2"
              >
                <div className="p-1">
                  <Card className="border-none bg-slate-200 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer transition-all duration-500 ease-in-out">
                    <CardContent className="flex items-center justify-center p-4 gap-x-4">
                      <span
                        onClick={() => handleTagClick(isSelected, item?.id)}
                        className="flex cursor-pointer  max-sm:truncate justify-center items-center text-center"
                      >
                        {item.name}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="opacity-0 group-hover:opacity-100 absolute -left-3 top-8 max-sm:hidden" />
        <CarouselNext className="opacity-0 group-hover:opacity-100 absolute -right-3 top-8 max-sm:hidden " />
      </Carousel>
    </div>
  );
};

export default TagSlider;
