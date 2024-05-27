"use client";
import React, { useEffect, useState } from "react";
import {
  useGetCartQuery,
  useDeleteCartMutation,
  useEditCartMutation,
} from "../../lib/features/cartapi";
import Loading from "../Loading";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

const CartItems = ({ id }: { id: string }) => {
  const { data: carts, isLoading } = useGetCartQuery(id);
  const [deleteCart, { isSuccess: isDeleteSuccess, isError: isDeleteError }] =
    useDeleteCartMutation();
  const [editCart, { isSuccess: isEditSuccess, isError: isEditError }] =
    useEditCartMutation();
  useEffect(() => {
    if (isDeleteSuccess) {
      toast.success("Product deleted!");
    }else if (isDeleteError) {
      toast.error("Product not deleted!");
    }else if (isEditSuccess) {
      toast.success("Product edited!");
    }else if (isEditError) {
      toast.error("Product not edited!");
    }else{
      toast.dismiss()
    }
  }, [isDeleteSuccess, isDeleteError, isEditSuccess, isEditError]);

  if (isLoading)
    return (
      <div className="w-full h-full">
        <Loading className="mx-auto my-auto" />
      </div>
    );

  const handleDelete = (id: string) => {
    deleteCart(id);
  };

  const handleQuantityPlus = (q: number, id: string, price: number) => {
    const quantity = q + 1;
    const total = quantity * price;
    editCart({ id, quantity, total });
  };

  const handleQuantityMinus = (q: number, id: string, price: number) => {
    const quantity = q - 1;
    const total = quantity * price;
    if (quantity > 0) {
      editCart({ id, quantity, total });
    }
  };

  return (
    <div className="w-full h-full bg-slate-200 dark:bg-slate-700 ">
      <div className="lg:flex px-5 md:flex sm:flex-col w-full shadow-xl">
        <div className="flex-1 w-full px-4 py-6 sm:px-6">
          <div className="flex items-start justify-between">
            <h2
              className="text-lg font-medium"
              id="slide-over-title"
            >
              Shopping cart
            </h2>
          </div>
          <div className="mt-8">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y  divide-gray-200">
                {carts?.length  ? (
                  carts.map((cart, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between w-full py-3"
                    >
                      <div className="h-10 w-10 flex items-center gap-x-5 rounded-md border border-gray-200">
                        <Image
                          width={1000}
                          height={1000}
                          src={cart?.product?.imgUrl[0]}
                          alt={cart?.product?.name}
                          className="w-full h-full object-cover object-center"
                        />
                        <div className="flex flex-col font-medium">
                          <h3>
                            <a href="#">{cart?.product?.name}</a>
                          </h3>
                          <p className="">Qty {cart.quantity}</p>
                        </div>
                      </div>

                      <div className="ml-4 grid grid-cols-2 gap-x-4 items-center justify-center">
                        <div className="flex gap-x-5 text-base max-sm:flex-col items-center justify-center  font-medium text-gray-900">
                          <Button
                            size="sm"
                            onClick={() =>
                              handleQuantityPlus(
                                cart.quantity,
                                cart.id,
                                cart.product.salesPrice
                              )
                            }
                          
                          >
                            <Plus />
                          </Button>
                          <span>{cart.quantity}</span>
                          <Button
                            size="sm"
                            onClick={() =>
                              handleQuantityMinus(
                                cart.quantity,
                                cart.id,
                                cart.product.salesPrice
                              )
                            }
                            
                          >
                            <Minus />
                          </Button>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                          <p className="ml-4">${cart?.total}</p>
                          <button
                            onClick={() => handleDelete(cart?.id)}
                            type="button"
                            className="font-medium text-blue-600 hover:text-blue-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <div>No cart items</div>
                )}
              </ul>
            </div>
          </div>
        </div>
        {carts?.length  && (
          <div className="border-t text-slate-900 dark:text-slate-100 max-h-[300px] border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium">
              <p>Subtotal</p>
              <p>
                $
                {carts?.reduce((total, item) => {
                  return total + item.total;
                }, 0)}
              </p>
            </div>
            <p className="mt-0.5 text-sm">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <a
                href="/checkout"
                className="flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700"
              >
                Checkout
              </a>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or
                <button
                  type="button"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Continue Shopping<span aria-hidden="true"> &rarr;</span>
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItems;
