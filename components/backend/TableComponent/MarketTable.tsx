"use client"
import React from "react";
import { useGetMarketQuery } from "../../../lib/features/marketapi"; // Updated import path
import { DataTable } from './../ReusableTable';
import { MarketColumns } from '../Columns';
import Loading from './../../Loading';
import TableSkeleton from "./TableSkeleton"
const MarketTable = () => {
    const { data: markets, error, isLoading } = useGetMarketQuery();

    if (isLoading) return <TableSkeleton/>
   
    

  return (
    <div>
      <DataTable columns={MarketColumns} data={markets||[]} />
    </div>
  );
};

export default MarketTable;
