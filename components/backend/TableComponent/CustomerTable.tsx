"use client"
import React from "react";
import { useGetCustomerQuery } from "../../../lib/features/customerapi"; // Updated import path
import { DataTable } from './../ReusableTable';
import { CustomerColumns } from '../Columns';
import Loading from './../../Loading';
const CustomerTable = () => {
    const { data: customers, error, isLoading } = useGetCustomerQuery();

    if (isLoading) return <div className="w-full min-h-[500px] mx-auto my-auto"><Loading className="mx-auto my-auto"/></div>;
   
    

  return (
    <div>
      <DataTable columns={CustomerColumns} data={customers||[]} />
    </div>
  );
};

export default CustomerTable;
