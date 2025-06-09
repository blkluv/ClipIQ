import WorkspaceForm from '@/components/forms/WorkspaceForm'
import Modal from '@/components/global/modal'
import { Button } from '@/components/ui/button'
import React from 'react'

const CreateWorkSpace = () => {
  return (
    <div>
      <Modal title="Create Workspace"
      description='Create a new workspace to organize your videos and folders.'
      trigger={
        <Button variant={"ghost"} className="bg-[#252525] text-white px-4 py-2 rounded-full">
          Create Workspace
        </Button>
      }>
        <WorkspaceForm/>
      </Modal>
    </div>
  )
}

export default CreateWorkSpace
