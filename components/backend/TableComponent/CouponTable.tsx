"use client"
import React from "react";
import { useGetCouponQuery } from "../../../lib/features/couponsapi"; // Updated import path
import { DataTable } from './../ReusableTable';
import { CouponColumns } from './../Columns';
import Loading from './../../Loading';
const CouponTable = () => {
    const { data: coupons, error, isLoading } = useGetCouponQuery();
    console.log(coupons)

    if (isLoading) return <div className="w-full min-h-[500px] mx-auto my-auto"><Loading className="mx-auto my-auto"/></div>;
  return (
    <div>
      <DataTable columns={CouponColumns} data={coupons||[]} />
    </div>
  );
};

export default CouponTable;
