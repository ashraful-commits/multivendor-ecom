
import React from 'react';
import PageHeader from '../../../../../components/backend/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Trash2 } from "lucide-react";

import Image from "next/image"
import CategoryTable from '../../../../../components/backend/TableComponent/CategoryTable';


const Categories =() => {

  return (
    <div className="min-h-screen">
      <PageHeader title="Categories" href="/dashboard/categories/new" linkTitle="Add Category" />
      <div className="flex bg-slate-700 dark:bg-slate-200 py-4 px-2 rounded-md my-4 gap-x-5">
        <div className="flex gap-x-4">
          <Button className="flex gap-x-2 items-center" size="sm" variant="secondary"><Download /><span>Bulk Export</span></Button>
          <Button className="flex gap-x-2 items-center" size="sm" variant="destructive"><Trash2 /><span>Bulk Delete</span></Button>
        </div>
        <Input className="bg-transparent border" placeholder="Search item" />
      </div>
   
      <CategoryTable/>
    </div>
  );
};

export default Categories;