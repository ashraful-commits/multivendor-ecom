"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ReactMagnify from "./ReactMagnify";
import { useGetSingleProductQuery } from "../../lib/features/productapi";
import Loading from "./../Loading";
import CategoryProduct from "./CategoryProduct";
import CartQuantity from "./CartQuantity";
import {
  useAddNewCartMutation,
  useGetCartQuery,
} from "../../lib/features/cartapi";
import {
  useGetFavoriteQuery,
  useAddNewFavoriteMutation,
} from "../../lib/features/favoriteapi";
import { useRouter } from "next/navigation";
import useSessionData from "./../../hooks/useSessionData";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { Heart, Check, Plus } from "lucide-react";
interface SessionData {
  user: {
    id: string;
    name: string | null | undefined;
    email: string | null | undefined;
    image: string | null | undefined;
  };
  expires: string;
}
const SingleProudcutImg = ({ id }: { id: string }) => {
  const { data: product, isLoading } = useGetSingleProductQuery(id);
  const session = useSessionData() as SessionData;
  const [Img, setImg] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const {
    data: favorites,
    isLoading: isGetFavLoading,
    isError: isGetFavError,refetch:refetchFav
  } = useGetFavoriteQuery(session?.user?.id as string);
  const {
    data: carts,
    isLoading: isGetLoading,
    isError: isGetError,refetch:cartRefetch
  } = useGetCartQuery(session?.user?.id as string);
  const [addNewCart, { isSuccess, isLoading: isAddLoading, isError }] =
    useAddNewCartMutation();
  const [
    addNewFavorite,
    {
      isSuccess: isAddFaveSuccess,
      isLoading: isAddFavLoading,
      isError: isAddFavError,
    },
  ] = useAddNewFavoriteMutation();
  const router = useRouter();

  console.log(carts);
  useEffect(() => {
    if (isAddFaveSuccess) {
      toast.success(`Added to cart`);
      refetchFav()
    }
    if (isSuccess) {
      toast.success(`Added to cart`);
      cartRefetch()
    }
    if (isError) {
      toast.error(`Failed to add to cart`);
    }
  }, [isSuccess, isError,isAddFaveSuccess]);

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
  useEffect(() => {
    if (product?.imgUrl && product.imgUrl.length > 0) {
      setImg(product.imgUrl[0]);
    }
  }, [product]);
  if (isGetLoading)
    return (
      <div className="w-full h-full">
        <Loading className="mx-auto my-auto" />
      </div>
    );

  if (isLoading)
    return (
      <div className="w-full h-full">
        <Loading className="mx-auto my-auto" />
      </div>
    );

  return (
    <div>
      <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
        <div className="mt-6 sm:mt-8 lg:mt-0">
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
            {product?.name}
          </h1>
          <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
            <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
              ${product?.salesPrice}
            </p>
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
              </div>
              <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                (5.0)
              </p>
              <a
                href="#"
                className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
              >
                345 Reviews
              </a>
            </div>
          </div>
          <div className="mt-6 sm:gap-4 w-full sm:items-center sm:flex sm:mt-8">
            {product && (
              <button
                onClick={() =>
                  !isAddFavLoading && handleAddToFavorite(product?.id)
                }
                className={`text-white max-sm:w-full mt-4 sm:mt-0 bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-slate-600 dark:hover:bg-slate-700 focus:outline-none dark:focus:ring-slate-800 flex items-center justify-center ${
                  isAddFavLoading ? "cursor-not-allowed opacity-50" : ""
                }`}
                disabled={isAddFavLoading}
              >
                {isAddFavLoading ? (
                  <Loading />
                ) : favorites?.some((item) => item.productId === product.id) ? (
                  <>
                    <Heart className="fill-red-500 text-transparent" />
                    <span className="ml-2">Added to cart</span>
                  </>
                ) : (
                  <>
                  <Heart />
                    <span className="ml-2">Add to Favorites</span>
                  </>
                )}
              </button>
            )}
            {product && (
              <button
                onClick={() =>
                  !isAddLoading &&
                  handleAddToCart(product?.id, product?.salesPrice)
                }
                className={`text-white mt-4  max-sm:w-full sm:mt-0 bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-slate-600 dark:hover:bg-slate-700 focus:outline-none dark:focus:ring-slate-800 flex items-center justify-center ${
                  isAddLoading ? "cursor-not-allowed opacity-50" : ""
                }`}
                disabled={isAddLoading}
              >
                {isAddLoading ? (
                  <Loading />
                ) : carts?.some((item) => item.productId === product.id) ? (
                  <>
                    <Check />
                    <span className="ml-2">Added to cart</span>
                  </>
                ) : (
                  <>
                    <Plus />
                    <span className="ml-2">Add to cart</span>
                  </>
                )}
              </button>
            )}
            <div className="max-sm:mt-5">

            <CartQuantity
              className="flex items-center justify-evenly max-sm:justify-between mx-auto bg-slate-600 dark:bg-slate-700 p-1 !rounded-xl gap-x-5"
              quantity={quantity}
              setQuantity={setQuantity}
            />
            </div>
          </div>
          <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />
          <p className="mb-6 text-gray-500 dark:text-gray-400">
            {product?.description}
          </p>
        </div>
        <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
          <ReactMagnify imageUrl={Img ? Img : ""} />
          <div className="my-2 flex flex-wrap gap-x-2 justify-end">
            {product &&
              product?.imgUrl?.length > 0 &&
              product?.imgUrl?.map((img, index) => (
                <Image
                  key={index}
                  onClick={() => setImg(img)}
                  width={1000}
                  height={1000}
                  className="w-14 h-14 cursor-pointer"
                  src={img}
                  alt="subimg"
                />
              ))}
          </div>
        </div>
        <div className="col-span-2 w-full">
          {/* {console.log(product)} */}
          {product && <CategoryProduct id={product?.categoryId} />}
        </div>
      </div>
    </div>
  );
};

export default SingleProudcutImg;
