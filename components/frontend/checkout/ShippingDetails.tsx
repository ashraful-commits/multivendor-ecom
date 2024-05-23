import React from "react";
import {useDispatch,useSelector} from "react-redux"
import ContainerBox from "@/components/frontend/ContainerBox";
import TextInput from "@/components/backend/Form/TextInput";
import NextButton from "./NextButton";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, FieldValues } from "react-hook-form";
import { ShippingCost } from './ShippingCost';
import { RootState } from '../../../lib/store';
import {updateCheckoutFormData,
  setCurrentStep} from "../../../lib/features/stepSlice"
const schema = yup.object().shape({
  streetAddress: yup.string().required("Street address is required"),
  city: yup.string().required("last name is required"),
  country: yup.string().required("email is required"),
  zipCode: yup.string().required("phone is required"),
  shippingCost: yup.number().required("shippingCost is required"),
});
const ShippingDetails = () => {
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
  async function onSubmit(data: any) {
    dispatch(updateCheckoutFormData(data))
    dispatch(setCurrentStep(currentStep+1))
  }
  return (
    <ContainerBox>
      <h2 className="my-10">Shipping Details</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextInput
            register={register}
            errors={errors?.streetAddress?.message}
            name="streetAddress"
            label="street Address"
            placeholder="street address"
            type="text"
          />
        </div>
        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-x-4">
          <TextInput
            register={register}
            errors={errors?.city?.message}
            name="city"
            label="city"
            placeholder="city"
            type="text"
          />
          <TextInput
            register={register}
            errors={errors?.fistName?.message}
            name="country"
            label="Country"
            placeholder="country"
            type="text"
          />
          <TextInput
            register={register}
            errors={errors?.zipCode?.message}
            name="zipCode"
            label="zip code"
            placeholder="zip code"
            type="string"
          />
        </div>
         <ShippingCost register={register}
            errors={errors?.shippingCost?.message} />

        <div className="my-5">

        <NextButton/>
        </div>
      </form>
    </ContainerBox>
  );
};

export default ShippingDetails;
