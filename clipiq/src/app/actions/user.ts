"use server";
import { currentUser } from "@clerk/nextjs/server";
import client from "@/lib/prisma";
import CreateWorkSpace from "../../components/dashboard/create-workspace/index";

export const onAuthenticated = async () => {
  try {
    const user = await currentUser();
    // console.log("Current user:", user);
    if (!user) {
      return { status: 403 };
    }
    const userExist = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      include: {
        workspace: true,
      },
    });
    if (userExist) {
      return { status: 200, user: userExist };
    }
    const newUser = await client.user.create({
      data: {
        clerkid: user.id,
        email: user.emailAddresses[0].emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.imageUrl,
        studio: {
          create: {},
        },
        subscription: {
          create: {},
        },
        workspace: {
          create: {
            name: `${user.firstName}'s Workspace`,
            type: "PERSONAL",
          },
        },
      },
      include: {
        workspace: {
          where: {
            User: {
              clerkid: user.id,
            },
          },
        },
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });
    if (newUser) {
      return { status: 201, user: newUser };
    }
    return { status: 400 };
  } catch (error) {
    console.error("Error fetching current user:", error);
    return { status: 500, error: "Internal Server Error" };
  }
};

export const getUserNotifications = async () => {
  try {
    const user = await currentUser();
    if (!user) return { status: 404 };

    const notifications = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        notification: true,
        _count: {
          select: {
            notification: true,
          },
        },
      },
    });
    if (notifications && notifications.notification.length > 0)
      return { status: 200, data: notifications };
    return { status: 404, data: [] };
  } catch {
    return { status: 500, data: [] };
  }
};

//geting matching users based on query
export const getUsers = async (query: string) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 404 };

    const users = await client.user.findMany({
      where: {
        clerkid: {
          not: user.id,
        },
        OR: [
          {
            firstName: {
              contains: query,
              mode: "insensitive", // for case-insensitive comparison
            },
          },
          {
            lastName: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        image: true,
      },
    });
    return { status: 200, data: users };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { status: 500, data: [] };
  }
};

