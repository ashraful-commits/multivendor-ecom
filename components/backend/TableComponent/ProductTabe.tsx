"use client"
import React from "react";
import { useGetProductQuery } from "../../../lib/features/productapi"; // Updated import path
import { DataTable } from './../ReusableTable';
import { ProductColumns } from '../Columns';
import Loading from './../../Loading';

const ProductTable = () => {
    const { data: products, error, isLoading } = useGetProductQuery()

    if (isLoading) return <div className="w-full min-h-[500px] mx-auto my-auto"><Loading className="mx-auto my-auto"/></div>;
   
    

  return (
    <div>
      <DataTable columns={ProductColumns} data={products||[]} />
    </div>
  );
};

export default ProductTable;
