"use client"
import FromHeader from '@/components/backend/FromHeader';
import FormContainer from '@/components/backend/FormContainer';
import ProductUpdateForm from '@/components/backend/ProductUpdateForm';
import {useParams} from "next/navigation"
const NewProduct =() => {
    const {id} =useParams<{id:string}>()
  return (
    <div className="">
      <FromHeader title="Update Product" href={'/dashboard/products'} />
      <FormContainer>
      <ProductUpdateForm id={id}/>
      </FormContainer>
    </div>
  );
};

export default NewProduct;
