"use client"
import React from "react";
import { bannerColumns } from '../Columns';
import { DataTable } from './../ReusableTable';
import { useGetBannerQuery } from "../../../lib/features/bannerapi"; // Updated import path
import Loading from './../../Loading';

const BannerTable = () => {
    const { data: banners, error, isLoading } = useGetBannerQuery();

    if (isLoading) return <div className="w-full min-h-[500px] mx-auto my-auto"><Loading className="mx-auto my-auto"/></div>;
   

    return (
        <div>
            <DataTable columns={bannerColumns} data={banners || []} />
        </div>
    );
};

export default BannerTable;
