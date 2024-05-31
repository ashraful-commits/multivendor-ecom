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
import { generateUniqueCode } from "@/lib/generateUniqueCode";
import { makePostRequest } from "@/lib/apiRequest";
import ImageUpload from "@/components/backend/Form/ImageInput";
import { DatePickerDemo } from "@/components/backend/Form/DatePicker";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToggleInput } from "@/components/backend/Form/ToggleInput";
import { useRouter } from "next/navigation";

import { useAddNewUserMutation } from "@/lib/features/userapi";
import { imageRemove } from "@/lib/ImageRemove";
import { toast } from "react-hot-toast";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().required("email is required"),
  password: yup.string().required("password is required"),
});
type FieldValues = {
  name: string;
  email: string;
  password: string;
};

const NewUser = () => {
  const [addNewUser, { isLoading, isSuccess }] = useAddNewUserMutation();
  const [image, setImage] = useState<string | null>(null);
  const [role, setUserRole] = useState<string>("USER");
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

  async function onSubmit(data: any) {
    if (image) {
      data.imgUrl = image;
      data.role=role
      addNewUser(data);
    }
  }
  useEffect(() => {
    if (isSuccess) {
      toast.success("user Added!");
      router.push("/dashboard/users");
    }
  });
  return (
    <div className="">
      <FromHeader title="Add New User" href={"/dashboard/users"} />

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
            placeholder="user name"
          />

          <TextInput
            register={register}
            errors={errors?.email?.message}
            type="email"
            name="email"
            label="email"
            placeholder="user email"
          />
          <TextInput
            register={register}
            errors={errors?.password?.message}
            type="password"
            name="password"
            label="password"
            placeholder="user password"
          />

          <Select onValueChange={setUserRole} >
            <SelectTrigger className="w-[180px] bg-slate-800 dark:bg-slate-100 text-slate-100 dark:text-slate-900">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 dark:bg-slate-100 text-slate-100 dark:text-slate-900">
              <SelectGroup>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="USER">User</SelectItem>
                <SelectItem value="FARMER">Farmer</SelectItem>
                <SelectItem value="CUSTOMER">Customer</SelectItem>
                <SelectItem value="SELLER">Seller</SelectItem>
                <SelectItem value="MODERATOR">Moderator</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="flex gap-x-4  flex-col ">
            <Label
              className="text-md text-white dark:text-slate-900 text-start capitalize my-1"
              htmlFor={"image"}
            >
              Image Upload
            </Label>
            <ImageUpload
              endpoint="registerImageUpload"
              setImage={setImage}
              image={image}
            />
          </div>

          <SubmitButton loading={isLoading} title="Add user" />
        </form>
      </div>
    </div>
  );
};

export default NewUser;
