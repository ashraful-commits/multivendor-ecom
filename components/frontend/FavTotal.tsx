"use client";
import React from "react";
import { Heart } from "lucide-react";
import { useGetFavoriteQuery } from "../../lib/features/favoriteapi";
import Loading from "../Loading";
const FavTotal = ({ id }: { id: string }) => {
  const { data: favorites, isLoading } = useGetFavoriteQuery(id);
  if (isLoading)
    return (
      <div className="w-full hf-ull">
        <Loading className="mx-auto my-auto" />
      </div>
    );
  return (
    <div className="mx-auto flex justify-center items-center w-full h-full cursor-pointer ">
    <div className="relative h-full flex gap-x-4 justify-center items-center w-full">
    <div className=" px-3 h-full grid grid-cols-2 justify-center items-center bg-red-500">
      <span className=" block w-full text-slate-900 dark:text-slate-100 font-bold text-[14px]">
          {favorites?.length > 0 ? favorites?.length : 0}
        </span>
        </div>
        <Heart className="block text-red-500 my-auto" />
      </div>
    </div>
  );
};

export default FavTotal;
