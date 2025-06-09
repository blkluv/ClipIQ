import CreateFolderForm from '@/components/forms/CreateFolder'
import Modal from '@/components/global/modal'
import { Button } from '@/components/ui/button'
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
        <Button variant={"ghost"} className="bg-[#252525] text-white px-4 py-2 rounded-full">
          Create Folder
        </Button>
      }>
        <CreateFolderForm WorkSpaceId={workspaceId}/>
      </Modal>
    </div>
  )
}

export default CreateFolders
