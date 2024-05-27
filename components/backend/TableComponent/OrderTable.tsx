"use client"
import React from "react";
import { useGetOrderQuery } from "@/lib/features/orderapi"; // Updated import path
import { DataTable } from './../ReusableTable';
import { OrderColumns } from './../Columns';
import Loading from './../../Loading';
const OrderTable = () => {
    const { data: orders,error, isLoading } = useGetOrderQuery();
    if (isLoading) return <div className="w-full min-h-[500px] mx-auto my-auto"><Loading className="mx-auto my-auto"/></div>;
  return (
    <div>
      <DataTable columns={OrderColumns} data={orders||[]} />
    </div>
  );
};

export default OrderTable;
