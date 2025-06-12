export type WorkspaceProps = {
    data: {
        //user's subscription plan
        subscription: {
            plan: 'FREE' | 'PRO'
        } | null,
        //array of workspaces owned by the user
        workspace: {
            id: string,
            name: string,
            type: 'PERSONAL' | 'PUBLIC'
        }[],
        //array of workspaces where the user is a member (not owner)
        members: {  
            WorkSpace: {
                id: string,
                name: string,
                type: 'PUBLIC' | 'PERSONAL'
            }
        }[]
    }
}

export type NotificationProps = {
    status: number,
    data: {
        _count: {
            notification: number
        }
    }
}

export type FoldersProps = {
    status: number,
    data: ({
        _count: {
            videos: number,
        }
    } & {
        id: string,
        name: string,
        createdAt: Date,
        workspaceId: string | null
    })[]
}

export type FolderProps = {
    status: number,
    data: {
        name: string,
        _count: {
            videos: number
        }
    }
}

export type VideosProps = {
    status: number,
    data: {
        User: {
            firstName: string | null,
            lastName: string | null,
            image: string | null
        } | null,
        id: string,
        processing: boolean,
        Folder: {
            id: string,
            name: string
        } | null,
        title: string | null,
        source: string
        createdAt: Date
    }[]
}

export type VideoProps = {
  User: {
    firstName: string | null
    lastName: string | null
    image: string | null
  } | null
  id: string
  Folder: {
    id: string
    name: string
  } | null
  createdAt: Date
  title: string | null
  source: string
  processing: boolean
  workspaceId: string
}

export type VideoDataProps = {
    status: number
    data: {
      User: {
        firstName: string | null
        lastName: string | null
        image: string | null
        clerkId: string
        trial: boolean
        subscription: {
          plan: 'PRO' | 'FREE'
        } | null
      } | null
      title: string | null
      description: string | null
      source: string
      views: number
      createdAt: Date
      processing: boolean
      summery: string
    }
    author: boolean
  }

  export type CommentRepliesProps = {
    id: string,
    comment: string,
    createdAt: Date,
    commentId: string | null,
    userId: string | null,
    videoId: string | null,
    User: {
        id: string,
        email: string,
        firstname: string | null ,
        lastname: string | null,
        createdAt: Date,
        clerkId: string,
        image: string | null,
        trial: boolean,
        firstView: boolean
    } | null
  }

  export type VideoCommentProps = {
    data: {
        User: {
            id: string,
            email: string,
            firstname: string | null,
            lastname: string | null,
            createdAt: Date,
            clerkId: string,
            image: string | null,
            trial: boolean,
            firstView: boolean
        } | null,
        reply: CommentRepliesProps[],
        id: string,
        comment: string,
        createdAt: Date,
        commentId: string | null,
        userId: string | null,
        videoId: string | null
    }[]
  }