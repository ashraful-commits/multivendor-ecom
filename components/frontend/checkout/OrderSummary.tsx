
"use client";
import React, { useEffect, useState } from "react";
import ContainerBox from "@/components/frontend/ContainerBox";
import {
  useGetCartQuery
} from "../../../lib/features/cartapi";

import Image from "next/image";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import useSessionData from './../../../hooks/useSessionData';
import { useRouter } from 'next/navigation';
import {setCurrentStep} from "../../../lib/features/stepSlice"
import {MoveRight,ChevronLeft} from "lucide-react"
import { useSelector, useDispatch } from 'react-redux';
import {useAddNewOrderMutation} from "../../../lib/features/orderapi"
import {useAddNewPaymentMutation} from "../../../lib/features/paymentapi"
import Loading from '../../Loading';
import { SessionData,CheckoutFormData} from './../../../typescript';
import { RootState } from '../../../lib/store';

const OrderSummary = () => {
  const session = useSessionData() as SessionData
    const { data: carts, isLoading } = useGetCartQuery(session?.user?.id);
    const checkoutFormData:CheckoutFormData = useSelector((state:RootState)=>state.checkout.checkoutFormData)
    const steps = useSelector((state:RootState)=>state.checkout.currentStep)
    const dispatch = useDispatch()
    const [addNewOrder,{isLoading:isAddOrderLoading,isSuccess,isError}] = useAddNewOrderMutation()
    const [addNewPayment,{data:paymentReturnData,isLoading:isAddPaymentLoading,isSuccess:isPaymentSuccess,isError:isPaymentError}] = useAddNewPaymentMutation()
   const router = useRouter()

    const handleSubmit=(e:any)=>{
      e.preventDefault()
      const  cartIds = carts?.map(item => item.id);
      const paymentDetails={
        ...checkoutFormData,
        carts,
      }
      addNewOrder({...checkoutFormData,cartItems:cartIds,userId:session?.user?.id})
      if(checkoutFormData?.paymentMethod=="credit card"){

        addNewPayment(paymentDetails)
      }else{
        router.push("/success")
      }
    }
    useEffect(()=>{
      if(paymentReturnData){
        window.location.href=paymentReturnData?.url
      }
        if(isSuccess){
          toast.success("order confirm")
        }
    },[isSuccess,paymentReturnData])
    if(isLoading){
      return <div><Loading/></div>
    }
  return (
    <ContainerBox>
      
        <h2 className="my-5">Order summary</h2>
    <div className="w-full h-full bg-slate-200 dark:bg-slate-700 ">
      <div className="lg:flex px-5 md:flex sm:flex-col w-full shadow-xl">
        <div className="flex-1 w-full px-4 py-6 sm:px-6">
          
          <div className="mt-8">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y  divide-gray-200">
                {carts?.length  ? (
                  carts?.map((cart, index) => (
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
                          className="w-10 h-10 object-cover object-center"
                        />
                        <div className="flex flex-col font-medium">
                          <h3>
                            <a href="#">{cart?.product?.name}</a>
                          </h3>
                          
                        </div>
                      </div>
                      <p className=" border p-5 rounded-md border-slate-300 dark:border-slate-500 w-10 flex items-center justify-center h-10"> {cart.quantity}</p>
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
          <div className="flex bg-slate-100 dark:bg-slate-900  dark:text-white text-slate-900 p-4 rounded-md mt-10 justify-between text-base font-medium ">
              <p >Subtotal</p>
              <p>
                $
                {carts?.reduce((total, item) => {
                  return total + item.total;
                }, 0)}
              </p>
            </div>
        </div>
        <div className="my-5 flex justify-between">

        <Button onClick={()=>dispatch(setCurrentStep(steps-1))} className="flex gap-x-5 items-center" variant="default"><ChevronLeft />Back to checkout</Button>
        <Button type="submit" onClick={handleSubmit} className="flex gap-x-5 items-center" variant="default"> {isAddOrderLoading && <Loading/>}Process to Payment <MoveRight/></Button>
        </div>
      </div>
    </div>


    </ContainerBox>
  );
};

export default OrderSummary;
