import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { RootState } from '../../../lib/store';
import {useDispatch,useSelector}from "react-redux"
import {updateBulkData} from "@/lib/features/bulkSlice"
const TableSingleSelectTab = ({ row,name }:{row:any;name:string}) => {
  const bulkIds = useSelector((state:RootState)=>state.bulk.bulk)
  const dispatch = useDispatch()

  const handleDelete=(id:any)=>{
     dispatch(updateBulkData({...bulkIds,ids:[id],client:name}))
    }
    
  return (
    <div>
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(!!value),handleDelete(row?.original?.id)
        }}
        aria-label="Select row"
      />
    </div>
  );
};

export default TableSingleSelectTab;
