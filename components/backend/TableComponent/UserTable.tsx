"use client"
import React from "react";
import { useGetUserQuery } from "@/lib/features/userapi"; // Updated import path
import { DataTable } from './../ReusableTable';
import { UserColumns } from '../Columns';
import Loading from './../../Loading';
import TableSkeleton from "./TableSkeleton"
const UserTable = () => {
    const { data: users, error, isLoading } = useGetUserQuery();

    if (isLoading) return <TableSkeleton/>
   
  return (
    <div>
      <DataTable columns={UserColumns} data={users||[]} />
    </div>
  );
};

export default UserTable;
