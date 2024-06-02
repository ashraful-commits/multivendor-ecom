"use client"
import React from "react";
import {useDispatch,useSelector} from "react-redux"
import{updateCheckoutFormData,setCurrentStep}from "../../../lib/features/stepSlice"
import ContainerBox from "@/components/frontend/ContainerBox";
import TextInput from '@/components/backend/Form/TextInput';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm,FieldValues} from 'react-hook-form';
import NextButton from './NextButton';
import { RootState } from '../../../lib/store';
import useSessionData from './../../../hooks/useSessionData';
import { SessionData } from './../../../typescript';
const schema = yup.object().shape({
    firstName: yup.string().required('first name is required'),
    lastName: yup.string().required('last name is required'),
    email: yup.string().required('email is required'),
    phone: yup.string().required('phone is required'),

  });
const PersonalDetails = () => {
  const session = useSessionData() as SessionData
  const currentStep = useSelector((state:RootState)=>state.checkout.currentStep)
  const existingData = useSelector((state:RootState)=>state.checkout.checkoutFormData)
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
      const dispatch = useDispatch()
     
      console.log(currentStep)
      async function onSubmit(data: any) {
        dispatch(updateCheckoutFormData(data))
        dispatch(setCurrentStep(currentStep+1))
      }
  return (
    <ContainerBox className="px-5">
      <form  onSubmit={handleSubmit(onSubmit)} className="px-5" action="" method="">
      <h2 className="my-10  text-blue-500 text-lg">Personal Details</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <TextInput register={register}
              errors={errors?.fistName?.message}
              name="firstName"
              label="Your first name"
              placeholder="first name" type="text" />
          </div>
          <div>
           <TextInput register={register}
              errors={errors?.lastName?.message}
              name="lastName"
              label="your last name"
              placeholder="last name" type="text"/>
              
          </div>
          <div>
            <TextInput register={register}
              errors={errors?.email?.message}
              name="email"
              label="Your email"
              placeholder="email" type="email"/>
          </div>
          <div>
            <TextInput register={register}
              errors={errors?.phone?.message}
              name="phone"
              label="Your phone"
              placeholder="phone" type="text"/>
              
          </div>
         
        </div>
        <NextButton/>
      </div>
      </form>
    </ContainerBox>
  );
};

export default PersonalDetails;
