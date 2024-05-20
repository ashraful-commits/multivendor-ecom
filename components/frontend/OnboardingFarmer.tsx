'use client';
import React, { useState } from 'react';
import Heading from '../../components/backend/Heading';
import { useForm,FieldValues,Resolver } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { X } from 'lucide-react';
import FromHeader from '../../components/backend/FromHeader';
import TextInput from '../../components/backend/Form/TextInput';
import { SubmitButton } from '../../components/backend/Form/SubmitButton';
import TextArea from '../../components/backend/Form/TextArea';
import { generateUniqueCode } from '../../lib/generateUniqueCode';
import { makePostRequest } from '../../lib/apiRequest';
import ImageUpload from '../../components/backend/Form/ImageInput';
import { DatePickerDemo } from '../../components/backend/Form/DatePicker';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ToggleInput } from './../backend/Form/ToggleInput';
import { SelectInput } from './../backend/Form/SelectInput';
import {farmerType}from "../../typescript"
import { useRouter } from 'next/navigation';
import {OptionType} from "../../typescript"
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Decription is required'),
  email: yup.string().required('email is required'),
  phone: yup.string().required('phone is required'),
  address: yup.string().required('address is required'),
  contact: yup.string().required('contact is required'),
  landSize: yup.string().required('Land Size is required'),
  terms: yup.string().required('terms is required'),
  notes: yup.string().required('notes is required'),
  mainCrop: yup.string().required('Main Crop is required'),
});

const OnboardingFarmer = ({role,user}:{role:string,user?:any}) => {
 const router = useRouter()

  const [image, setImage] = useState<string|null>(null);
  const {
    register,
    handleSubmit,
    reset,watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues:{
      isActive:true,
      ...user
    }
  });
  // redirect function
   function redirect(){
    router.push("/")
   }
  const isActive = watch("isActive")
  const [loading, setLoading] = useState(false);
  const [productIds, setProductIds] = useState<OptionType[]>([]);
  async function onSubmit(data:farmerType) { 
    const uniqueCode = generateUniqueCode(data.name);
    data.isActive = isActive
    data.imgUrl  = image
    
    setLoading(true);
    makePostRequest(setLoading, '/api/farmers', {...data,uniqueCode,productIds:productIds,userId:user.id}, 'Farmer', reset,redirect);
  }
  return (
    <div className="w-full flex justify-center mx-auto">
      <div className="bg-slate-800 dark:bg-white border border-slate-800 w-full mx-auto dark:border-slate-200 rounded-md p-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="text-white dark:text-slate-900"
        >
          <TextInput
            register={register}
            errors={errors?.name?.message}
            name="name"
            label="name"
            placeholder="farmer name"
          />
          <TextInput
            register={register}
            errors={errors?.phone?.message}
            name="phone"
            label="phone"
            type="tel"
            placeholder="farmer phone"
          />
          <TextInput
            register={register}
            errors={errors?.email?.message}
            type="email"
            name="email"
            label="email"
            placeholder="farmer email"
          />
          <TextInput
            register={register}
            errors={errors?.address?.message}

            name="address"
            label="address"
            placeholder="farmer address"
          />
          <TextInput
            register={register}
            errors={errors?.contact?.message}
            name="contact"
            type="tel"
            label="contact"
            placeholder="farmer contact person"
          />
          <TextInput
            register={register}
            errors={errors?.landSize?.message}
            name="landSize"
            type="number"
            label="What is the size of your land in accres"
            placeholder="Enter land size"
          />
         
          <TextInput
            register={register}
            errors={errors?.mainCrop?.message}
            name="mainCrop"
            type="text"
            label="What is your main crop that you cultivate"
            placeholder="Enter crop name"
          />
           <Label
              className="text-md text-white dark:text-slate-900 text-start capitalize my-4"
              htmlFor={'products'}
            >
             Select Product
            </Label>
         <SelectInput setMarket={setProductIds} data={productIds}/>
          <TextArea
            register={register}
            errors={errors?.description?.message}
            name="description"
            label="Description"
            placeholder="farmer description"
          />

          <TextArea
            register={register}
            errors={errors?.terms?.message}
            name="terms"
            label="terms"
            placeholder="farmer terms"
          />

          <TextArea
            register={register}
            errors={errors?.notes?.message}
            name="notes"
            label="notes"
            placeholder="farmer notes"
          />
          <div className="flex gap-x-4  flex-col ">
            <Label
              className="text-md text-white dark:text-slate-900 text-start capitalize my-1"
              htmlFor={'image'}
            >
              Image Upload
            </Label>
            <ImageUpload
              endpoint="farmerImageUpload"
              setImage={setImage}
              image={image}
            />
          </div>
          <ToggleInput register={register} name="isActive" label="Publish farmer"/>
          <SubmitButton loading={loading} title="Add Farmer" />
        </form>
      </div>
    </div>
  );
};

export default OnboardingFarmer;
