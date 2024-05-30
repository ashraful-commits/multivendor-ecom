
import React from 'react';
import PageHeader from './../../../../../components/backend/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {Download,Trash2}from "lucide-react"
import Image from "next/image"

import TagTable from '../../../../../components/backend/TableComponent/TagTable';



const Tags =async () => {

  return (
   <div className="min-h-screen">
    <PageHeader title="Tag" href="/dashboard/tags/new" linkTitle="Add tag"/>

    <TagTable/>
    </div>
  )
}

export default Tags
