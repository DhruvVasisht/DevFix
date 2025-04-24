import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";

export async function DELETE(
  request: Request,
  { params }: { params: { channelId: string } }
) {
  try {
    const resolvedParams = await params;
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { searchParams } = new URL(request.url);
    const serverId = searchParams.get("serverId");
    if (!serverId) {
      return new NextResponse("Server ID missing", { status: 400 });
    }
    if (!resolvedParams.channelId) {
      return new NextResponse("Channel ID missing", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          delete: {
            id: resolvedParams.channelId,
            name: {
              not: "general",
            },
          },
        },
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.error("[CHANNEL_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}


export async function PATCH(request:Request,{ params }: { params: { channelId: string } }){
  try {
    const resolvedParams = await params;
    const {name, type} = await request.json();
    const profile = await currentProfile();
    const { searchParams } = new URL(request.url);
    const serverId = searchParams.get("serverId");
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!serverId) {
      return new NextResponse("Server ID missing", { status: 400 });
    }
    if (!resolvedParams.channelId) {
      return new NextResponse("Channel ID missing", { status: 400 });
    }
    if (name==="general") {
      return new NextResponse("Name Cannot Be 'general", { status: 400 });
    }

    const server = await db.server.update({
      where:{
        id:serverId,
        members:{
          some:{
            profileId:profile.id,
            role:{
              in:[MemberRole.ADMIN,MemberRole.MODERATOR]
            }
          }
        }
      },
      data:{
        channels:{ 
          update:{
            where:{
              id: resolvedParams.channelId,
              NOT:{
                name:"general",
            },
          },
          data:{
            name:name,
            type:type
          }
        }
      }
    }
    });
    return NextResponse.json(server);
  } 
  catch (error) {
    console.error("[CHANNEL_ID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
    
  }
}