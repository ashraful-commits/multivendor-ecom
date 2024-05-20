"use client"
import React from "react";
import { useGetStaffQuery } from "../../../lib/features/staffapi"; // Updated import path
import { DataTable } from './../ReusableTable';
import { StaffColumns } from '../Columns';
import Loading from './../../Loading';
const StaffTable = () => {
    const { data: staffs, error, isLoading } = useGetStaffQuery();

    if (isLoading) return <div className="w-full min-h-[500px] mx-auto my-auto"><Loading className="mx-auto my-auto"/></div>;
   
    

  return (
    <div>
      <DataTable columns={StaffColumns} data={staffs||[]} />
    </div>
  );
};

export default StaffTable;
