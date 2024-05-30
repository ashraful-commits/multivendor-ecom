
import React from 'react';
import PageHeader from '@/components/backend/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Trash2 } from "lucide-react";

import Image from "next/image"
import CategoryTable from '../../../../../components/backend/TableComponent/CategoryTable';

const Categories =() => {

  return (
    <div className="min-h-screen">

    <PageHeader title="Category" href="/dashboard/categories/new" linkTitle="Add category"/>
      <CategoryTable/>
    </div>
  );
};

export default Categories;