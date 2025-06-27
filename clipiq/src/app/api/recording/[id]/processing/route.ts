import client from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
{ params }: { params: Promise<{ id: string }> }
) {
  // console.log("Processing video request received");
  try {
    // console.log("Request received:", req);
    const body = await req.json();
    // console.log("Request body:", body);

    const {id} = await params;
    console.log(id);

    const personalworkspaceId = await client.user.findUnique({
      where: {
        id:id
      },
      select: {
        workspace: {
          where: {
            type: "PERSONAL",
          },
          select: {
            id: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });
    // console.log(personalworkspaceId)

    const startProcessingVideo = await client.workSpace.update({
      where: {
        id: personalworkspaceId?.workspace[0]?.id,
      },
      data: {
        videos: {
          create: {
            source: body.filename,
            userId: id,
          },
        },
      },
      select: {
        User: {
          select: {
            subscription: {
              select: {
                plan: true,
              },
            },
          },
        },
      },
    });

    // console.log("Start processing video:", startProcessingVideo);
    if (startProcessingVideo) {
      return NextResponse.json({
        status: 200,
        plan: startProcessingVideo.User?.subscription?.plan,
      });
    }
    return NextResponse.json({ status: 400 });
  } catch (error) {
    // console.log("Error in processing video",);
    return NextResponse.json(
      { status: 500, message: "Internal server error" },{ status: 500 })
  }
}
