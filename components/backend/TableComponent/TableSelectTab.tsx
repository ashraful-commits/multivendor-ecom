"use client"
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../lib/store';
import {updateBulkData} from "@/lib/features/bulkSlice"
const TableSelectTab = ({ table,name }:{table:any;name:string}) => {
  const bulkIds = useSelector((state:RootState)=>state.bulk.bulk)
  const dispatch = useDispatch()
  const handleDelete=(value:any)=>{
    const allIds= value?.getFilteredRowModel()?.rows?.map((item:any)=>item?.original?.id)
    dispatch(updateBulkData({...bulkIds,ids:allIds,client:name}))
  }
  
  return (
    <div>
      <Checkbox
        className="border border-white dark:border-black"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => {
          table.toggleAllPageRowsSelected(!!value), handleDelete(table);
        }}
        aria-label="Select all"
      />
    </div>
  );
};

export default TableSelectTab;
