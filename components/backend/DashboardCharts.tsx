import React from 'react'
import WeeklySalesChart from './WeeklySalesChart';
import BestSellingProductChart from './BestSellingProductChart';

const DashboardCharts = () => {
  return (
    <div className ="grid grid-cols-1 lg:grid-cols-2 mt-10 gap-4 w-full">
      <WeeklySalesChart/>
      <BestSellingProductChart/>
    </div>
  )
}

export default DashboardCharts
