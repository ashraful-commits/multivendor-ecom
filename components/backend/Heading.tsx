import React from 'react'
import  {HeadingProps} from "../../typescript"
const Heading = ({title}:HeadingProps) => {
  return (
    <div>
      <h2 className="py-8 text-2xl w-full dark:text-slate-900 font-semibold text-slate-50">{title}</h2>
    </div>
  )
}

export default Heading
