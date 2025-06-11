import WorkspaceForm from '@/components/forms/WorkspaceForm'
import Modal from '@/components/global/modal'
import { Button } from '@/components/ui/button'
import { FolderPlusIcon } from 'lucide-react'
import React from 'react'

const CreateWorkSpace = () => {
  return (
    <div>
      <Modal title="Create Workspace"
      description='Create a new workspace to organize your videos and folders.'
      trigger={
        <Button variant={"ghost"} className="bg-[#252525] text-neutral-400 px-4 py-2 rounded-full">
          <FolderPlusIcon/>
            <span className="hidden md:inline">
            Create Workspace
            </span>
            <span className="inline md:hidden">
            Workspace
            </span>
        </Button>
      }>
        <WorkspaceForm/>
      </Modal>
    </div>
  )
}

export default CreateWorkSpace
