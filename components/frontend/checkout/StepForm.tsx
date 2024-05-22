"use client"
import React,{useState} from "react";
import ContainerBox  from '@/components/frontend/ContainerBox';
import PersonalDetails from './PersonalDetails';
import ShippingDetails from './ShippingDetails';
import PaymentMethod from './PaymentMethod';
import OrderSummary from './OrderSummary';
import { useSelector } from 'react-redux';
import { RootState } from '../../../lib/store';


const StepForm = () => {
   const currentStep = useSelector((state:RootState)=>state.checkout.currentStep)
   const allCheckoutdata = useSelector((state:RootState)=>state.checkout.checkoutFormData)
   console.log(allCheckoutdata)
   function renderFormByStep(step:number){
   if(step ===1){
    return <PersonalDetails  />
   }else if(step ===2){
    return <ShippingDetails />
   }else if(step ===3){
    return <PaymentMethod />
   }else if(step ===4){
    return <OrderSummary/>
   }
    }
  return <ContainerBox>{renderFormByStep(currentStep)}</ContainerBox>;
};

export default StepForm;
