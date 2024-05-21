"use client";
import React, { useState, useEffect } from "react";
import { ProductData } from "../../typescript";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import CartQuantity from "./CartQuantity";
import { ShoppingCart, Plus, Heart, Check } from "lucide-react";
import { useGetProductQuery } from "../../lib/features/productapi";
import {
  useAddNewCartMutation,
  useGetCartQuery,
} from "../../lib/features/cartapi";
import { useGetSingleUserQuery } from "../../lib/features/userapi";
import {
  useAddNewFavoriteMutation,
  useGetFavoriteQuery,
} from "../../lib/features/favoriteapi";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import MasonryContainer from "./MasonaryContainer";
import { getSession } from "next-auth/react";
import useSessionData from "../../hooks/useSessionData";
import { toast } from "react-hot-toast";
import Loading from "../Loading";
import { useRouter } from "next/navigation";

interface SessionData {
  user: {
    id: string;
    name: string | null | undefined;
    email: string | null | undefined;
    image: string | null | undefined;
  };
  expires: string;
}
const Products = ({ products }: { products: ProductData[] }) => {
  const session = useSessionData() as SessionData;
  const [quantity, setQuantity] = useState<number>(1);
  const [addNewCart, { isSuccess,isLoading:isAddLoading, isError }] = useAddNewCartMutation();
  const [addNewFavorite, { isSuccess: isFaSuccess,isLoading:isFaLoading, isError: isFaError }] =
    useAddNewFavoriteMutation();
  const {
    data: favorites,
    isLoading: isGetFavLoading,
    isError: isGetFavError,
  } = useGetFavoriteQuery(session?.user?.id as string);
  const {
    data: carts,
    isLoading: isGetLoading,
    isError: isGetError,
  } = useGetCartQuery(session?.user?.id as string);
  const router = useRouter();
  useEffect(() => {
    if (isSuccess) {
      toast.success(`Added to cart`);
    }
    if (isError) {
      toast.error(`Failed to add to cart`);
    }
    if (isFaSuccess) {
      toast.success(`Added to Favorite`);
    }
    if (isFaError) {
      toast.error(`Failed to add to Favorite`);
    }
  }, [isSuccess, isError, isFaSuccess, isFaError]);

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

  return (
    <>
      {products?.length ? (
        <MasonryContainer>
          {products.map((product: any, index: number) => (
            <div key={index} className="image-item relative group">
              <Link href={`/products/${product?.id}`}>
                <Image
                  width={1000}
                  height={1000}
                  className=""
                  src={product?.imgUrl[0]}
                  alt={`Image+${index}`}
                />
              </Link>
              <CartQuantity
                quantity={quantity}
                setQuantity={setQuantity}
                className="flex opacity-0 p-1 transition-all duration-500 ease-in-out border rounded-md group-hover:opacity-100 absolute bottom-14 right-0 gap-x-3 items-center bg-slate-200 dark:bg-slate-900"
              />
              <div className="absolute backdrop-blur-sm bg-white dark:bg-slate-900 opacity-0 translate-y-5 group-hover:translate-y-0 group-hover:opacity-100 duration-500 transition-all ease-in-out bottom-0 left-0 w-full py-2 px-3">
                <div className="flex justify-between gap-x-2 px-1 items-center">
                  <h5 className="p-2 text-md font-bold">{product?.name}</h5>
                  <h5 className="px-2 text-sm font-bold border-2 border-slate-500 rounded-lg backdrop-blur-sm ">
                    <del className="px-2 text-sm font-bold text-slate-500">
                      ${product?.price}
                    </del>{" "}
                    / ${product?.salesPrice}
                  </h5>
                  <Button
                    onClick={() => handleAddToFavorite(product?.id)}
                    variant="default"
                    size="sm"
                    className="flex  text-sm gap-x-1"
                  >
                    {isFaLoading?<Loading/>:favorites?.some(
                      (item) => item.productId === product?.id
                    ) ? (
                      <Heart className="size-5 fill-red-500" />
                    ) : (
                      <Heart className="size-5" />
                    )}
                  </Button>
                  <Button
                    onClick={() =>
                      handleAddToCart(product?.id, product?.salesPrice)
                    }
                    variant="default"
                    size="sm"
                    className="flex text-sm gap-x-1"
                  >
                    <ShoppingCart className="size-5" />
                    {isAddLoading ?<Loading  className="!px-0 !mx-0"/>:carts?.some((item) => item.productId === product?.id) ? (
                      <Check className="size-5" />
                    ) : (
                      <Plus className="size-5" />
                    )}
                    
                  </Button>
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
    </>
  );
};

export default Products;
