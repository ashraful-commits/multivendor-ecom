
import React from 'react';
import PageHeader from '../../../../../components/backend/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Trash2 } from "lucide-react";
import ProductTable from './../../../../../components/backend/TableComponent/ProductTabe';

const Products = () => {



  return (
    <div className="min-h-screen">
      <PageHeader title="Products" href="/dashboard/products/new" linkTitle="Add Products" />

   
      <ProductTable/>
    </div>
  );
};

export default Products;