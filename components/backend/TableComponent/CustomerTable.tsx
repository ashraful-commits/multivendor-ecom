"use client"
import React from "react";
import { useGetCustomerQuery } from "../../../lib/features/customerapi"; // Updated import path
import { DataTable } from './../ReusableTable';
import { CustomerColumns } from '../Columns';
import Loading from './../../Loading';
import TableSkeleton from "./TableSkeleton"
const CustomerTable = () => {
    const { data: customers, error, isLoading } = useGetCustomerQuery();

    if (isLoading) return <TableSkeleton/>
   
    

  return (
    <div>
      <DataTable columns={CustomerColumns} data={customers||[]} />
    </div>
  );
};

export default CustomerTable;
