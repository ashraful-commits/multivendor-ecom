"use client"
import React from "react";
import { useGetCategoryQuery } from "../../../lib/features/categoryapi"; // Updated import path
import { CategoryColumns } from '../Columns';
import { DataTable } from './../ReusableTable';
import Loading from './../../Loading';
const CategoryTable = () => {
    const { data: categories, error, isLoading } = useGetCategoryQuery();

    if (isLoading) return <div className="w-full min-h-[500px] mx-auto my-auto"><Loading className="mx-auto my-auto"/></div>;
   
    

  return (
    <div>
      <DataTable columns={CategoryColumns} data={categories||[]} />
    </div>
  );
};

export default CategoryTable;
