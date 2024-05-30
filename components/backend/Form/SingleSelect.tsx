import * as React from "react"
import {SingleSelectProps,Option}from "../../../typescript"
import {

  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SingleSelect({defaultValue,value,setValue,data}:SingleSelectProps) {
  
  return (
    <Select value={value} defaultValue={defaultValue}     onValueChange={setValue}>
      <SelectTrigger className="w-full bg-slate-800 text-white">
        <SelectValue placeholder="Select a value" />
      </SelectTrigger>
      <SelectContent className="bg-slate-900 text-white">
          {data?.length && data?.map((item, i) => (
            <SelectItem className="bg-slate-900 text-white" key={i} value={item.id}><span>{item.name}</span></SelectItem>
          ))}
      </SelectContent>
    </Select>
  )
}
