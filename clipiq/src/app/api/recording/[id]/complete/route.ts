import client from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    req: NextRequest,
   { params }: { params: Promise<{ id: string }> }
) {
    try {
        const body = await req.json()
        const {id} = await params;

        const completeProcessing = await client.video.update({
            where: {
                userId: id,
                source: body.filename,
            },
            data: {
                processing: false,
                summary:body.transcript,
                title:body.title,
                description:body.description
            },
        })

        if(completeProcessing) {
            return NextResponse.json({status: 200})
        }
        return NextResponse.json({status: 400})
    } catch (error) {
        return NextResponse.json({status: 500})
    }
}