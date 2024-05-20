'use client';
import React, { useState,useEffect } from 'react';
import Heading from './Heading';
import { useForm,Resolver } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { X } from 'lucide-react';


import { SelectInput } from './Form/SelectInput';
import { SubmitButton } from './Form/SubmitButton';
import TextArea from './Form/TextArea';
import { generateSlug } from './../../lib/generateSlug';
import { makePostRequest } from './../../lib/apiRequest';
import MultipleImageUpload from './Form/MultipleImageUpload';
import { DatePickerDemo } from './Form/DatePicker';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ToggleInput } from './Form/ToggleInput';
import { SingleSelect } from './Form/SingleSelect';
import FormContainer from './FormContainer';
import FromHeader from './FromHeader';
import TextInput from './Form/TextInput';
import { generateCoupon } from './../../lib/generateCoupon';
import { getData } from '@/lib/apiRequest';
import { useRouter } from 'next/navigation';
import ImageUpload from './Form/ImageInput';
import {FormData,OptionType} from "../../typescript"


const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  sku: yup.string().required('Sku is required'),
  barCode: yup.string().required('Bar Code is required'),
  price: yup.number().required('Price is required'),
  salesPrice: yup.number().required('Sale Price is required'),
  description: yup.string().required('Description is required'),
  wholesalesPrice: yup.number(),
  minWholeSaleQty: yup.number(),
  stock: yup.number().required('Stock is required'),
  unit: yup.number(),
  isActive: yup.boolean().default(true),
  isWholesales: yup.boolean().default(true),
});
type FieldValues ={
  name:string;
  sku:string;
  barCode:string;
  price:number;
  salesPrice:number;
  description:string;
  wholesalesPrice:number;
  minWholeSaleQty:number;
  stock:number;
  unit:number;
  isActive:boolean;
  isWholesales:boolean;

}

const ProductForm = () => {
  const [images, setImages] = useState<string[]>([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [farmers, setFarmers] = useState([]);
  const [markets, setMarkets] = useState([]);
  const [tags, setTags] = useState<string[]>([]);
  const [category, setCategory] = useState('');
  const [tag, setTag] = useState<OptionType[]>([]);
  const [brand, setBrand] = useState<string|undefined>("");
  const [farmer, setFarmer] = useState<string|undefined>("");
  const router = useRouter()
  function redirect(){
    router.push("/dashboard/products")
  }

  useEffect(()=>{
    const getAllCat=async()=>{
     const allCategory = await getData("categories")
     const allBrand = await getData("brands")
     const allTag = await getData("tags")
     const allFarmer = await getData("farmers")
     setCategories(allCategory)
     setBrands(allBrand)
     setFarmers(allFarmer)
     setTags(allTag)
    }
    getAllCat()
     },[])
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
      isWholesales: true,
    },
  });
  const isActive = watch('isActive');
  const isWholesales = watch('isWholesales');
//==================================================form submit
  const [loading, setLoading] = useState<boolean>(false);
  async function onSubmit(data:
    any) {
    const slug = generateSlug(data.name);
    const productCode = generateCoupon(data.name);
    setLoading(true)
    makePostRequest(
      setLoading, 
      '/api/products', 
      {
        ...data,
        categoryId: category,
        brandId: brand,
        imgUrl:images,
        userId: farmer,
        tagIds: tag.map((item: any) => item.value),
        productCode,
        slug: slug
      }, 
      'Product', 
      reset,
      redirect
    );
  }
  
  return (
    <div className="">
      
      <FormContainer>
        <div className="bg-slate-800 dark:bg-white border border-slate-800 dark:border-slate-200 rounded-md p-5">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="text-white w-full  gap-x-4 dark:text-slate-900"
          >
            <TextInput
              register={register}
              errors={errors?.name?.message}
              name="name"
              label="name"
              placeholder="Product name"
            />
            <TextInput
              register={register}
              errors={errors?.sku?.message}
              name="sku"
              label="sku"
              placeholder="Product sku"
            />
            <TextInput
              register={register}
              errors={errors?.barCode?.message}
              name="barCode"
              label="Bar Code"
              placeholder="Product barCode"
            />
            <TextInput
              register={register}
              errors={errors?.price?.message}
              name="price"
              type="number"
              label="price"
              placeholder="Product price"
            />
            <TextInput
              register={register}
              errors={errors?.stock?.message}
              name="stock"
              type="number"
              label="Product stock"
              placeholder="Product stock"
            />
            <TextInput
              register={register}
              errors={errors?.salesPrice?.message}
              name="salesPrice"
              type="number"
              label="Sales Price"
              placeholder="Product Sales Price"
            />
            <ToggleInput
              register={register}
              label="is support WholeSales"
              name="isWholeSales"
            />
            {/* register={register} label="publish banner" name="isActive" */}
            {isWholesales && (
              <div className="w-full">
                <TextInput
                  register={register}
                  errors={errors?.wholesalesPrice?.message}
                  name="wholesalesPrice"
                  type="number"
                  label="wholesales Price"
                  placeholder="Product wholesalesPrice"
                />
                <TextInput
                  register={register}
                  errors={errors?.minWholeSaleQty?.message}
                  name="minWholeSaleQty"
                  type="number"
                  label="Minimum wholesales qty"
                  placeholder="Product Minimum wholesales qty"
                />

                <TextInput
                  register={register}
                  errors={errors?.unit?.message}
                  name="unit"
                  type="number"
                  label="Unit of measurement(kg)"
                  placeholder="Enter unite"
                />
              </div> 
            )}

            <div className="w-full lg:col-span-2">
              <TextArea
                register={register}
                errors={errors?.description?.message}
                name="description"
                label="Description"
                placeholder="Product description"
              />
              <Label
                className="my-1 inline-block text-md text-white dark:text-slate-900 text-start capitalize "
                htmlFor={'Brands'}
              >
                Brands
              </Label>
              <SingleSelect
                setValue={setBrand}
                value={brand}
                data={brands.map((item:any)=>({name:item.name,id:item.id}))}
              />
              <Label
                className="my-1 inline-block text-md text-white dark:text-slate-900 text-start capitalize "
                htmlFor={'tags'}
              >
                Tags
              </Label>
              <SelectInput setMarket={setTag} data={tags.map((item:any)=>({label:item.name,value:item.id}))} />
              <Label
                className="my-1 inline-block text-md text-white dark:text-slate-900 text-start capitalize "
                htmlFor={'category'}
              >
                Categories
              </Label>
              <SingleSelect
                setValue={setCategory}
                value={category}
                data={categories.map((item:any)=>({name:item?.name,id:item?.id}))}
              />
              <Label
                className="my-1 inline-block text-md text-white dark:text-slate-900 text-start capitalize "
                htmlFor={'farmer'}
              >
                Farmers
              </Label>
              <SingleSelect
                setValue={setFarmer}
                value={farmer}
                data={farmers.map((item:any)=>({name:item?.name,id:item?.id}))}
              />
              <div className="flex gap-x-4  flex-col ">
                <Label
                  className="my-1 inline-block text-md text-white dark:text-slate-900 text-start capitalize "
                  htmlFor={'image'}
                >
                  Image Upload
                </Label>
               <MultipleImageUpload
                endpoint="productImageUpload"
                setImages={setImages}
                images={images}
               
              />
              </div>
              <ToggleInput
                register={register}
                label="Publish Product"
                name="isActive"
              />
              <SubmitButton loading={loading} title="Add Product" />
            </div>
          </form>
        </div>
      </FormContainer>
    </div>
  );
};

export default ProductForm;
