"use client";
import React from "react";
import { useGetCartQuery } from "../../lib/features/cartapi";
import Loading from "../Loading";
import  Image  from 'next/image';
const CartItems = ({ id }: { id: string }) => {
  const { data: carts, isLoading } = useGetCartQuery(id);
  if (isLoading)
    return (
      <div className="w-full h-full">
        <Loading className="mx-auto my-auto" />
      </div>
    );
  return (
    <div className="w-full h-full">
      <div className="lg:flex md:flex sm:flex-col w-full  bg-white shadow-xl">
        <div className="flex-1 w-full px-4 py-6 sm:px-6">
          <div className="flex items-start justify-between">
            <h2
              className="text-lg font-medium text-gray-900"
              id="slide-over-title"
            >
              Shopping cart
            </h2>
            
          </div>
          <div className="mt-8">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {carts?.length > 0 ? (
                  carts?.map((cart, index) => (
                    <li key={index} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 rounded-md border border-gray-200">
                        <Image width={1000} height={1000} src={cart?.product?.imgUrl[0]} alt={cart?.product?.name} className="w-full h-full object-cover object-center" />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href="#">Throwback Hip Bag</a>
                            </h3>
                            <p className="ml-4">$90.00</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">Salmon</p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500">Qty 1</p>
                          <div className="flex">
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Remove
                            </button>
                          </div>
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
        {carts?.length > 0 && (
          <div className="border-t max-h-[300px] border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>$262.00</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <a
                href="#"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </a>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
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
