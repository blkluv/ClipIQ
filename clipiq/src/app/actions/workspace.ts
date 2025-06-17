"use server";
import client from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const verifyWorkspace = async (workspaceId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 400, data: null };
    }
    const hasAccesstoworkspace = await client.workSpace.findUnique({
      where: {
        id: workspaceId,
        OR: [
          { User: { clerkid: user.id } },
          { members: { some: { User: { clerkid: user.id } } } },
        ],
      },
    });
    if (hasAccesstoworkspace)
      return { status: 200, data: { workspace: hasAccesstoworkspace } };
    return { status: 400, data: { workspace: null } };
  } catch (error) {
    console.error("Error verifying workspace:", error);
    return { status: 500, data: { workspace: null } };
  }
};

export const getUserVideos = async (id: string) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 404 };
    const videos = await client.video.findMany({
      where: {
        OR: [{ workSpaceId: id }, { folderId: id }],
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        source: true,
        processing: true,
        Folder: {
          select: {
            id: true,
            name: true,
          },
        },
        User: {
          select: {
            firstName: true,
            lastName: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    if (videos && videos.length > 0) {
      return { status: 200, data: videos };
    }
    return { status: 404, data: [] };
  } catch {
    return { status: 500, data: [] };
  }
};

export const getWorkspaceFolders = async (workSpaceId: string) => {
  try {
    const folders = await client.folder.findMany({
      where: {
        workSpaceId,
      },
      include: {
        _count: {
          select: { videos: true },
        },
      },
    });
    if (folders && folders.length > 0) {
      return { status: 200, data: folders };
    }
    return { status: 404, data: [] };
  } catch {
    return { status: 403, data: [] };
  }
};

export const getUserWorkspaces = async () => {
  try {
    const user = await currentUser();
    if (!user) return { status: 404, data: [] };
    const workspaces = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
        workspace: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
        members: {
          select: {
            WorkSpace: {
              select: {
                id: true,
                name: true,
                type: true,
              },
            },
          },
        },
      },
    });
    if (workspaces) return { status: 200, data: workspaces };
    return { status: 404, data: [] };
  } catch {
    return { status: 500, data: [] };
  }
};

export const CreateWorkSpaceAction = async (name: string) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 404 };
    // console.log("-----------------------------");
    // console.log("-----------------------------");
    // console.error("reachingggggggg");
    // console.log("-----------------------------");
    // console.log("-----------------------------");
    const userExist = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      include: {
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });
    if (userExist?.subscription?.plan === "PRO") {
      const workspace = await client.user.update({
        where: {
          clerkid: user.id,
        },
        data: {
          workspace: {
            create: {
              name,
              type: "PUBLIC",
            },
          },
        },
      });
      if (workspace) return { status: 401, data: "Workspace Created" };
      return {
        status: 401,
        data: "You are not authorized to create a workspace",
      };
    }
    // console.log("-----------------------------");
    // console.log("-----------------------------");
    // console.error("Error creating workspace:");
    // console.log("-----------------------------");
    // console.log("-----------------------------");
  } catch (error) {
    return { status: 500, data: "Internal Server Error" };
  }
};

export const CreateFolderAction = async (workspaceId: string, name: string) => {
  try {
    const isNewFolder = await client.workSpace.update({
      where: {
        id: workspaceId,
      },
      data: {
        folders: {
          create: { name: name },
        },
      },
    });
    if (isNewFolder) {
      return { status: 200, message: "New Folder Created" };
    }
  } catch (error) {
    return { status: 500, message: "Oops! Something Went Wrong" };
  }
};

export const renameFolderAction = async (name: string, id: string) => {
  try {
    const folder = await client.folder.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });
    if (folder) return { status: 200, data: "Renamed successfully" };
    return { status: 400, data: "Rename unsuccessful" };
  } catch (error) {
    return { status: 500, data: "something went wrong" };
  }
};

export const getFolderInfo = async (folderId: string) => {
  try {
    const folder = await client.folder.findUnique({
      where: {
        id: folderId,
      },
      select: {
        name: true,
        _count: {
          select: {
            videos: true,
          },
        },
      },
    });
    if (folder) {
      return { status: 200, data: folder };
    }
    return { status: 400, data: null };
  } catch {
    return { status: 500, data: null };
  }
};

export const moveVideoAction = async (
  videoId: string,
  workSpaceId: string,
  folderId: string
) => {
  try {
    // console.log("videoId",videoId,"workSpaceId", workSpaceId,"folderId", folderId);
    const location = await client.video.update({
      where: {
        id: videoId,
      },
      data: {
        folderId: folderId || null,
        workSpaceId,
      },
    });
    if (location) return { status: 200, data: "folder changed successfully" };
    return { status: 404, data: "workspace/folder not found" };
  } catch {
    return { status: 500, data: "Oops! something went wrong" };
  }
};

export const getVideoDetails = async (videoId: string) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 404 };
    const video = await client.video.findUnique({
      where: {
        id: videoId,
      },
      select: {
        title: true,
        createdAt: true,
        source: true,
        processing: true,
        description: true,
        views: true,
        summary: true,
        User: {
          select: {
            firstName: true,
            lastName: true,
            image: true,
            clerkid: true,
            trial: true,
            subscription: {
              select: {
                plan: true,
              },
            },
          },
        },
      },
    });
    if (video) {
      return {
        status: 200,
        data: video,
        author: user.id === video.User?.clerkid ? true : false,
      };
    }
    return { status: 404, data: null };
  } catch {
    return { status: 500, data: null };
  }
};

// export const getVideoComments=async(videoId:string)=>{
//   try {
//     const comments=await client.video.findUnique({
//       where:{
//         id:videoId
//       },
//       select:{
//         Comment:true
//       }
//     })
//     if(comments) return {status:200 , data:comments}
//     return {status:404,data:[]};
//   } catch (error) {
//     return {status:500,data:"server error"}
//   }
// }

// export const getCommentReply=async(commentId:string)=>{
//   try {
//     const replies=await client.comment.findUnique({
//       where:{
//         id:commentId
//       },
//       select:{
//         reply:true
//       }
//     })
//     if(replies) return {status:200 , data:replies}
//     return {status:404,data:[]};
//   } catch (error) {
//     return {status:500,data:"server error"}
//   }
// }

export const getVideoComments = async (Id: string) => {
  try {
    const comments = await client.comment.findMany({
      where: {
        videoId: Id,
        // OR: [{ videoId: Id }, { parentCommentId: Id }],
        parentCommentId: null,
      },
      include: {
        reply: {
          include: {
            User: true,
          },
        },
        User: true,
      },
       orderBy: { createdAt: 'desc' }
    });
    // console.log('--------------------------------');
    // console.log('Prisma fetched comments for video', Id, comments);
    // console.log('--------------------------------');

    return { status: 200, data: comments };
  } catch {
    return { status: 400 };
  }
};


export const editVideoInfo = async (
  videoId: string,
  title: string,
  description: string
) => {
  try {
    console.log("reach action ---------")
    const video = await client.video.update({
      where: { id: videoId },
      data: {
        title,
        description,
      },
    });
    if (video) return { status: 200, data: "Video successfully updated" };
    return { status: 404, data: "Video not found" };
  } catch (error) {
    return { status: 400 };
  }
};