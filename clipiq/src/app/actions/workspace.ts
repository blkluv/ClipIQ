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
    return { status: 400, data: { workspace: hasAccesstoworkspace } };
  } catch (error) {
    console.error("Error verifying workspace:", error);
    return { status: 500, data: { workspace: null } };
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

export const getUserVideos = async (workSpaceId: string) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 404 };
    const videos = await client.video.findMany({
      where: {
        OR: [{ workSpaceId: workSpaceId }, { folderId: workSpaceId }],
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

