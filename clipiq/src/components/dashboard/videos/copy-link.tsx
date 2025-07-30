import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Link2 } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

type props={
    folderId:string 
    classname?:string
    variant?:"default"|
        "destructive"|
        "outline"|
        "secondary"|
        "ghost"|
        "link"
}
const path= process.env.NEXT_PUBLIC_HOST_URL || "http://localhost:3000"
const CopyLink = ({folderId,classname,variant}:props) => {
    const copylinkHandler=()=>{
        navigator.clipboard.writeText(
            `${path}/preview/${folderId}`
        )
        toast("copied",{description:"Link copied successfully."})
    }
  return (
    <Button
    variant={variant? variant:"ghost"}
    className={cn(classname,"p-[5px] h-5 bg-hover:bg-transparent bg-[#252525]")}
    onClick={copylinkHandler}
    >
        <Link2/>
    </Button>
  )
}

export default CopyLink
