import { v4 as uuidv4 } from "uuid";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    context: { params: { serverId: string } }
  ) {
    const { serverId } = await context.params;
  
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
  
    if (!serverId) {
      return new NextResponse("Server ID Missing", { status: 400 });
    }
  
    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        inviteCode: uuidv4(),
      },
    });
  
    return NextResponse.json(server);
  }
    