"use server";
import { currentUser } from "@clerk/nextjs/server";
import client from "@/lib/prisma";
import nodemailer from "nodemailer";

export const sendMail = async(
  to: string,
  subject: string,
  text: string,
  html?: string
) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: true,
    auth: {
      user: process.env.MAIL_USER_EMAIL_ID,
      pass: process.env.MAIL_PASSWORD,
    },
  } as nodemailer.TransportOptions);
  const mailOptions = {
    to,
    subject,
    text,
    html,
  };
  return { transporter, mailOptions };
};

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
                clerkid: user.id
            },
            select: {
                notification: true,
                _count: {
                    select: {
                        notification: true
                    }
                }
            }
        })
    // console.log("----------------------------")
    // console.log(notifications)
    // console.log("----------------------------")
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
      if (addcomment)
        return { status: 200, data: "comment added successfully" };
    }
    return { status: 400, data: "comment posted" };
  } catch (error) {
    return { status: 400, data: "Something went wrong!" };
  }
};

export const getUserProfile = async () => {
  try {
    const user = await currentUser();
    if (!user) return { status: 400 };

    const userdetails = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        firstName: true,
        lastName: true,
        id: true,
        image: true,
      },
    });
    if (userdetails) return { status: 400, data: userdetails };
    return { status: 400, data: "failed" };
  } catch (error) {
    return { status: 500, data: "error" };
  }
};

export const getPaymentInfo = async () => {
  try {
    const user = await currentUser();
    if (!user) return { status: 404 };
    const payment = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });
    if (payment) {
      return { status: 200, data: payment };
    }
  } catch {
    return { status: 400 };
  }
};

export const inviteMemberAction = async (
  workspaceId: string,
  recevierId: string,
  emailRecevier: string
) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 404 };

    //getting sender info
    const sender = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    });

    //getting receiver info
    const recevier = await client.user.findUnique({
      where: {
        id: recevierId,
      },
      select: {
        firstName: true,
        lastName: true,
        email:true
      },
    });

    if (sender?.id && recevier) {
      const workspace = await client.workSpace.findUnique({
        where: {
          id: workspaceId,
        },
        select: {
          name: true,
          members: true,
        },
      });
      if (workspace) {
        const alreadyMember = await client.workSpace.findUnique({
          where: {
            id: workspaceId,
            members: {
              some: {
                userId: recevierId,
              },
            },
          },
        });

        if (alreadyMember)
          return {
            status: 400,
            data: "Selected user is already a memeber of the workspace",
          };

        //creating invite
        const invite = await client.invite.create({
          data: {
            senderId: sender.id,
            recieverId: recevierId,
            content: `You have been invited by ${sender.firstName} ${sender.lastName}(${sender.email}) to join the workspace "${workspace.name}"`,
            workSpaceId: workspaceId,
            accepted: false,
          },
          select: {
            id: true,
          },
        });
        //creating notifications on sender
        const notify = await client.user.update({
          where: {
            id: sender.id,
          },
          data: {
            notification: {
              create: {
                content: `${recevier.firstName} ${recevier.lastName}(${recevier.email}) is invited to join ${workspace.name} workspace.`,
              },
            },
          },
        });

        if (invite) {
          const { transporter, mailOptions } = await sendMail(
            emailRecevier,
            "You got an invitation",
            "You are invited to join ${workspace.name} Workspace, click accept to confirm",
            `<!-- Container -->
<div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px; text-align: center;">
  <!-- Logo + App Name -->
  <div style="margin-bottom: 30px;">
    <img
      src=""
      alt="ClipIQ Logo"
      width="48"
      height="48"
      style="vertical-align: middle;"
    />
    <span style="font-size: 24px; font-weight: bold; color: #333; vertical-align: middle; margin-left: 8px;">
      ClipIQ
    </span>
  </div>

  <!-- Invitation Message -->
  <p style="font-size: 16px; color: #555; line-height: 1.5; margin-bottom: 30px;">
    You’ve been invited to join a workspace on ClipIQ. Click the button below to accept your invitation and get started!
  </p>

  <!-- Button (table for email compatibility) -->
  <table
    role="presentation"
    cellpadding="0"
    cellspacing="0"
    style="margin: 0 auto 40px; border-collapse: separate !important; border-radius: 6px; overflow: hidden;"
  >
    <tr>
      <td
        style="
          background-color: #0070f3;
          padding: 12px 24px;
          text-align: center;
        "
      >
        <a
          href="${process.env.NEXT_PUBLIC_HOST_URL}/invite/${invite.id}"
          style="
            font-size: 16px;
            color: #ffffff;
            text-decoration: none;
            display: inline-block;
          "
        >
          Accept Invitation
        </a>
      </td>
    </tr>
  </table>

  <!-- Fallback Link -->
  <p style="font-size: 14px; color: #999; line-height: 1.4;">
    If the button above doesn’t work, copy and paste this link into your browser:<br/>
    <a
      href="${process.env.NEXT_PUBLIC_HOST_URL}/invite/${invite.id}"
      style="color: #0070f3; word-break: break-all;"
    >
      ${process.env.NEXT_PUBLIC_HOST_URL}/invite/${invite.id}
    </a>
  </p>
</div>
`
          );

          transporter.sendMail(mailOptions, (error: Error | null, info: nodemailer.SentMessageInfo) => {
            if (error) {
              console.log("🔴", error.message);
            } else {
              console.log("✅ Email Sent", info);
            }
          });
          return { status: 200, data: "Invite sent" };
        }
        return { status: 400, data: "invitation failed" };
      }
      return { status: 404, data: "workspace not found" };
    }
    return { status: 404, data: "recipient not found" };
  } catch (error) {
    console.log(error);
    return { status: 500, data: "Oops! something went wrong" };
  }
};

