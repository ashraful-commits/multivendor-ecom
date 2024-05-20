import { Loader2,Plus } from "lucide-react"

import { Button } from "@/components/ui/button"

export function SubmitButton({loading=false,title}:{loading:boolean,title:string}) {
  return (
    <Button type="submit" className="mt-5 flex gap-x-2" variant="default">
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      
   {!loading && <Plus/>}    {loading ? "Please wait":  title}
    </Button>
  )
}
