// hooks/useMoveVideos.ts
'use client'

import { useQueryData } from '@/hooks/useQueryData'
import useZodForm from '@/hooks/useZodForm'
import {
  getUserWorkspaces,
  getWorkspaceFolders,
  moveVideoAction,
} from '@/app/actions/workspace'
import { useQueryClient } from '@tanstack/react-query'
import { FoldersProps, WorkspaceProps } from '@/types/index.type'
import { moveVideoSchema } from '@/components/dashboard/videos/moveVideoSchema'
import useMutataionData from './useMutataionData'

export const useMoveVideos = (videoId: string, initialWorkspace: string) => {
  const queryClient = useQueryClient()

  //
  // 1️⃣ Fetch all workspaces once
  //
  const { data, isPending: isWorkspacesLoading } = useQueryData(
    ['user-workspaces'],
    () => getUserWorkspaces()
  )
  const {data:workspaces} = data as WorkspaceProps;

  //
  // 2️⃣ Set up Zod‑powered form, seeded with the initial workspace
  //
  const { mutate, isPending } = useMutataionData({
    mutationKey: ['change-video-location'],
    mutationFn: (data: { workspace_id: string; folder_id: string }) =>
      moveVideoAction(videoId, data.workspace_id, data.folder_id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['folder-videos']})
 
    // 3. refetch the *new* folder’s videos (so it appears here)
    // queryClient.invalidateQueries({['folder-videos', selectedFolderId]})
 
    // 4. refetch workspace-folders too (if you want updated counts)
    queryClient.invalidateQueries({queryKey:['workspace-folders']})
      queryClient.invalidateQueries({queryKey:['user-videos']})
    },
    queryKey: 'workspace-folders',
  })
  const {
    register,
    watch,
    handleSubmit,
    errors,
  } = useZodForm(
    moveVideoSchema,
    // when the form submits, call mutate
    (vals) => mutate(vals),
    {
      workspace_id: initialWorkspace,
      folder_id: '',
    }
  )

  // 3️⃣ Watch the selected workspace_id so we can refetch folders
  const selectedWorkspace = watch('workspace_id')

  //
  // 4️⃣ Fetch folders for the currently selected workspace
  //
  const {
    data: folderdata,
    isFetching,
  } = useQueryData(
    ['workspace-folders', selectedWorkspace],
    () => getWorkspaceFolders(selectedWorkspace),
    // only run once we have a workspace_id
    Boolean(selectedWorkspace)
  )
 const folders = (folderdata as FoldersProps)?.data ?? [];

  //
  // 5️⃣ Mutation to move the video
  //

  //
  // 6️⃣ Return everything the component needs
  //
  return {
    // form controls
    register,
    handleSubmit,
    errors,
    // data + loading flags
    workspaces,
    isWorkspacesLoading,
    folders,
    isFetching,
    // mutation state
    isPending,
  }
}
