
import React from 'react';
import PageHeader from '../../../../components/backend/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Trash2 } from "lucide-react";
import UserTable from '@/components/backend/TableComponent/UserTable';



const Farmers = () => {
 
  return (
    <div className="min-h-screen">
      <PageHeader title="Users" href="/dashboard/users/new" linkTitle="Add users" />
      <UserTable/>
    </div>
  );
};

export default Farmers;