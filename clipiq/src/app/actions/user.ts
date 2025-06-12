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

export const addCommentAndReply = async (
  videoId: string,
  comment: string,
  userid: string,
  parentCommentId?: string | undefined
) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 400, data: "Signin to add comments" };


    if (parentCommentId) {
      const reply = await client.comment.update({
        where: {
          id: parentCommentId,
        },
        data: {
          reply: {
            create: {
              comment: comment,
              videoId: videoId,
              userId: userid,
            },
          },
        },
      });
      if (reply) return { status: 200, data: "reply posted" };
    } else {
      const addcomment = await client.video.update({
        where: {
          id: videoId,
        },
        data: {
          Comment: {
            create: {
              comment: comment,
              userId: userid,
            },
          },
        },
      });
      if (addcomment) return { status: 200, data: "comment added successfully" };
    }
    return { status: 400, data: "comment posted" };
  } catch (error) {
    return { status: 400, data: "Something went wrong!" };
  }
};

export const getUserProfile=async()=>{
  try {
    const user=await currentUser();
    if(!user) return {status:400}

    const userdetails=await client.user.findUnique({
      where:{
        clerkid:user.id
      },
      select:{
        firstName:true,
        lastName:true,
        id:true,
        image:true,
      }
    })
    if(userdetails) return {status:400 , data:userdetails}
    return {status:400,data:"failed"}
  } catch (error) {
    return {status:500,data:"error"}
  }
}

export const getPaymentInfo = async () => {
    try {
        const user = await currentUser();
        if(!user) return {status: 404}
        const payment = await client.user.findUnique({
            where: {
                clerkid: user.id
            },
            select: {
                subscription: {
                    select: {
                        plan: true
                    }
                }
            }
        })
        if(payment){
            return {status: 200, data: payment}
        }
    } catch {
        return {status: 400}
    }
}