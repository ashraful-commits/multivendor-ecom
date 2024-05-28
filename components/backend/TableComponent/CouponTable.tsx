"use client"
import React from "react";
import { useGetCouponQuery } from "../../../lib/features/couponsapi"; // Updated import path
import { DataTable } from './../ReusableTable';
import { CouponColumns } from './../Columns';
import Loading from './../../Loading';
import TableSkeleton from "./TableSkeleton"
const CouponTable = () => {
    const { data: coupons, error, isLoading } = useGetCouponQuery();
    console.log(coupons)

    if (isLoading) return <TableSkeleton/>
  return (
    <div>
      <DataTable columns={CouponColumns} data={coupons||[]} />
    </div>
  );
};

export default CouponTable;
