import React from 'react'
import {Layers} from "lucide-react"
import {LargeCardProps} from "../../typescript"
const LargeCard = ({data}:LargeCardProps) => {
  return (
    <div className={` rounded-md text-white shadow-md w-full p-8 flex flex-col items-center justify-center gap-y-3 ${data.color}`}>
      {data.icon}
      <h4>{data.period}</h4>
      <h2 className="text-3xl">$ {data.sales}</h2>
    </div>
  )
}

export default LargeCard
