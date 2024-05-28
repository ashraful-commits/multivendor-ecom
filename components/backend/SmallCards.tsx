"use client"
import React from 'react'
import SmallCard from './SmallCard';
import {ShoppingCart,RefreshCw,Check,RotateCcw } from 'lucide-react'
import {DataItem} from "../../typescript"
import {  useGetPendingOrdersQuery,
  useGetProcessingOrdersQuery,
  useGetTodayOrdersQuery,
  useGetDeliveredOrdersQuery} from "@/lib/features/orderapi"
const SmallCards = () => {
  
  const { data: todayData } = useGetTodayOrdersQuery();
  const { data: pendingData } = useGetPendingOrdersQuery();
  const { data: processData } = useGetProcessingOrdersQuery();
  const { data: completeData } = useGetDeliveredOrdersQuery();
  const data: DataItem[] = [
    {
      title: "Today Orders",
      sales: todayData ? todayData?.length : 0,
      color: "bg-green-500",
      icon: <ShoppingCart className="size-4" />
    },
    {
      title: "Order Pending",
      sales: pendingData ? pendingData.length: 0,
      color: "bg-orange-500",
      icon: <RefreshCw className="size-4" />
    },
    {
      title: "Order Processing",
      sales: processData ? processData.length : 0,
      color: "bg-yellow-500",
      icon: <RotateCcw className="size-4" />
    },
    {
      title: "Order Delivered",
      sales:  completeData ? completeData.length : 0,
      color: "bg-purple-500",
      icon: <Check className="size-4" />
    },
  ];
   
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-10" >
      {data.map((item,i)=>{
        return(
          
          <SmallCard key={i} data={item}/>
        )
      })}
     
    </div>
  )
}

export default SmallCards
