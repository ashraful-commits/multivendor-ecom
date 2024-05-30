

import React from 'react';
import PageHeader from './../../../../../components/backend/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {Download,Trash2}from "lucide-react"
import BrandTable from './../../../../../components/backend/TableComponent/BrandTable';
const Brands = async() => {
  return (
   <div className="min-h-screen">
    <PageHeader title="Brands" href="/dashboard/brands/new" linkTitle="Add Brand"/>
    
     <BrandTable/>
    
    </div>
  )
}

export default Brands
