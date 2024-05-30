
import React from 'react';
import PageHeader from '../../../../components/backend/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Trash2 } from "lucide-react";

import FarmerTable from './../../../../components/backend/TableComponent/FarmerTable';


const Farmers = () => {
 
  return (
    <div className="min-h-screen">
      <PageHeader title="Farmers" href="/dashboard/farmers/new" linkTitle="Add farmers" />

    <FarmerTable/>
    </div>
  );
};

export default Farmers;