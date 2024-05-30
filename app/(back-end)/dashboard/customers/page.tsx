
import React from 'react';
import PageHeader from '../../../../components/backend/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Trash2 } from "lucide-react";
import { getData } from '@/lib/apiRequest';
import CustomerTable from './../../../../components/backend/TableComponent/CustomerTable';

const Customer = async() => {
  return (
    <div className="min-h-screen">
      <PageHeader title="Customers" href="#" linkTitle="" />

    <CustomerTable/>
    </div>
  );
};

export default Customer;