import React from 'react'
import Heading from './../../../components/backend/Heading';
import LargeCards from './../../../components/backend/LargeCards';
import SmallCards from './../../../components/backend/SmallCards';
import DashboardCharts from './../../../components/backend/DashboardCharts';
import { CustomDataTable } from './../../../components/backend/CustomDataTable';
import OrderTable from './../../../components/backend/TableComponent/OrderTable';

const Dashboard = () => {
  return (
    <div className="h-full w-full dark:text-slate-900">
      <Heading title="Dashboard overview"/>
       <LargeCards/>
       <SmallCards/>
       <DashboardCharts/>
       <div className="my-10">
      <h2 className=" dark:text-slate-900 text-white my-5 text-2xl">All recent Order</h2>
       <OrderTable/>
       </div>
    </div>
  )
}

export default Dashboard
