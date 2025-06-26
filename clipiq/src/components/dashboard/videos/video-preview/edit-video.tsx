import React from 'react'
import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'
import Modal from '@/components/global/modal'
import EditVideoForm from '@/components/forms/edit-video'

type Props = { title: string; description: string; videoId: string }

const EditVideo = ({ description, title, videoId }: Props) => {
  return (
    <Modal
      title="Edit video details"
      description="You can update your video details here!"
      trigger={
        <Button variant={'ghost'}>
          <Edit className="text-[#3d3d3d] dark:text-[#ffffff]" />
        </Button>
      }
    >
      <EditVideoForm
        videoId={videoId}
        title={title}
        description={description}
      />
    </Modal>
  )
}

export default EditVideo