"use client"
import React from 'react'
import LargeCard from './LargeCard';
import {Layers,ShoppingCart,WalletCards} from 'lucide-react'
import { useGetTodayOrdersQuery,
  useGetYesterdayOrdersQuery,
  useGetThisMonthOrdersQuery,
  useGetLastMonthOrdersQuery,
  useGetAllTimeSalesQuery,
}from "@/lib/features/orderapi"
const LargeCards = () => {
  const { data: todayData } = useGetTodayOrdersQuery();
const { data: yesterdayData } = useGetYesterdayOrdersQuery();
const { data: monthData } = useGetThisMonthOrdersQuery();
const { data: lastMonthData } = useGetLastMonthOrdersQuery();
const { data: allTimeData } = useGetAllTimeSalesQuery();

console.log(todayData,yesterdayData,monthData,lastMonthData,allTimeData,)
const ordersState = [
  {
    period: "Today Orders",
    sales: todayData?.length ? todayData?.reduce((total, item) => total += item.total, 0) : 0,
    color: "bg-green-500",
    icon: <Layers />,
  },
  {
    period: "Yesterday Orders",
    sales: yesterdayData?.length ? yesterdayData?.reduce((total, item) => total += item.total, 0) : 0,
    color: "bg-orange-500",
    icon: <Layers />,
  },
  {
    period: "This Month",
    sales: monthData?.length ? monthData?.reduce((total, item) => total += item.total, 0) : 0,
    color: "bg-yellow-500",
    icon: <ShoppingCart />,
  },
  {
    period: "Last Month",
    sales: lastMonthData?.length ? lastMonthData?.reduce((total, item) => total += item.total, 0) : 0,
    color: "bg-purple-500",
    icon: <WalletCards />,
  },
  {
    period: "All Time Sales",
    sales: allTimeData?.length ? allTimeData?.reduce((total, item) => total += item.total, 0) : 0,
    color: "bg-blue-500",
    icon: <WalletCards />,
  },
];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
     {ordersState.map((item,i)=>{
      return(
        <LargeCard data={item} key={i} />
      )
     })}
     
    </div>
  )
}

export default LargeCards
