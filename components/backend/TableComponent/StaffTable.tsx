"use client"
import React from "react";
import { useGetStaffQuery } from "../../../lib/features/staffapi"; // Updated import path
import { DataTable } from './../ReusableTable';
import { StaffColumns } from '../Columns';
import Loading from './../../Loading';
import TableSkeleton from "./TableSkeleton"
const StaffTable = () => {
    const { data: staffs, error, isLoading } = useGetStaffQuery();

    if (isLoading) return <TableSkeleton/>
   
    

  return (
    <div>
      <DataTable columns={StaffColumns} data={staffs||[]} />
    </div>
  );
};

export default StaffTable;
