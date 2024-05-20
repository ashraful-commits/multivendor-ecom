import React from 'react'
import Heading from './../../../components/backend/Heading';
import LargeCards from './../../../components/backend/LargeCards';
import SmallCards from './../../../components/backend/SmallCards';
import DashboardCharts from './../../../components/backend/DashboardCharts';
import { CustomDataTable } from './../../../components/backend/CustomDataTable';

const Dashboard = () => {
  return (
    <div className="h-full w-full dark:text-slate-900">
      <Heading title="Dashboard overview"/>
       <LargeCards/>
       <SmallCards/>
       <DashboardCharts/>
       <CustomDataTable/>
    </div>
  )
}

export default Dashboard
