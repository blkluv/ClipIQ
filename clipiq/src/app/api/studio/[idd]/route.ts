import client from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, context: { params: { idd: string } }) {
  const { screen, audio, preset } = await req.json();
  try {
    const id =  context.params.idd;
    console.log(id,"-------------------------------")
    console.log("reched............");
    const studio = await client.user.update({
      where: {
        id:id
      },
      data: {
        studio: {
          update: {
            screen: screen,
            mic: audio,
            preset: preset,
          },
        },
      },
    });
    if (studio)
      return NextResponse.json({ status: 200, data: "Settings saved" });
    return NextResponse.json({ status: 400, data: "Settings saving failed" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, data: "Internal Server Error" });
  }
}
