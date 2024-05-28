"use client"
import React from "react";
import { useGetFarmerQuery } from "../../../lib/features/farmerapi"; // Updated import path
import { DataTable } from './../ReusableTable';
import { FarmerColumns } from '../Columns';
import Loading from './../../Loading';
import TableSkeleton from "./TableSkeleton"
const FarmerTable = () => {
    const { data: farmers, error, isLoading } = useGetFarmerQuery();

    if (isLoading) return <TableSkeleton/>
   

  return (
    <div>
      <DataTable columns={FarmerColumns} data={farmers||[]} />
    </div>
  );
};

export default FarmerTable;
