"use client"
import React from "react";
import { useGetTagQuery } from "../../../lib/features/tagapi"; // Updated import path
import { DataTable } from './../ReusableTable';
import { TagColumns } from '../Columns';
import Loading from './../../Loading';

const TagTable = () => {
    const { data: tags, error, isLoading } = useGetTagQuery();

    if (isLoading) return <div className="w-full min-h-[500px] mx-auto my-auto"><Loading className="mx-auto my-auto"/></div>;
   
    

  return (
    <div>
      <DataTable columns={TagColumns} data={tags||[]} />
    </div>
  );
};

export default TagTable;
