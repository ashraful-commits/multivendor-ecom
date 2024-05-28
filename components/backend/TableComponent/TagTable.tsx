"use client"
import React from "react";
import { useGetTagQuery } from "../../../lib/features/tagapi"; // Updated import path
import { DataTable } from './../ReusableTable';
import { TagColumns } from '../Columns';
import Loading from './../../Loading';
import TableSkeleton from "./TableSkeleton"
const TagTable = () => {
    const { data: tags, error, isLoading } = useGetTagQuery();

    if (isLoading) return <TableSkeleton/>
   
    

  return (
    <div>
      <DataTable columns={TagColumns} data={tags||[]} />
    </div>
  );
};

export default TagTable;
