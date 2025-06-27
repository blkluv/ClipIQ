import client from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    req: NextRequest,
   { params }: { params: Promise<{ id: string }> }
) {
    try {
        const body = await req.json()
        const {id} = await params;
// console.log("Completing video processing for user ID:", id);
        // console.log("Request body:", body);
        const completeProcessing = await client.video.update({
            where: {
                userId: id,
                source: body.filename,
            },
            data: {
                processing: false,
                summary:body.transcript,
                title:body.title,
                description:body.description,
                source: body.videoUrl,
            },
        })

        if(completeProcessing) {
            // console.log("Video processing completed successfully");
            return NextResponse.json({status: 200})
        }
        // console.log("Failed to complete video processing");
        return NextResponse.json({status: 400})
    } catch (error) {
        console.error("Error in completing video processing:", error);
        return NextResponse.json({status: 500})
    }
}