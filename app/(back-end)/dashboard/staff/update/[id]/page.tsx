'use client';
import React, { useState,useEffect } from 'react';
import Heading from '@/components/backend/Heading';
import { useForm,Resolver } from 'react-hook-form';
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
import { ToggleInput } from '@/components/backend/Form/ToggleInput';
import { useRouter } from 'next/navigation';
import { staffType } from '../../../../../../typescript';
import {useEditStaffMutation,useGetSingleStaffQuery} from "@/lib/features/staffapi"
import { imageRemove } from '@/lib/ImageRemove';
import {useParams} from "next/navigation";
import { toast } from 'react-hot-toast';
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Decription is required'),
  email: yup.string().required('email is required'),
  phone: yup.string().required('phone is required'),
  address: yup.string().required('address is required'),
  idNumber: yup.string().required('idNumber is required'),
  notes: yup.string().required('notes is required'),
  isActive: yup.boolean().default(true)
});
type FieldValues ={
  name:string;
  description:string;
  email:string;
  phone:string;
  address:string;
  idNumber:string;
  notes:string;
  isActive:boolean;
}

const EditStaff = () => {
  const {id} = useParams<{id:string}>()
  const [editStaff,{isLoading,isSuccess}]= useEditStaffMutation()
  const {data}= useGetSingleStaffQuery(id)
  const [image, setImage] = useState<string|null>(null);
  const router = useRouter();
 
  
  
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: {
      isActive: true,
    },
  });
  const isActive = watch('isActive');
  const [date, setDate] = useState<Date|undefined>(undefined);
  async function onSubmit(data: any) {
    const code = generateUniqueCode(data.name);
    data.isActive = isActive;
    data.dob = date;
    data.code = code
    if(image){
      data.imgUrl = image
      editStaff(data)
    }

}
useEffect(()=>{
  if(data){
    reset(data)
    setImage(data.imgUrl)
  } if(isSuccess){
    toast.success("Staff Updated!")
    router.push('/dashboard/staff');
  }
},[isSuccess,router,data,reset])
  return (
    <div className="">
      <FromHeader title="Edit Staff" href={'/dashboard/staff'} />

      <div className="bg-slate-800 dark:bg-white border border-slate-800 dark:border-slate-200 rounded-md p-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="text-white dark:text-slate-900"
        >
          <TextInput
            register={register}
            errors={errors?.name?.message}
            name="name"
            label="name"
            placeholder="staff name"
          />
          <TextInput
            register={register}
            errors={errors?.phone?.message}
            name="phone"
            label="phone"
            type="tel"
            placeholder="staff phone"
          />
          <TextInput
            register={register}
            errors={errors?.email?.message}
            type="email"
            name="email"
            label="email"
            placeholder="staff email"
          />
         
          <TextInput
            register={register}
            errors={errors?.idNumber?.message}
            type="text"
            name="idNumber"
            label="NIN (Id Number)"
            placeholder="Enter nin number"
          />
          <Label
            className="text-md text-white dark:text-slate-900 text-start capitalize flex gap-x-5 items-center my-3"
            htmlFor={'date'}
          >
            Date of Birth
            <DatePickerDemo date={date} setDate={setDate} />
          </Label>
          <TextInput
            register={register}
            errors={errors?.address?.message}
            name="address"
            label="address"
            placeholder="staff address"
          />

          <TextArea
            register={register}
            errors={errors?.description?.message}
            name="description"
            label="Description"
            placeholder="staff description"
          />

          <TextArea
            register={register}
            errors={errors?.notes?.message}
            name="notes"
            label="notes"
            placeholder="staff notes"
          />
          <div className="flex gap-x-4  flex-col ">
            <Label
              className="text-md text-white dark:text-slate-900 text-start capitalize my-1"
              htmlFor={'image'}
            >
              Image Upload
            </Label>
            <ImageUpload
              endpoint="staffImageUpload"
              setImage={setImage}
              image={image}
            />
          </div>
          <ToggleInput
            label="Publish staff"
            register={register}
            name={'isActive'}
          />
          <SubmitButton loading={isLoading} title="Update Staff" />
        </form>
      </div>
    </div>
  );
};

export default EditStaff;
