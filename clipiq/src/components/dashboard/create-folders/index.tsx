import CreateFolderForm from '@/components/forms/CreateFolder'
import Modal from '@/components/global/modal'
import { Button } from '@/components/ui/button'
import { FolderPlus } from 'lucide-react'
import React from 'react'

type props={
  workspaceId:string
}

const CreateFolders = ({workspaceId}:props) => {
  return (
    

    <div>
      <Modal title="Create Folder"
      description='Create a new folder to organize your videos.'
      trigger={
        <Button variant={"ghost"} className="bg-[#252525] text-neutral-400 px-4 py-2 rounded-full">
          <FolderPlus className='font-bold'/>{" "}
          <span className="hidden md:inline">
            Create Folder
            </span>
            <span className="text-xs inline md:hidden">
            Folder
            </span>
        </Button>
      }>
        <CreateFolderForm WorkSpaceId={workspaceId}/>
      </Modal>
    </div>
  )
}

export default CreateFolders
