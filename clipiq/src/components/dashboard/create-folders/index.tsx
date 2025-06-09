import WorkspaceForm from '@/components/forms/WorkspaceForm'
import Modal from '@/components/global/modal'
import { Button } from '@/components/ui/button'
import React from 'react'

const CreateFolders = () => {
  return (
    <div>
      <Modal title="Create Folder"
      description='Create a new folder to organize your videos.'
      trigger={
        <Button variant={"ghost"} className="bg-[#252525] text-white px-4 py-2 rounded-full">
          Create Folder
        </Button>
      }>
        {/* <WorkspaceForm/> */}
      </Modal>
    </div>
  )
}

export default CreateFolders
