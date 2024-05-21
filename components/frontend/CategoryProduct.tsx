"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { useGetCatProductQuery } from "../../lib/features/productapi";
import Loading from "../Loading";
type idType = {
  id: string;
};
const CategoryProduct = ({ id }: idType) => {
  const { data: products, isLoading, isError } = useGetCatProductQuery(id);
  if (isLoading) {
    return (
      <div className="w-full h-full mt-4">
        <Loading className="mx-auto my-auto" />
      </div>
    );
  }
  return (
    <div className="w-full">
      <h2 className="text-xl my-5">Related Product</h2>
      {products?.length ? (
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full group relative "
        >
          <CarouselContent className="">
            {products?.map((item: any, index: number) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2 h-full lg:basis-1/4 basis-1/2"
              >
                <div className="p-1">
                  <Card className="border-none bg-slate-200 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer transition-all duration-500 ease-in-out">
                    <CardContent className="flex items-center justify-center p-4 gap-x-4">
                      <Link href={`/products/${item.id}`}>
                        {" "}
                        <Image
                          width={1000}
                          height={1000}
                          className="w-full h-[150px] object-cover"
                          src={item?.imgUrl[0]}
                          alt={item.name}
                        />
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="opacity-0 group-hover:opacity-100 absolute -left-3 top-24 max-sm:hidden" />
          <CarouselNext className="opacity-0 group-hover:opacity-100 absolute -right-3 top-24 max-sm:hidden " />
        </Carousel>
      ) : (
        <p>No Related Product</p>
      )}
    </div>
  );
};

export default CategoryProduct;
