"use client"
import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);
export const data = {
  labels: ['Cabbage', 'Watermelon', 'Broccoli', 'Maize' ],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, ],
      backgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
      
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
      
      ],
      borderWidth: 1,
    },
  ],
};
const BestSellingProductChart = () => {
  return (
    <div className="bg-slate-700 w-full dark:bg-white p-8 rounded-lg">
      <h2 className="text-white dark:text-slate-900 text-xl font-bold">Best Selling Charts</h2>
      <Pie data={data} width={200} height={200} />;
    </div>
  )
}

export default BestSellingProductChart
