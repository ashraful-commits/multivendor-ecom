
import React from 'react';
import PageHeader from '../../../../components/backend/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Trash2 } from "lucide-react";
import StaffTable from '../../../../components/backend/TableComponent/StaffTable';

const Staff = () => {

  return (
    <div className="min-h-screen">
      <PageHeader title="Our staff" href="/dashboard/staff/new" linkTitle="Add staff" />
      <StaffTable/>
    </div>
  );
};

export default Staff;