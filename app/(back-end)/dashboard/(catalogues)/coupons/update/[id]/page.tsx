"use client";
import React, { useState, useEffect } from "react";
import Heading from "@/components/backend/Heading";
import { useForm, Resolver } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { X } from "lucide-react";
import FromHeader from "@/components/backend/FromHeader";
import TextInput from "@/components/backend/Form/TextInput";
import { SubmitButton } from "@/components/backend/Form/SubmitButton";
import TextArea from "@/components/backend/Form/TextArea";
import { generateSlug } from "@/lib/generateSlug";
import { makePostRequest } from "@/lib/apiRequest";
import ImageUpload from "@/components/backend/Form/ImageInput";
import { DatePickerDemo } from "@/components/backend/Form/DatePicker";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { generateCoupon } from "@/lib/generateCoupon";
import { ToggleInput } from "@/components/backend/Form/ToggleInput";
import { useRouter, useParams } from "next/navigation";
import FormContainer from "@/components/backend/FormContainer";
import { couponType } from "./../../../../../../../typescript";
import toast from "react-hot-toast";
import {
  useEditCouponMutation,
  useGetSingleCouponQuery,
} from "@/lib/features/couponsapi";
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  date: yup.string(),
  isActive: yup.boolean().default(true),
});
type FieldValues = {
  name: string;
  date: string;
  isActive: boolean;
};
const UpdateCoupon = () => {
  const { id } = useParams<{id:string}>();
  const [editCoupon, { isSuccess, isLoading }] = useEditCouponMutation();
  const { data } = useGetSingleCouponQuery(id);
  const router = useRouter();
  const [date, setDate] = useState<Date>();

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
  async function onSubmit(data: any) {
    const coupon = generateCoupon(data.name, date);
    data.coupon = coupon;
    data.isActive = isActive;
    data.date = date;
    editCoupon(data);
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success("Coupon added!");
      router.push("/dashboard/coupons");
    } if (data) {
      reset(data);
    }
  }, [isSuccess, router, data, reset]);

  return (
    <div className="">
      <FromHeader title="Update  Coupons" href={"/dashboard/coupons"} />
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
            <SubmitButton loading={isLoading} title="Update Coupons" />
          </form>
        </div>
      </FormContainer>
    </div>
  );
};

export default UpdateCoupon;
