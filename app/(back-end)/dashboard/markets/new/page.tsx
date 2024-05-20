'use client';
import React, { useState,useEffect } from 'react';
import Heading from '../../../../../components/backend/Heading';
import { useForm,Resolver } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { X } from 'lucide-react';
import FromHeader from '../../../../../components/backend/FromHeader';
import TextInput from '../../../../../components/backend/Form/TextInput';
import { SubmitButton } from '../../../../../components/backend/Form/SubmitButton';
import TextArea from '../../../../../components/backend/Form/TextArea';
import { generateUniqueCode } from '../../../../../lib/generateUniqueCode';
import { generateSlug } from '../../../../../lib/generateSlug';
import { makePostRequest } from '../../../../../lib/apiRequest';
import ImageUpload from '../../../../../components/backend/Form/ImageInput';
import { DatePickerDemo } from '../../../../../components/backend/Form/DatePicker';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SingleSelect } from './../../../../../components/backend/Form/SingleSelect';
import FormContainer from './../../../../../components/backend/FormContainer';
import { getData } from '@/lib/apiRequest';
import { ToggleInput } from './../../../../../components/backend/Form/ToggleInput';
import { useRouter } from 'next/navigation';
import {marketType} from "../../../../../typescript"
import { Option } from './../../../../../typescript';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  isActive: yup.boolean().default(true)
});

type FieldValues ={
  name:string;
  description:string;
  isActive:boolean;
}

const Market = () => {
 

  const [image, setImage] = useState<string|null>(null);
  const [category, setCategory] = useState<Option[]>([]);
  const [selectCat, setSelectCat] = useState<string|undefined>("");
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
 const getAllCat=async()=>{
  const allCategory = await getData("categories")
  setCategory(allCategory)
 }
 getAllCat()
  },[])
  const {
    register,
    handleSubmit,
    reset,watch,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues:{
      isActive:true
    }
  })
  const isActive =watch('isActive')
  const router = useRouter()
  function redirect(){
    router.push("/dashboard/markets")
  }
  async function onSubmit(data: any) {
    const slug = generateSlug(data.name);
    setLoading(true);
    makePostRequest(setLoading, '/api/markets', {...data, slug, categoryIds: selectCat, imgUrl: image}, 'Market', reset, redirect);
  }
  

  return (
    <div className="">
      <FromHeader title="Add New Market" href={'/dashboard/markets'} />
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
            placeholder="Market name"
          />
        
         
          <TextArea
            register={register}
            errors={errors?.description?.message}
            name="description"
            label="Description"
            placeholder="Market description"
          />
           <Label
              className="text-md text-white dark:text-slate-900 text-start capitalize my-4 inline-block"
              htmlFor={'image'}
            >
              Category
            </Label>

            <SingleSelect
             setValue={setSelectCat}
              value={selectCat}
              data={category?.map(item => ({ name: item.name, id: item.id }))}
            />
          
          <div className="flex gap-x-4  flex-col ">
            <Label
              className="text-md text-white dark:text-slate-900 text-start capitalize my-1"
              htmlFor={'image'}
            >
              Image Upload
            </Label>
            <ImageUpload
              endpoint="marketImageUpload"
              setImage={setImage}
              image={image}
            />
          </div>
          <ToggleInput label="Publish Category" name="isActive" register={register}/>
          <SubmitButton loading={loading} title="Add Market" />
        </form>
      </div>
      </FormContainer>
    </div>
  );
};

export default Market;
