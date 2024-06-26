"use client";
import React, { useEffect, useState } from "react";
import ContainerBox from "@/components/frontend/ContainerBox";
import { useGetCartQuery } from "../../../lib/features/cartapi";

import Image from "next/image";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import useSessionData from "./../../../hooks/useSessionData";
import { useRouter } from "next/navigation";
import { setCurrentStep,updateCheckoutFormData } from "../../../lib/features/stepSlice";
import { MoveRight, ChevronLeft } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useAddNewOrderMutation } from "../../../lib/features/orderapi";
import { useAddNewPaymentMutation } from "../../../lib/features/paymentapi";
import Loading from "../../Loading";
import { SessionData, CheckoutFormData } from "./../../../typescript";
import { RootState } from "../../../lib/store";

const OrderSummary = () => {
  const session = useSessionData() as SessionData;
  const { data: carts, isLoading } = useGetCartQuery(session?.user?.id);
  const checkoutFormData: CheckoutFormData = useSelector((state: RootState) => state.checkout.checkoutFormData);
  const orderState = useSelector((state: RootState) => state.checkout);
  const steps = useSelector((state: RootState) => state.checkout.currentStep);
  const dispatch = useDispatch();
  const [addNewOrder, { isLoading: isAddOrderLoading, isSuccess, isError }] = useAddNewOrderMutation();
  const [addNewPayment, { data: paymentReturnData, isLoading: isAddPaymentLoading }] = useAddNewPaymentMutation();
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const cartIds = carts?.map((item) => item.id);
    const paymentDetails = {
      ...checkoutFormData,
      carts,
    };
    const orderDetails = {
      ...checkoutFormData,
      cartItems: cartIds,
      userId: session?.user?.id,
      productIds: carts?.map((item) => item?.productId),
      total: carts?.reduce((total, item) => total + item.total, paymentDetails.shippingCost),
    };
    try {
      await addNewOrder(orderDetails);
      if (checkoutFormData?.paymentMethod === "credit card") {
        await addNewPayment(paymentDetails);
      }
      toast.success("Order confirmed");
      dispatch(updateCheckoutFormData({ ...orderState, orderStatus: true }));
      if (paymentReturnData) {
        window.location.href = paymentReturnData.url;
      } else {
        router.push("/success");
      }
    } catch (error) {
      console.error("Error processing order:", error);
      toast.error("Error processing order. Please try again.");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ContainerBox className="mx-5">
      <h2 className="my-10 mx-5 text-blue-500 text-lg">Order summary</h2>
      <div className="w-full h-full bg-slate-200 dark:bg-black ">
        <div className="lg:flex px-5 md:flex sm:flex-col w-full shadow-xl">
          <div className="flex-1 w-full px-4 py-6 gap-5 sm:px-6">
            <div className="mt-8">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y  divide-gray-200">
                  {carts?.length ? (
                    carts?.map((cart, index) => (
                      <li
                        key={index}
                        className="flex items-center  justify-between w-full py-3"
                      >
                        <div className="h-10 w-10 flex max-sm:grid max-sm:grid-cols-1 items-center gap-x-5 rounded-md border border-gray-200">
                          <Image
                            blurDataURL={cart?.product?.imgUrl[0]}
                            loading="lazy"
                            width={1000}
                            height={1000}
                            src={cart?.product?.imgUrl[0]}
                            alt={cart?.product?.name}
                            className="w-10 h-10 object-cover object-center"
                          />
                          <div className="flex flex-col font-medium">
                            <h3 className="truncate w-24 max-sm:w-12 ">
                              <a className="truncate w-24 block" href="#">{cart?.product?.name}</a>
                            </h3>
                          </div>
                        </div>
                        <p className=" border p-5 max-sm:ml-20 rounded-md border-slate-300 dark:border-slate-500 w-10 flex items-center justify-center h-10">
                          {" "}
                          {cart.quantity}
                        </p>
                        <div className="ml-4 grid grid-cols-2 gap-x-4 items-center justify-center w-10 h-10">
                          <div className="flex flex-col items-center justify-center">
                            <p className="ml-4">${cart?.total}</p>
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
          <div className="flex bg-slate-100 dark:bg-slate-900  dark:text-white text-slate-900 p-4 rounded-md mt-10 justify-between text-base font-medium ">
            <p>Subtotal</p>
            <p>
              $
              {carts?.reduce((total, item) => {
                return total + item.total;
              }, 0)}
            </p>
          </div>
          <div className="my-5 flex justify-between max-sm:flex-col gap-4 pb-5">
            <Button
              onClick={() => dispatch(setCurrentStep(steps - 1))}
              className="flex gap-x-5 items-center"
              variant="default"
            >
              <ChevronLeft />
              Back to checkout
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              className="flex gap-x-5 items-center"
              variant="default"
            >
              {" "}
              {isAddOrderLoading && <Loading />}Process to Payment <MoveRight />
            </Button>
          </div>
        </div>
      </div>
    </ContainerBox>
  );
};

export default OrderSummary;
