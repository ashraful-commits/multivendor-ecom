'use client';
import React, { useState } from 'react';
import Heading from './../../../../../../components/backend/Heading';
import { useForm,Resolver } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { X } from 'lucide-react';
import FromHeader from './../../../../../../components/backend/FromHeader';
import TextInput from './../../../../../../components/backend/Form/TextInput';
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
import { couponType } from './../../../../../../typescript';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  date: yup.string(),
  isActive: yup.boolean().default(true),
});
type FieldValues ={
  name:string;
  date:string;
  isActive:boolean;
}
const NewCategory = () => {
  const router = useRouter();
  function redirect() {
    router.push('/dashboard/coupons');
  }
  const [date, setDate] = useState<Date>();


  const [loading, setLoading] = useState(false);
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
  async function onSubmit(data: any) {
    const coupon = generateCoupon(data.name,date);
    setLoading(true);
    makePostRequest(
      setLoading,
      '/api/coupons',
      { ...data, coupon, date},
      'Coupons',
      reset,
      redirect,
    );
}

  return (
    <div className="">
      <FromHeader title="Add New Coupons" href={'/dashboard/coupons'} />
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
              placeholder="Coupon name"
            />
            <div className="flex gap-x-4 flex-col gap-y-3 w-full">
              <Label
                className="text-md text-white dark:text-slate-900 inline-block capitalize my-3 mr-5"
                htmlFor="date"
              >
                Coupon Expiry Date
              </Label>
              <DatePickerDemo date={date} setDate={setDate} />

            </div>
            <ToggleInput
              register={register}
              label="Publish coupon"
              name="isActive"
            />
            <SubmitButton loading={loading} title="Add Coupons" />
          </form>
        </div>
      </FormContainer>
    </div>
  );
};

export default NewCategory;
