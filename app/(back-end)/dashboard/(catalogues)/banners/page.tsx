
import React from "react";
import PageHeader from "@/components/backend/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Trash2 } from "lucide-react";
import Image from "next/image";
import { bannerData } from "../../../../../typescript";
import BannerTable from './../../../../../components/backend/TableComponent/BannerTable';


const Banners = () => {
 
  return (
    <div className="min-h-screen">
      <PageHeader
        title="Banner"
        href="/dashboard/banners/new"
        linkTitle="Add Banners"
      />

      <BannerTable/>
    </div>
  );
};

export default Banners;
