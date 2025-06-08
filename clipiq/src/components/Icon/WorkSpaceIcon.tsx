import React from 'react'

const WorkSpaceIcon = ({ name }: { name: string }) => {
  return (
    <span className='bg-[#545454] flex items-center font-bold justify-center w-8 px-2 h-7 rounded-sm text-[#1d1d1d]'>
        {name.charAt(0).toUpperCase()}
    </span>
  )
}

export default WorkSpaceIcon;