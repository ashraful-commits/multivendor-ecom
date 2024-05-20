"use client"
import React from "react";
import { useGetCommunityQuery } from "../../../lib/features/communityapi"; // Updated import path
import Loading from './../../Loading';
import { DataTable } from './../ReusableTable';
import { CommunityColumns } from './../Columns';

const CommunityTable = () => {
    const { data: communities, error, isLoading } = useGetCommunityQuery();

    if (isLoading) return <div className="w-full min-h-[500px] mx-auto my-auto"><Loading className="mx-auto my-auto"/></div>;
   
    

  return (
    <div>
      <DataTable columns={CommunityColumns} data={communities||[]} />
    </div>
  );
};

export default CommunityTable;
