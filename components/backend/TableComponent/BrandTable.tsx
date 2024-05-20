"use client"
import React from "react";

import { useGetBrandQuery } from "../../../lib/features/brandapi"; // Updated import path
import { brandColumns } from '../Columns';
import { DataTable } from './../ReusableTable';
import Loading from './../../Loading';
const BrandTable = () => {
    const { data: brands, error, isLoading } = useGetBrandQuery();

    if (isLoading) return <div className="w-full min-h-[500px] mx-auto my-auto"><Loading className="mx-auto my-auto"/></div>;
   
   

  return (
    <div>
      <DataTable columns={brandColumns} data={brands||[]} />
    </div>
  );
};

export default BrandTable;
