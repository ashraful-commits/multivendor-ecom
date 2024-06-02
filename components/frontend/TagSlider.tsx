"use client";
import React, { useState, useEffect } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
import ContainerBox from "./ContainerBox";
import { useGetFilterProductQuery } from "@/lib/features/productapi";
import MasonryContainer from "./MasonaryContainer";
import ReactMagnify from "./ReactMagnify";
import { ShoppingCart } from "lucide-react";
import { Check } from "lucide-react";
import { Plus } from "lucide-react";
import { Heart } from "lucide-react";
import { useAddNewCartMutation, useGetCartQuery } from "@/lib/features/cartapi";
import useSessionData from "./../../hooks/useSessionData";
import {
  useAddNewFavoriteMutation,
  useGetFavoriteQuery,
} from "@/lib/features/favoriteapi";
import { toast } from "react-hot-toast";
import { SessionData } from '../../typescript';
const TagSlider = () => {
  const router = useRouter();
  const [quantity, setQuantity] = useState<number>(1);
  const session = useSessionData() as SessionData;
  const { data: tags, isLoading: isTagLoading } = useGetTagQuery();
  const filter = useSelector((state: RootState) => state.filter.filter);
  const dispatch = useDispatch();

  const [
    addNewCart,
    { data: addCartData, isSuccess, isLoading: isAddLoading, isError },
  ] = useAddNewCartMutation();
  const [
    addNewFavorite,
    {
      data: addFavData,
      isSuccess: isFaSuccess,
      isLoading: isFaLoading,
      isError: isFaError,
    },
  ] = useAddNewFavoriteMutation();

  const {
    data: favorites,
    refetch: isFavRefetch,
    isLoading: isGetFavLoading,
    isError: isGetFavError,
  } = useGetFavoriteQuery(session?.user?.id as string);
  const {
    data: carts,
    isLoading: isGetLoading,
    isError: isGetError,
    refetch: cartRefetch,
  } = useGetCartQuery(session?.user?.id as string);

  useEffect(() => {
    if (isSuccess) {
      if (addCartData?.msg) {
        toast.error(addCartData.msg);
      } else {
        toast.success(`Added to cart`);
      }
      cartRefetch();
    }
    if (isError) {
      toast.error(`Failed to add to cart`);
    }
    if (isFaSuccess) {
      if (addFavData?.msg) {
        toast.error(addFavData?.msg);
      } else {
        toast.success(`Added to Favorite`);
      }

      isFavRefetch();
    }
    if (isFaError) {
      toast.error(`Failed to add to Favorite`);
    }
  }, [
    isSuccess,
    isError,
    isFaSuccess,
    isFaError,
    addCartData,
    addFavData,
    cartRefetch,
    isFavRefetch,
  ]);
  const {
    data: products,
    refetch,
    isLoading: filterProductLoading,
  } = useGetFilterProductQuery(filter);

  const handleAddToCart = (id: string, price: number) => {
    if (!session) {
      router.push("/login");
    } else {
      const data = {
        productId: id,
        userId: session?.user?.id,
        quantity,
        total: quantity * price,
      };
      addNewCart(data);
    }
  };
  const handleAddToFavorite = (id: string) => {
    if (!session) {
      router.push("/login");
    } else {
      const data = {
        productId: id,
        userId: session?.user?.id,
      };

      addNewFavorite(data);
    }
  };
  if (isTagLoading)
    return (
      <div className="w-full mt-10  gap-x-5 flex">
        <Skeleton className="w-full h-full bg-slate-200 min-h-[7vh] dark:bg-slate-800" />
        <Skeleton className="w-full max-sm:hidden h-full bg-slate-200 min-h-[7vh] dark:bg-slate-800" />
        <Skeleton className="w-full max-sm:hidden h-full bg-slate-200 min-h-[7vh] dark:bg-slate-800" />
        <Skeleton className="w-full max-sm:hidden h-full bg-slate-200 min-h-[7vh] dark:bg-slate-800" />
        <Skeleton className="w-full max-sm:hidden h-full bg-slate-200 min-h-[7vh] dark:bg-slate-800" />
      </div>
    );
  const handleTagClick = (isSelected: boolean, id: string) => {
    if (isSelected) {
      dispatch(
        updateFilterData({
          ...filter,category: "",brand:"", 
          tag: filter.tag.filter((tagId) => tagId !== id),
        })
      );
    } else {
      dispatch(
        updateFilterData({
          ...filter,category: "",brand:"",
          tag: [id],
        })
      );
    }
  };
  console.log(filter);
  return (
    <ContainerBox className="my-2 w-full ">
      <div className="items-center w-full flex justify-between container-fluid md:container lg:container ">
        <TitleComponent
          className="flex justify-between  !p-0  items-center my-2 w-full"
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
                  <div
                    key={index}
                    className={`bg-slate-100 ${
                      isSelected ? "border border-blue-500" : "border-none"
                    } dark:bg-slate-800 rounded-md p-2 hover:bg-blue-500`}
                  >
                    <span
                      onClick={() => handleTagClick(isSelected, item?.id)}
                      className="flex cursor-pointer max-sm:truncate justify-center items-center text-center"
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
        className="w-full group relative container-fluid md:container lg:container"
      >
        <CarouselContent className="">
          {tags?.map((item: any, index: number) => {
            const isSelected = filter.tag.includes(item.id);

            return (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <CarouselItem
                   onClick={() => handleTagClick(isSelected, item?.id)}
                    key={index}
                    className="md:basis-1/2 h-full lg:basis-1/4 basis-1/2"
                  >
                    <div className="p-1">
                      <Card
                        className={` bg-slate-200 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer transition-all duration-500 ease-in-out ${
                          isSelected ? "border border-blue-500" : "border-none"
                        }`}
                      >
                        <CardContent className="flex items-center justify-center p-4 gap-x-4">
                          <span
                           
                            className="flex cursor-pointer  max-sm:truncate justify-center items-center text-center"
                          >
                            {item.name}
                          </span>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                </DialogTrigger>
                <DialogContent className="lg:min-w-[70vw] border-none md:min-w-[90vw] max-sm:w-[100%] overflow-y-scroll  max-h-[70vh] lg:min-h-[35vh] max-sm:max-h-[80vh]">
                  <DialogHeader>
                    <DialogTitle className="truncate w-44 mx-auto text-blue-500 text-center">
                      {item.name} product
                    </DialogTitle>
                  </DialogHeader>
                  {products?.length ? (
                    <MasonryContainer>
                      {products.map((product: any, index: number) => (
                        <div
                          key={index}
                          className="image-item relative group overflow-hidden"
                        >
                          <div className="w-full group-hover:shadow-xl h-full group-hover:border-red-500 group-hover:border-2">
                            <ReactMagnify
                              imageUrl={
                                product?.imgUrl[0] ? product?.imgUrl[0] : ""
                              }
                            />
                          </div>
                          <div className="w-[60px] transition-all duration-500 delay-100 ease-in-out translate-x-16 group-hover:translate-x-0  absolute -right-2 bottom-12  p-1 flex flex-col justify-center max-sm:translate-x-0">
                            <Button
                              onClick={() =>
                                handleAddToCart(
                                  product?.id,
                                  product?.salesPrice
                                )
                              }
                              variant="default"
                              size="sm"
                              className="flex backdorp-blur-sm bg-slate-100 text-slate-900  bg-opacity-20 hover:text-white dark:hover:text-slate-900 rounded-none  text-sm "
                            >
                              <ShoppingCart className="size-5" />
                              {isAddLoading ? (
                                <Loading className="!px-0 !mx-0" />
                              ) : session &&
                                carts?.some(
                                  (item) => item.productId === product?.id
                                ) ? (
                                <Check className="size-5" />
                              ) : (
                                <Plus className="size-5" />
                              )}
                            </Button>

                            <Button
                              onClick={() => handleAddToFavorite(product?.id)}
                              variant="default"
                              size="sm"
                              className="flex backdrop-blur-sm bg-slate-100 text-slate-900  bg-opacity-20 hover:text-white dark:hover:text-slate-900 rounded-none  text-sm gap-x-1"
                            >
                              {isFaLoading ? (
                                <Loading />
                              ) : session &&
                                favorites?.some(
                                  (item) => item.productId === product?.id
                                ) ? (
                                <Heart className="size-5 text-transparent fill-red-500" />
                              ) : (
                                <Heart className="size-5" />
                              )}
                            </Button>
                          </div>
                          <div className="absolute backdrop-blur-sm opacity-0 bg-slate-200 bg-opacity-20 max-sm:opacity-100 max-sm:translate-y-0  translate-y-5 group-hover:translate-y-0 group-hover:opacity-100 duration-500 transition-all ease-in-out bottom-0 left-0 w-full py-2 px-3">
                            <div className="flex justify-between  px-1 items-center">
                              <h5 className="p-2 w-24 truncate dark:text-slate-900 max-sm:text-sm  text-md font-bold">
                                {product?.name}
                              </h5>
                              <h5 className="px-2 text-sm font-bold dark:text-slate-900 rounded-lg backdrop-blur-sm ">
                                <del className="px-2 max-sm:justify-center text-sm font-bold text-slate-500 ">
                                  ${product?.price}
                                </del>{" "}
                                / ${product?.salesPrice}
                              </h5>
                            </div>
                          </div>
                        </div>
                      ))}
                    </MasonryContainer>
                  ) : (
                    <Card className="w-full border-none min-h-[200px] flex justify-center items-center">
                      No products available
                    </Card>
                  )}
                </DialogContent>
              </Dialog>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="opacity-0 group-hover:opacity-100 left-5 top-8 max-sm:hidden" />
          <CarouselNext className="opacity-0 group-hover:opacity-100 right-5 top-8 max-sm:hidden" />
      </Carousel>
    </ContainerBox>
  );
};

export default TagSlider;
