import React from "react";
import ContainerBox from "@/components/frontend/ContainerBox";
import  PaymentMethodSystem  from './PaymentMethodSystem';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm,FieldValues} from 'react-hook-form';
import NextButton from './NextButton';
import {useDispatch,useSelector} from "react-redux"
import { RootState } from '../../../lib/store';
import {updateCheckoutFormData,
setCurrentStep} from "../../../lib/features/stepSlice"
const schema = yup.object().shape({
paymentMethod: yup.string().required('PaymentMethod required'),


});
const PaymentMethod = () => {
  const currentStep = useSelector((state:RootState)=>state.checkout.currentStep)
  const existingData = useSelector((state:RootState)=>state.checkout.checkoutFormData)
const dispatch = useDispatch()
  
const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
      } = useForm<any>({
        resolver: yupResolver(schema),
        defaultValues: {
          ...existingData
        },
        
      });
      async function onSubmit(data: any) {
        dispatch(updateCheckoutFormData(data))
        dispatch(setCurrentStep(currentStep+1))
      }
  return (
    <ContainerBox>
        <form onSubmit={handleSubmit(onSubmit)}>
      <PaymentMethodSystem register={register}  errors={errors?.phone?.message}/>
      <div className="my-5"> 

       <NextButton/>
      </div>
        </form>
    </ContainerBox>
  );
};

export default PaymentMethod;
