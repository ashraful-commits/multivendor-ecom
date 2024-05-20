"use client";
import React from "react";
import { ShoppingBag } from "lucide-react";
import { useGetCartQuery } from "../../lib/features/cartapi";
import Loading from "../Loading";
const CartTotal = ({ id }: { id: string }) => {
  const { data: carts, isLoading } = useGetCartQuery(id);
  if (isLoading)
    return (
      <div className="w-full min-h-[200px]">
        <Loading className="mx-auto my-auto" />
      </div>
    );
  return (
    <div className="mx-auto my-auto cursor-pointer">
      <div className="w-5 h-5 relative my-auto">
        <span className="absolute flex font-bold border border-white justify-center items-center -top-4 -left-2 text-[10px] bg-red-500 text-white w-5 h-5 rounded-full">
          {carts?.length > 0 ? carts?.length : 0}
        </span>
        <ShoppingBag className="block text-slate-900 dark:text-slate-100 my-auto" />
      </div>
    </div>
  );
};

export default CartTotal;
