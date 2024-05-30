
import React from 'react';
import PageHeader from '../../../../components/backend/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Trash2 } from "lucide-react";
import CommunityTable from './../../../../components/backend/TableComponent/CommunityTable';

const Community =() => {

  return (
    <div className="min-h-screen">
      <PageHeader title="Training" href="/dashboard/community/new" linkTitle="Add Training" />

   
      <CommunityTable/>
    </div>
  );
};

export default Community;