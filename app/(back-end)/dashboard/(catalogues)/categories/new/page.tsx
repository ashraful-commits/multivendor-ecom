'use client';
import React, { useState,useEffect } from 'react';
import Heading from './../../../../../../components/backend/Heading';
import { useForm,FieldValues } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { X } from 'lucide-react';
import FromHeader from './../../../../../../components/backend/FromHeader';
import TextInput from './../../../../../../components/backend/Form/TextInput';
import { SelectInput } from './../../../../../../components/backend/Form/SelectInput';
import { SubmitButton } from './../../../../../../components/backend/Form/SubmitButton';
import TextArea from './../../../../../../components/backend/Form/TextArea';
import { generateSlug } from './../../../../../../lib/generateSlug';
import { makePostRequest } from './../../../../../../lib/apiRequest';
import ImageUpload from './../../../../../../components/backend/Form/ImageInput';
import { DatePickerDemo } from './../../../../../../components/backend/Form/DatePicker';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { generateCoupon } from './../../../../../../lib/generateCoupon';
import { ToggleInput } from './../../../../../../components/backend/Form/ToggleInput';
import { useRouter } from 'next/navigation';
import FormContainer from './../../../../../../components/backend/FormContainer';
import { categoryType } from './../../../../../../typescript';
import {useAddNewCategoryMutation} from "@/lib/features/categoryapi"
import toast from 'react-hot-toast';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  isActive: yup.boolean().default(true),
  slug: yup.string(),
  imgUrl: yup.string().nullable(),
  
});

const NewCategory = () => {
  const [addNewCategory,{isSuccess,isLoading}]=useAddNewCategoryMutation()
  const router = useRouter();

  const [image, setImage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: {
      isActive: true,
    },
  });
  const isActive = watch('isActive');
  const [loading, setLoading] = useState(false);

  async function onSubmit(data: any) {
    if (image) {
      setLoading(true);
      const slug = generateSlug(data.name);
      data.slug = slug;
      data.imgUrl = image;
     addNewCategory(data)
    }
  }
  useEffect(()=>{
    if(isSuccess){
      router.push('/dashboard/categories');
      toast.success("Category Add !")
    }
  },[router,isSuccess])
  return (
    <div className="">
      <FromHeader title="Add New Category" href={'/dashboard/categories'} />
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
              placeholder="category name"
            />
            <TextArea
              register={register}
              errors={errors?.description?.message}
              name="description"
              label="Description"
              placeholder="category description"
            />
            <div className="flex gap-x-4  flex-col ">
              <Label
                className="text-md text-white dark:text-slate-900 text-start capitalize my-1"
                htmlFor={'image'}
              >
                Image Upload
              </Label>
              <ImageUpload
                endpoint="imageUploader"
                setImage={setImage}
                image={image}
              />
            </div>
            <ToggleInput
              label="Publish Category"
              name="isActive"
              register={register}
            />
            <SubmitButton loading={isLoading} title="Add Category" />
          </form>
        </div>
      </FormContainer>
    </div>
  );
};

export default NewCategory;
