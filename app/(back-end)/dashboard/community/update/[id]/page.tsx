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
import QuillEditor from "@/components/backend/Form/QuillEditor";
import { DatePickerDemo } from "@/components/backend/Form/DatePicker";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { generateCoupon } from "@/lib/generateCoupon";
import { ToggleInput } from "@/components/backend/Form/ToggleInput";
import FormContainer from "@/components/backend/FormContainer";
import { getData } from "@/lib/apiRequest";
import { SingleSelect } from "@/components/backend/Form/SingleSelect";
import { useRouter, useParams } from 'next/navigation';
import { useEditCommunityMutation,useGetSingleCommunityQuery} from "@/lib/features/communityapi";
import toast from "react-hot-toast";
import { Option } from './../../../../../../typescript';
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  isActive: yup.boolean().default(true),
});
type FieldValues = {
  title: string;
  description: string;
  isActive: boolean;
};
const UpdateCommunity = () => {
  const {id}= useParams<{id:string}>()
  const router = useRouter();
  const {data} =useGetSingleCommunityQuery(id);
  const [editCommunity, { isLoading, isSuccess }] =useEditCommunityMutation();
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
  const isActive = watch("isActive");
  const [content, setContent] = useState<string>("");
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [categories, setCategories] = useState<Option[]>([]);

  async function onSubmit(data: any) {
    const slug = generateSlug(data.title);

    data.slug = slug;
    data.category = category;
    data.content = content;
    if (image) {
      data.imgUrl = image;
      editCommunity(data);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const allData = await getData("categories");
      setCategories(allData);
    };
    fetchData();
  }, []);
  useEffect(() => {
    if(data){
      reset(data)
      setImage(data.imgUrl)
    }else if (isSuccess) {
      toast.success("Community updated!");
      router.push("/dashboard/community");
    }else{
      toast.dismiss()
    }
  }, [isSuccess, router,data,reset]);
  return (
    <div className="">
      <FromHeader title="Update Training" href={"/dashboard/community"} />
      <FormContainer>
        <div className="bg-slate-800 dark:bg-white border border-slate-800 dark:border-slate-200 rounded-md p-5">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="text-white dark:text-slate-900"
          >
            <TextInput
              register={register}
              errors={errors?.title?.message}
              name="title"
              label="title"
              placeholder="Training Title"
            />
            <TextArea
              register={register}
              errors={errors?.description?.message}
              name="description"
              label="Description"
              placeholder="Training description"
            />
            <div className="flex gap-x-4  flex-col ">
              <Label
                className="text-md text-white dark:text-slate-900 text-start capitalize my-1"
                htmlFor={"markets"}
              >
                Blog content
              </Label>
              {/* <QuillEditor setValue={setContent} value={content} /> */}
              <Label
                className="text-md text-white dark:text-slate-900 text-start capitalize my-1"
                htmlFor={"markets"}
              >
                Category
              </Label>

              <SingleSelect
                setValue={setCategory}
                value={category}
                data={categories.map((item) => ({
                  name: item.name,
                  id: item.id,
                }))}
              />
              <Label
                className="text-md text-white dark:text-slate-900 text-start capitalize my-1"
                htmlFor={"image"}
              >
                Image Upload
              </Label>
              <ImageUpload
                endpoint="trainingImageUpload"
                setImage={setImage}
                image={image}
              />
            </div>
            <ToggleInput
              label="Publish training"
              name="isActive"
              register={register}
            />
            <SubmitButton loading={isLoading} title="Update Training" />
          </form>
        </div>
      </FormContainer>
    </div>
  );
};

export default UpdateCommunity;
