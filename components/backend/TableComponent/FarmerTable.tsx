"use client"
import React from "react";
import { useGetFarmerQuery } from "../../../lib/features/farmerapi"; // Updated import path
import { DataTable } from './../ReusableTable';
import { FarmerColumns } from '../Columns';
import Loading from './../../Loading';

const FarmerTable = () => {
    const { data: farmers, error, isLoading } = useGetFarmerQuery();

    if (isLoading) return <div className="w-full min-h-[500px] mx-auto my-auto"><Loading className="mx-auto my-auto"/></div>;
   

  return (
    <div>
      <DataTable columns={FarmerColumns} data={farmers||[]} />
    </div>
  );
};

export default FarmerTable;
