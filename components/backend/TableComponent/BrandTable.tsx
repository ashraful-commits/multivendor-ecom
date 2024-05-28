"use client"
import React from "react";

import { useGetBrandQuery } from "../../../lib/features/brandapi"; // Updated import path
import { brandColumns } from '../Columns';
import { DataTable } from './../ReusableTable';
import Loading from './../../Loading';

import TableSkeleton from './TableSkeleton';
const BrandTable = () => {
    const { data: brands, error, isLoading } = useGetBrandQuery();

    if (isLoading) return <TableSkeleton/>
    
   
   

  return (
    <div>
      <DataTable columns={brandColumns} data={brands||[]} />
    </div>
  );
};

export default BrandTable;
