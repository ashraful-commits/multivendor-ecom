"use client"
import React from "react";
import { bannerColumns } from '../Columns';
import { DataTable } from './../ReusableTable';
import { useGetBannerQuery } from "../../../lib/features/bannerapi"; // Updated import path
import Loading from './../../Loading';

import TableSkeleton from "./TableSkeleton"
const BannerTable = () => {
    const { data: banners, error, isLoading } = useGetBannerQuery();

    if (isLoading) return <TableSkeleton/>;
   

    return (
        <div>
            <DataTable columns={bannerColumns} data={banners || []} />
        </div>
    );
};

export default BannerTable;
