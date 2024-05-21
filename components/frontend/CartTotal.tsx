"use client";
import React from "react";
import { ShoppingBag } from "lucide-react";
import { useGetCartQuery } from "../../lib/features/cartapi";
import Loading from "../Loading";
const CartTotal = ({ id }: { id: string }) => {
  const { data: carts, isLoading } = useGetCartQuery(id);
  if (isLoading)
    return (
      <div className="w-full hf-ull">
        <Loading className="mx-auto my-auto" />
      </div>
    );
  return (
    <div className="mx-auto flex justify-center items-center w-full h-full cursor-pointer ">
      <div className="relative h-full flex gap-x-4 justify-center items-center w-full">
      <div className="border-r-2 px-3 border-r-blue-500 h-full grid grid-cols-2 justify-center items-center bg-blue-500">
        <span className=" block  text-slate-900 dark:text-slate-100 font-bold text-[14px]">
          {carts?.length > 0 ? carts?.length : 0}
        </span>
        </div>
        <ShoppingBag className="block text-blue-500 my-auto" />
      </div>
    </div>
  );
};

export default CartTotal;
