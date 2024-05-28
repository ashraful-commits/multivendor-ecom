"use client";
import React from "react";
import Image from "next/image";
import { Loader2, ShoppingCart, Plus, Eye } from "lucide-react";
import TitleComponent from "./TitleComponent";
import ContainerBox from "./ContainerBox";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TagSlider from "./TagSlider";
import Products from "./Products";
import { useGetProductQuery } from "../../lib/features/productapi";
import Loading from "../Loading";
import { ProductData } from "../../typescript";
import AllProducts from './AllProducts';
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
import MasonryContainer from './MasonaryContainer';

const MasonryGallery = ({ title }: { title?: string }) => {
  const { data: products, isLoading } = useGetProductQuery();
  if (isLoading)
    return (
      <MasonryContainer>
       <Skeleton className="w-full h-full bg-slate-200 min-h-[30vh] dark:bg-slate-800"/>
       <Skeleton className="w-full h-full bg-slate-200 min-h-[30vh] dark:bg-slate-800"/>
       <Skeleton className="w-full h-full bg-slate-200 min-h-[30vh] dark:bg-slate-800"/>
       <Skeleton className="w-full h-full bg-slate-200 min-h-[30vh] dark:bg-slate-800"/>
       <Skeleton className="w-full h-full bg-slate-200 min-h-[30vh] dark:bg-slate-800"/>
       <Skeleton className="w-full h-full bg-slate-200 min-h-[30vh] dark:bg-slate-800"/>
       <Skeleton className="w-full h-full bg-slate-200 min-h-[30vh] dark:bg-slate-800"/>
       <Skeleton className="w-full h-full bg-slate-200 min-h-[30vh] dark:bg-slate-800"/>
       <Skeleton className="w-full h-full bg-slate-200 min-h-[30vh] dark:bg-slate-800"/>
       <Skeleton className="w-full h-full bg-slate-200 min-h-[30vh] dark:bg-slate-800"/>
      </MasonryContainer>
    );
  return (
    <ContainerBox className="w-full">

      <TitleComponent
          className="my-5 !px-0  hidden max-sm:flex justify-between items-center"
          title="Products"
          link="/products"
        />
      <div className=" items-center w-full max-sm:hidden flex justify-between container-fluid md:container lg:container">
        <TitleComponent
          className="my-5 !px-0 flex justify-between items-center"
          title="Products"
          link=""
        />

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">view all</Button>
          </DialogTrigger>
          <DialogContent className="lg:min-w-[70vw] border-none  md:min-w-[95vw] max-sm:w-[100%] overflow-y-scroll max-h-[70vh] max-sm:max-h-[80vh]">
            <DialogHeader>Products</DialogHeader>
            <AllProducts/>
          </DialogContent>
        </Dialog>
      </div>
      <div className="w-full flex flex-wrap justify-between container-fluid md:container lg:container">
        <Products products={products as ProductData[]} />
      </div>
    </ContainerBox>
  );
};

export default MasonryGallery;
