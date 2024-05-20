import React from 'react'

import Link  from 'next/link';
import {Plus} from "lucide-react"
import Heading from './Heading';
import {PageHeaderProps} from "../../typescript"
const PageHeader = ({title,href,linkTitle}:PageHeaderProps) => {
  return (

    <div className="flex border-b-2 justify-between items-center bg-slate-900 dark:bg-white text-white dark:text-slate-900">
   <Heading title={title}/>
   <Link className="flex gap-x-2 bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-700 dark:text-white text-slate-900" href={href}> <Plus/><span>{linkTitle}</span></Link>
  </div>
 
  
  )
}

export default PageHeader
