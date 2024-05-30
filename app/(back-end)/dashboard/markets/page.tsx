
import React from 'react';
import PageHeader from '../../../../components/backend/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Trash2 } from "lucide-react";
import MarketTable from './../../../../components/backend/TableComponent/MarketTable';

const Markets = () => {

  return (
    <div className="min-h-screen">
      <PageHeader title="Markets" href="/dashboard/markets/new" linkTitle="Add Markets" />

      <MarketTable/>
    </div>
  );
};

export default Markets;