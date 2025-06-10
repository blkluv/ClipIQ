import { Button } from '@/components/ui/button'
import { Link2 } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

type props={
    folderId:string 
}
const CopyLink = ({folderId}:props) => {
    const copylinkHandler=()=>{
        navigator.clipboard.writeText(
            folderId
        )
        toast("copied",{description:"Link copied successfully."})
    }
  return (
    <Button
    className="p-[5px] h-5 bg-hover:bg-transparent bg-[#252525]"
    onClick={copylinkHandler}
    >
        <Link2/>
    </Button>
  )
}

export default CopyLink
