"use client";
import React, { useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import { useGetCartQuery } from "../../lib/features/cartapi";
import Loading from "../Loading";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { SessionData } from '../../typescript';
import useSessionData from './../../hooks/useSessionData';
const CartTotal = ({ id }: { id: string }) => {
  const { data: carts, isLoading, refetch } = useGetCartQuery(id);
  const orderStatus = useSelector((state: RootState) => state.checkout.checkoutFormData);
  const session = useSessionData() as SessionData
  useEffect(() => {
    if (orderStatus?.orderStatus) {
      refetch();
    }
  }, [orderStatus.orderStatus, refetch]);

  if (isLoading) {
    return (
      <div className="w-full h-full">
        <Loading className="mx-auto my-auto" />
      </div>
    );
  }

  return (
    <div className="mx-auto flex justify-center items-center w-full h-full cursor-pointer ">
      <div className="relative h-full flex gap-x-4 justify-center items-center w-full  max-sm:flex-col">
        <div className=" px-2 max-sm:px-3 max-sm:h-auto h-full grid grid-cols-2 max-sm:grid-rows-2 justify-center items-center bg-green-500">
          <span className=" block w-full text-slate-900 dark:text-slate-100 font-bold text-[14px]">
            {carts?.length >  0&& session ? carts?.length : 0}
          </span>
        </div>
        <ShoppingBag className="block text-green-500 my-auto" />
      </div>
    </div>
  );
};

export default CartTotal;
