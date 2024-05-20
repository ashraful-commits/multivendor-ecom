"use client"
import React from "react";
import { useGetMarketQuery } from "../../../lib/features/marketapi"; // Updated import path
import { DataTable } from './../ReusableTable';
import { MarketColumns } from '../Columns';
import Loading from './../../Loading';

const MarketTable = () => {
    const { data: markets, error, isLoading } = useGetMarketQuery();

    if (isLoading) return <div className="w-full min-h-[500px] mx-auto my-auto"><Loading className="mx-auto my-auto"/></div>;
   
    

  return (
    <div>
      <DataTable columns={MarketColumns} data={markets||[]} />
    </div>
  );
};

export default MarketTable;
