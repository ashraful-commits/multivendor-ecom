'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Sales',
    },
  },
};
export const options1 = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Order',
    },
  },
};

const labels = ['Saturday', 'Sunday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', ];

export const data = {
  labels,
  datasets: [
  
    {
      label: 'Sales',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};
export const data1 = {
  labels,
  datasets: [
    {
      label: 'Order',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    
  ],
};

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
const WeeklySalesChart = () => {
  return (
    <div className="bg-slate-700 dark:bg-white dark:text-slate-900 p-8 rounded-lg">
      <h2 className="text-white dark:text-slate-900 text-xl font-bold">Weekly Charts</h2>
      <Tabs defaultValue="sales" className="w-full mt-5">
        <TabsList className="grid  grid-cols-2 h-6 w-40 bg-slate-900">
          <TabsTrigger className="h-4" value="sales">
            Sales
          </TabsTrigger>
          <TabsTrigger className="h-4" value="orders">
            Orders
          </TabsTrigger>
        </TabsList>
        <TabsContent value="sales">
          <Line options={options} data={data} />
        </TabsContent>
        <TabsContent value="orders">
          <Line options={options1} data={data1} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WeeklySalesChart;
