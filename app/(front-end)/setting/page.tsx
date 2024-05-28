"use client";
import React, { useEffect, useState } from "react";
import ContainerBox from "@/components/frontend/ContainerBox";
import useSessionData from "./../../../hooks/useSessionData";
import { SessionData } from "../../../typescript";
import Image from "next/image";

import ImageUpload from "../../../components/backend/Form/ImageInput";
import { useForm, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEditUserMutation } from "@/lib/features/userapi";
import * as yup from "yup";
import Loading from "../../../components/Loading";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { signOut } from "next-auth/react";
const schema = yup.object().shape({
  name: yup.string().required("Title is required"),
  email: yup.string().required("Description is required"),
});
type FieldValues = {
  name: string;
  email: string;
};
const ProfileSetting = () => {
  const router = useRouter();
  const session = useSessionData() as SessionData;
  const [image, setImage] = useState<string | null>(null);
  const [editUser, { isLoading, isSuccess }] = useEditUserMutation();
  async function signout() {
   await signOut();
  }
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: {
      ...session?.user,
    },
  });

  async function onSubmit(data: any) {
    if (image) {
      data.imgUrl = image;
      editUser(data);
    }
  }
  useEffect(() => {
    if (session) {
      setImage(session?.user?.imgUrl);
      reset(session?.user);
    } else if (isSuccess) {
      signout();
      router.push("/login");
      toast.success("profile Updated");
    } else {
      toast.dismiss();
    }
  }, [session, reset, isSuccess, router]);

  return (
    <ContainerBox>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="min-h-screen p-6  flex items-center justify-center"
      >
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-semibold text-xl text-gray-600">
              Profile Setting
            </h2>
            <p className="text-gray-500 mb-6">Update your details here</p>
            <div className=" rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2">
                <div className="text-gray-600">
                  <div>
                    <div className="flex items-center flex-col space-x-6">
                      <div className="shrink-0">
                        <Image
                          width={1000}
                          height={1000}
                          id="preview_img"
                          className="h-16 w-16 object-cover rounded-full"
                          src={image ? image : "/Profile-PNG-Picture.png"}
                          alt="Current profile photo"
                        />
                      </div>
                      <label className="block">
                        <ImageUpload
                          endpoint="profileImageUpload"
                          setImage={setImage}
                          image={image}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-center items-start">
                  <div className="grid gap-4 gap-y-2  text-sm">
                    <div className="md:col-span-5">
                      <label htmlFor="full_name">Full Name</label>
                      <input
                        type="text"
                     
                        {...register(`name`, { required: true })}
                        className="h-10 border mt-1 rounded px-4 w-full bg-white dark:bg-slate-900"
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="text"
                        {...register(`email`, { required: true })}
                        
                        className="h-10 border mt-1 rounded px-4 w-full bg-white dark:bg-slate-900"
                        placeholder="email@domain.com"
                      />
                    </div>

                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <button
                          type="submit"
                          className="bg-blue-500 flex items-center gap-x-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          {isLoading && <Loading />} Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </ContainerBox>
  );
};

export default ProfileSetting;
