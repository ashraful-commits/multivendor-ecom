"use client"
import React from "react";
import { useGetOrderQuery } from "@/lib/features/orderapi"; // Updated import path
import { DataTable } from './../ReusableTable';
import { OrderColumns } from './../Columns';
import Loading from './../../Loading';
import TableSkeleton from "./TableSkeleton"
const OrderTable = () => {
    const { data: orders,error, isLoading } = useGetOrderQuery();
    if (isLoading) return <TableSkeleton/>
  return (
    <div>
      <DataTable columns={OrderColumns} data={orders||[]} />
    </div>
  );
};

export default OrderTable;
