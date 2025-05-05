import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH (req:Request, { params }: { params: Promise<{ serverId: string }> }) {
  
  const resolvedParams = await params;
  
  try {
    const profile = await currentProfile();
    if(!profile) {
      return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }
    if(!resolvedParams.serverId) {
      return new NextResponse(JSON.stringify({ message: 'Server ID is required' }), { status: 400 });
    }
    const server = await db.server.update({
        where: {
            id: resolvedParams.serverId,
            profileId: {not: profile.id},
            members:{
                some:{
                    profileId: profile.id,
                }
            }
        },
        data: {
            members: {
            deleteMany: {
                profileId: profile.id,
            },
            },
        },
    })
    return NextResponse.json(server);

  } 
  catch (error) {
    console.log("[SERVER_ID_LEAVE]", error);
    return new NextResponse(JSON.stringify({ message: 'Failed to leave server' }), { status: 500 });
  }
}