export const acceptInviteAction = async (inviteId: string) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 404, data: "Signin to accept invite" };

    const recevier = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        id: true,
      },
    });

    const invite = await client.invite.findUnique({
      where: {
        id: inviteId,
      },
      select: {
        accepted:true,
        recieverId: true,
        workSpaceId: true,
        WorkSpace: {
          select: {
            name: true,
          },
        },
      },
    });

    if (invite) {
      if (invite.recieverId !== recevier?.id)
        return { status: 401, data: "Not authorised to accept this invite" };

      if(invite.accepted===true) return { status:402 , data:"Already a member"}

      const membersTransaction = await client.$transaction([
        client.invite.update({
          where: {
            id: inviteId,
          },
          data: {
            accepted: true,
          },
        }),
        client.user.update({
          where: {
            clerkid: user.id,
          },
          data: {
            members: {
              create: {
                workSpaceId: invite.workSpaceId,
              },
            },
          },
        }),
      ]);

      if (membersTransaction) {
        await client.user.update({
          where: {
            id: recevier.id,
          },
          data: {
            notification: {
              create: {
                content: `You have joined ${invite.WorkSpace?.name}`,
              },
            },
          },
        });
        return { status: 200 , data:"Invitation Accepted" };
      }
    }
    return {status:400, data:"Invitation does not exist"}
  } catch (error) {
    return {status:500 , data:"Oops! Something went wrong"}
  }
};

export const completeSubscription = async (session: string) => {
    try {
      const user = await currentUser()
      if (!user) return { status: 404 }
  
      // const session = await stripe.checkout.sessions.retrieve(session_id)
      // if (session) {
        const customer = await client.user.update({
          where: {
            clerkid: user.id,
          },
          data: {
            subscription: {
              update: {
                data: {
                  customerId: session,
                  plan: 'PRO',
                },
              },
            },
          },
        })
        if (customer) {
          return { status: 200 , data: "Subscription completed successfully" }
        // }
      }
      return { status: 404 , data: "Subscription failed" }
    } catch  {
      return { status: 400 , data: "Oops! Something went wrong" }
    }
  }