'use client';
import React, { useState, useEffect } from 'react';
import Heading from '@/components/backend/Heading';
import { useForm, FieldValues } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { X } from 'lucide-react';
import FromHeader from '@/components/backend/FromHeader';
import TextInput from '@/components/backend/Form/TextInput';
import { SubmitButton } from '@/components/backend/Form/SubmitButton';
import TextArea from '@/components/backend/Form/TextArea';
import { generateSlug } from '@/lib/generateSlug';
import { makePostRequest } from '@/lib/apiRequest';
import ImageUpload from '@/components/backend/Form/ImageInput';
import { DatePickerDemo } from '@/components/backend/Form/DatePicker';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { generateCoupon } from '@/lib/generateCoupon';
import { ToggleInput } from '@/components/backend/Form/ToggleInput';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import FormContainer from '@/components/backend/FormContainer';
import { useEditBannerMutation, useGetSingleBannerQuery } from "@/lib/features/bannerapi";
import { useParams } from "next/navigation";

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  link: yup.string().required('Link is required'),
  isActive: yup.boolean().default(true),
  imgUrl: yup.string()
});

const UpdateBanner = () => {
  const { id } = useParams<{ id: string }>();
  const [editBanner, { isSuccess, isLoading }] = useEditBannerMutation();
  const { data } = useGetSingleBannerQuery(id);
  const router = useRouter();

  const [image, setImage] = useState<string | null>(null);

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

  useEffect(() => {
    if (data) {
      reset(data);
      setImage(data.imgUrl);
    }
  }, [data, reset]);

  const isActive = watch('isActive');

  async function onSubmit(formData: any) {
    formData.imgUrl = image ?? '';
    formData.isActive = isActive;
    console.log(formData)
    if (image) {
      await editBanner(formData);
    } else {
      toast.error('Please select an image');
    }
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('Banner updated!');
      router.push('/dashboard/banners');
    }
  }, [isSuccess, router]);

  return (
    <div className="w-full">
      <FromHeader title="Update Banner" href={'/dashboard/banners'} />
      <FormContainer>
        <div className="bg-slate-800 dark:bg-white border border-slate-800 dark:border-slate-200 rounded-md p-5 w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="text-white dark:text-slate-900"
          >
            <TextInput
              register={register}
              errors={errors?.title?.message}
              name="title"
              label="Banner Title"
              placeholder="banner title"
            />
            <TextInput
              register={register}
              errors={errors?.link?.message}
              name="link"
              label="Banner Link"
              placeholder="Banner Link"
            />

            <Label
              className="text-md text-white dark:text-slate-900 text-start capitalize my-1"
              htmlFor={'image'}
            >
              Image Upload
            </Label>
            <ImageUpload
              endpoint="bannerUploader"
              setImage={setImage}
              image={image}
            />
            <ToggleInput
              register={register}
              label="Publish Banner"
              name="isActive"
            />
            <SubmitButton loading={isLoading} title="Update Banner" />
          </form>
        </div>
      </FormContainer>
    </div>
  );
};

export default UpdateBanner;
