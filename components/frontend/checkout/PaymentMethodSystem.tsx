
"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Card } from '@/components/ui/card';
import { Handshake,MoveRight,CreditCard } from 'lucide-react';
export default function PaymentMethodSystem({register,errors}:{register:any;errors:any}) {
  return (
<div>
<h2 className="my-2">Payment Method {errors&&errors}</h2>
 <div className="grid grid-cols-2 gap-x-10">

  <ul className="grid w-full gap-6 md:grid-cols-2">
    <li>
      <input {...register("paymentMethod",{required:true})} type="radio" id="cheapCost" name="paymentMethod" value="cash on deliver"  className="hidden peer" />
      <label htmlFor="cheapCost" className="inline-flex items-center justify-start gap-x-5 w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
    <Handshake />
        <div className="block">
          <div className="w-full text-lg font-semibold">Cash</div>
          <div className="w-full">Cash on Delivery</div>
        </div>
        <MoveRight className="ml-auto" />
      </label>
    </li>
    <li>
      <input {...register("paymentMethod",{required:true})} type="radio" value="credit card" id="expensiveCost" name="paymentMethod"className="hidden peer" />
      <label htmlFor="expensiveCost" className="inline-flex items-center justify-start gap-x-5 w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
    <CreditCard />
        <div className="block">
          <div className="w-full text-lg font-semibold">Card</div>
          <div className="w-full">Credit Card</div>
        </div>
        <MoveRight className="ml-auto"/>
      </label>
    </li>
  </ul>
</div>

</div>

  )
}




