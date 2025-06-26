'use client'
import { getUserWorkspaces } from '@/app/actions/workspace'
import WorkspaceForm from '@/components/forms/WorkspaceForm'
import Modal from '@/components/global/modal'
import { Button } from '@/components/ui/button'
import { useQueryData } from '@/hooks/useQueryData'
import { FolderPlusIcon } from 'lucide-react'
import React from 'react'

const CreateWorkSpace = () => {
   const {data} = useQueryData(['user-workspaces'], getUserWorkspaces);
    const {data: plan} = data as  {
        status: number,
        data: {
            subscription: {
                plan: 'PRO' | 'FREE'
            } | null
        }
    }
    if(plan.subscription?.plan === 'FREE'){
        return <></>
    }
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
