"use client"
import React from 'react'
import Heading from './Heading';
import {useRouter} from "next/navigation"
import {X} from "lucide-react"
import { Button } from '@/components/ui/button';
import {FromHeaderProps} from "../../typescript"
const FromHeader = ({title,href}:FromHeaderProps) => {
  const router = useRouter()
  return (
    <div>
      <div className="flex w-full justify-between items-center px-4 bg-slate-800 dark:bg-slate-100 my-5 rounded-xl">
     <Heading title={title}/> 
     <Button className="text-white dark:text-slate-900" onClick={()=>router.back()}><X/></Button>
     </div>
    </div>
  )
}

export default FromHeader
