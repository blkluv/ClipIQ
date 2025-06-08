// import VideoRecorderIcon from '@/components/icons/video-recorder'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UserButton } from '@clerk/nextjs'
import { Search, UploadIcon, Video, VideotapeIcon } from 'lucide-react'

const InfoBar = () => {
  return (
    <header className="pl-20 md:pl-[300px] w-full fixed z-10 p-4  flex items-center justify-between gap-4 ">
      <div className="flex gap-4 justify-center items-center border-2 border-neutral-800 p-1 rounded-full px-4 w-full max-w-lg">
        <Search
          size={25}
          className="text-[#707070]"
        />
        <Input
          className="bg-transparent border-none outline-none !placeholder-neutral-500"
          placeholder="Search for people, projects, tags & folders"
        />
      </div>
      <div className="flex items-center gap-4">
        <Button className=" bg-[#9d9d9d] text-black hover:bg-neutral-600 flex items-center gap-2">
          <UploadIcon size={20} className='fill-black' />{' '}
          <span className="flex items-center gap-2 font-bold">Upload</span>
        </Button>
        <Button className=" bg-[#9d9d9d] text-black hover:bg-neutral-600 flex items-center gap-2">
          <Video className='fill-black'/>
          <span className="flex items-center gap-2 font-bold">Record</span>
        </Button>
        <UserButton />
      </div>
    </header>
  )
}

export default InfoBar