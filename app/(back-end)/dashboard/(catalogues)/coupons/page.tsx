import React from 'react';
import PageHeader from './../../../../../components/backend/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {Download,Trash2}from "lucide-react"

import Image from "next/image"
import CouponTable from './../../../../../components/backend/TableComponent/CouponTable';

const Coupons = () => {
 
  return (
   <div className="min-h-screen">
    <PageHeader title="Coupon" href="/dashboard/coupons/new" linkTitle="Add coupon"/>

    <CouponTable/>
    
    </div>
  )
}

export default Coupons
