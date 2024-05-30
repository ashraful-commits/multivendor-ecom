import React from 'react'
import Heading from './../../../../components/backend/Heading';
import OrderTable from "@/components/backend/TableComponent/OrderTable"

const page = () => {
  return (
    <div>
      <Heading title="Orders"/>

      <OrderTable/>
    </div>
  )
}

export default page
