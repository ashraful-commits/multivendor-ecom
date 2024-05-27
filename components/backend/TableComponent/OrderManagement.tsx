"use client"
import React,{useEffect} from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {useGetSingleOrderQuery,useEditOrderMutation} from "@/lib/features/orderapi"
import toast from 'react-hot-toast';
import Loading from '../../Loading';
const OrderManagement = ({id}:{id:string}) => {
    const {data,refetch} =useGetSingleOrderQuery(id)
    const [editOrder,{isSuccess,isLoading}] =useEditOrderMutation()
    const handleUpdateStatus=(status:string)=>{
          editOrder({status,id})
    }

    useEffect(()=>{
        if(isSuccess){
            toast.success("Status updated!")
            refetch()
        }
        
    },[isSuccess,refetch])
    if(isLoading){
        <div><Loading/></div>
    }
  return (
    <div>
     
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" variant="default" className={`${data?.status==="PENDING" &&"bg-yellow-500" } ${data?.status==="CANCEL" &&"bg-red-500"} ${data?.status==="COMPLATE" &&"bg-green-500"} ${data?.status==="PROCESS" &&"bg-indigo-500"}`}>{data?.status}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={()=>handleUpdateStatus("PROCESS")}>
          <span className="bg-indigo-100 text-indigo-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300 w-full text-center">Process</span>

          </DropdownMenuItem>
          <DropdownMenuItem onClick={()=>handleUpdateStatus("PENDING")}>
            <span className="bg-yellow-100 text-yellow-800 text-sm text-center font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300 w-full">
              Pending
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={()=>handleUpdateStatus("CANCEL")}>
            <span className="bg-red-100 text-red-800 text-sm text-center font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300 w-full">
              Cancel
            </span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={()=>handleUpdateStatus("COMPLATE")}>
            <span className="bg-green-100 text-green-800 text-sm text-center font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 w-full">
              Complate
            </span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default OrderManagement;
