"use client"
import React, { useState ,useEffect} from 'react';
import Heading from '@/components/backend/Heading';
import { useForm,Resolver } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { X } from 'lucide-react';
import FromHeader from '@/components/backend/FromHeader';
import TextInput from '@/components/backend/Form/TextInput'; // Corrected import
import { SelectInput } from '@/components/backend/Form/SelectInput';
import { SubmitButton } from '@/components/backend/Form/SubmitButton';
import TextArea from '@/components/backend/Form/TextArea';
import { generateSlug } from '@/lib/generateSlug';
import { makePostRequest } from '@/lib/apiRequest';
import ImageUpload from '@/components/backend/Form/ImageInput';
import { DatePickerDemo } from '@/components/backend/Form/DatePicker';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { generateCoupon } from '@/lib/generateCoupon';
import FormContainer from '@/components/backend/FormContainer';
import { ToggleInput } from '@/components/backend/Form/ToggleInput';
import { tagType } from '../../../../../../typescript';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {useAddNewTagMutation} from "@/lib/features/tagapi"
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  isActive: yup.boolean().default(true),
  date: yup.date(),
});
type FieldValues ={
  name:string;
  date:string;
  isActive:boolean;
}
const NewTags = () => {
  const [addNewTag,{isSuccess,isLoading}] = useAddNewTagMutation()

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

  
  
  const isActive = watch("isActive");
  
  async function onSubmit(data:  any) {
    const slug = generateSlug(data.name);
   data.slug= slug;
   data.isActive = isActive;
    addNewTag(data)
  };
  
  useEffect(()=>{
    if(isSuccess){
      toast.success("Tag add!")
      router.push('/dashboard/tags');
  }
 },[isSuccess,router])
  return (
    <div className="">
      <FromHeader title="Add New Tag" href={'/dashboard/tags'} /> {/* Fixed the import */}
      <FormContainer>
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
              placeholder="Tag name"
            />

            <ToggleInput
              register={register}
              name="isActive"
              label="Publish tag"
            />
            <SubmitButton loading={isLoading} title="Add Tag" />
          </form>
        </div>
      </FormContainer>
    </div>
  );
};

export default NewTags;
