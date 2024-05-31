
"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Card } from '@/components/ui/card';
import {Truck,MoveRight } from "lucide-react"
export function ShippingCost({register,errors}:{register:any;errors:any}) {
  
  return (
<div>
<h2 className="my-2 max-sm:my-10">Shipping cost {errors&&errors}</h2>
 <div className="grid grid-cols-2 gap-x-10">

  <ul className="grid w-full gap-6 lg:grid-cols-2 md:grid-cols-2 max-sm:grid-cols-none max-sm:col-span-2">
    <li>
      <input {...register("shippingCost",{required:true})} type="radio" id="cheapCost" name="shippingCost" value={5}  className="hidden peer" />
      <label htmlFor="cheapCost" className="inline-flex items-center justify-start gap-x-5 w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
    <Truck />
        <div className="block">
          <div className="w-full text-lg font-semibold">ABC</div>
          <div className="w-full">Delivery cost:$5</div>
        </div>
        <MoveRight className="ml-auto" />
      </label>
    </li>
    <li>
      <input {...register("shippingCost",{required:true})} type="radio" value={20} id="expensiveCost" name="shippingCost"className="hidden peer" />
      <label htmlFor="expensiveCost" className="inline-flex items-center justify-start gap-x-5 w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
    <Truck />
        <div className="block">
          <div className="w-full text-lg font-semibold">ABC</div>
          <div className="w-full">Delivery cost:$20</div>
        </div>
        <MoveRight className="ml-auto"/>
      </label>
    </li>
  </ul>
</div>

</div>

  )
}




