"use client"
import React from "react";
import { useGetProductQuery } from "../../../lib/features/productapi"; // Updated import path
import { DataTable } from './../ReusableTable';
import { ProductColumns } from '../Columns';
import Loading from './../../Loading';
import TableSkeleton from "./TableSkeleton"
const ProductTable = () => {
    const { data: products, error, isLoading } = useGetProductQuery()

    if (isLoading) return <TableSkeleton/>
   
    

  return (
    <div>
      <DataTable columns={ProductColumns} data={products||[]} />
    </div>
  );
};

export default ProductTable;
