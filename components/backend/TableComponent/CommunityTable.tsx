"use client"
import React from "react";
import { useGetCommunityQuery } from "../../../lib/features/communityapi"; // Updated import path
import Loading from './../../Loading';
import { DataTable } from './../ReusableTable';
import { CommunityColumns } from './../Columns';
import TableSkeleton from "./TableSkeleton"
const CommunityTable = () => {
    const { data: communities, error, isLoading } = useGetCommunityQuery();

    if (isLoading) return <TableSkeleton/>
   
    

  return (
    <div>
      <DataTable columns={CommunityColumns} data={communities||[]} />
    </div>
  );
};

export default CommunityTable;
