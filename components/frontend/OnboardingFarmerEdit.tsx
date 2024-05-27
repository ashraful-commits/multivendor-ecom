
'use client';
import React, { useState ,useEffect} from 'react';
import Heading from '@/components/backend/Heading';
import { useForm,FieldValues,Resolver } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { X } from 'lucide-react';
import FromHeader from '@/components/backend/FromHeader';
import TextInput from '@/components/backend/Form/TextInput';
import { SubmitButton } from '@/components/backend/Form/SubmitButton';
import TextArea from '@/components/backend/Form/TextArea';
import { generateUniqueCode } from '@/lib/generateUniqueCode';
import { makePostRequest } from '@/lib/apiRequest';
import ImageUpload from '@/components/backend/Form/ImageInput';
import { DatePickerDemo } from '@/components/backend/Form/DatePicker';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ToggleInput } from './../backend/Form/ToggleInput';
import { SelectInput } from './../backend/Form/SelectInput';
import {farmerType}from "@/typescript"
import { useRouter } from 'next/navigation';
import {OptionType} from "../../typescript"
import {useEditFarmerMutation,useGetSingleFarmerQuery} from "@/lib/features/farmerapi"
import {useGetProductQuery} from "@/lib/features/productapi"
import toast from 'react-hot-toast';
import Loading from '../Loading';
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  email: yup.string().required('email is required'),
  phone: yup.string().required('phone is required'),
  address: yup.string().required('address is required'),
  contact: yup.string().required('contact is required'),
  landSize: yup.string().required('Land Size is required'),
  terms: yup.string().required('terms is required'),
  notes: yup.string().required('notes is required'),
  mainCrop: yup.string().required('Main Crop is required'),
  isActive:yup.boolean().default(true)
});

const OnboardingFarmerEdit = ({role,id}:{role:string;id:string}) => {
 const router = useRouter()
 console.log(id)
const [editFarmer,{isSuccess,isLoading}]=useEditFarmerMutation()
const {data,isLoading:isSingleLoading}=useGetSingleFarmerQuery(id)
console.log(data)
  const [image, setImage] = useState<string|null>(null);
  const {
    register,
    handleSubmit,
    reset,watch,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues:{
      isActive:true,
    }
  });

  const isActive = watch("isActive")
  const {data:products} =useGetProductQuery()
  const [productIds, setProductIds] = useState<OptionType[]>([]);
  async function onSubmit(data:any) { 
    const uniqueCode = generateUniqueCode(data.name);
    data.isActive = isActive;
    data.imgUrl  = image;
    data.uniqueCode =uniqueCode;
    data.productIds=productIds.map((item)=>item.value);
    data.userId = data.id
    editFarmer(data)
  }
  useEffect(()=>{
  if(isSuccess){
    toast.success("Farmer details add!")
    router.push("/")
  }
  },[isSuccess,router])
  useEffect(()=>{
   if(data){
    console.log(data)
    reset(data)
    setImage(data.imgUrl)
   }
   if(data?.product){
    setProductIds(data?.product?.map((item)=>({label:item.name,value:item.id})))
   }
  },[data,reset])
  if(isLoading){
    <div><Loading/></div>
  }
  if(isSingleLoading){
    <div><Loading/></div>
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
         <SelectInput setMarket={setProductIds} data={products?.map((item)=>({label:item?.name,value:item?.id}))??[]}/>
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
          <SubmitButton loading={isLoading} title="Add Farmer" />
        </form>
      </div>
    </div>
  );
};

export default OnboardingFarmerEdit;
