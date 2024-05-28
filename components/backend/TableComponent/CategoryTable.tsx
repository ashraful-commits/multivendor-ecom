"use client"
import React from "react";
import { useGetCategoryQuery } from "../../../lib/features/categoryapi"; // Updated import path
import { CategoryColumns } from '../Columns';
import { DataTable } from './../ReusableTable';
import Loading from './../../Loading';
import TableSkeleton from "./TableSkeleton"

const CategoryTable = () => {
    const { data: categories, error, isLoading } = useGetCategoryQuery();

    if (isLoading) return <TableSkeleton/>;
   
    

  return (
    <div>
      <DataTable columns={CategoryColumns} data={categories||[]} />
    </div>
  );
};

export default CategoryTable;
