"use client"
import React,{useState} from 'react'
import Heading from './../../../../../../components/backend/Heading';
import {useForm} from "react-hook-form"
import {Label} from "@/components/ui/label"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link  from 'next/link';
import {X} from "lucide-react"
import FromHeader from './../../../../../../components/backend/FromHeader';
import TextInput from './../../../../../../components/backend/Form/TextInput';
import {SelectInput} from './../../../../../../components/backend/Form/SelectInput';
import { SubmitButton } from './../../../../../../components/backend/Form/SubmitButton';
import TextArea from './../../../../../../components/backend/Form/TextArea';
import { generateSlug } from './../../../../../../lib/generateSlug';
import { makePostRequest } from './../../../../../../lib/apiRequest';
import ImageUpload from './../../../../../../components/backend/Form/ImageInput';
import { DatePickerDemo } from './../../../../../../components/backend/Form/DatePicker';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { generateCoupon } from './../../../../../../lib/generateCoupon';
import FormContainer from './../../../../../../components/backend/FormContainer';
import { ToggleInput } from './../../../../../../components/backend/Form/ToggleInput';
import { useRouter } from 'next/navigation';
import {brandType} from "../../../../../../typescript"

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  isActive: yup.boolean().default(true)
});
type FieldValues ={
  name:string;
  isActive:boolean;
}
const NewBrand = () => {

  const [image,setImage] = useState<string|null>(null)
  const {register,handleSubmit,watch,reset,formState:{errors}} = useForm<FieldValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      isActive: true,
    },
  })
  const isActive = watch("isActive")
  const [loading,setLoading] = useState(false)
  const router = useRouter()
  function redirect(){
    router.push("/dashboard/brands")
  }

  async function onSubmit(data:brandType){
    const slug = generateSlug(data.name)
    data.slug = slug;
    data.imgUrl = image;
    data.isActive = isActive;
    setLoading(true);
    makePostRequest(
      setLoading,
      "/api/brands",
      data,
      "Brand",
      reset,redirect
    )
    }
  return (
    <div className="">
     <FromHeader title="Add New Brand" href={"/dashboard/brands"}/>
   <FormContainer>
     <div className="bg-slate-800 dark:bg-white border border-slate-800 dark:border-slate-200 rounded-md p-5">
      <form onSubmit={handleSubmit(onSubmit)} className="text-white dark:text-slate-900">
   <TextInput register={register} errors={errors?.name?.message} name="name" label="name" placeholder="brand name" />
   
  <Label className="text-md text-white dark:text-slate-900 text-start capitalize my-1" htmlFor={"image"}>Image Upload</Label>
  <ImageUpload endpoint="imageUploader" setImage={setImage} image={image}/>

 <ToggleInput name="isActive" register={register} label="Publish Brand"/>
   <SubmitButton loading={loading}
title="Add Category"/>
      </form>
     </div>
     </FormContainer>
    </div>
  )
}

export default NewBrand
