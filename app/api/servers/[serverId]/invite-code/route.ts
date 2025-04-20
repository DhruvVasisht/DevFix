import { v4 as uuidv4 } from "uuid";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { serverId: string } }) {
  try {
    const resolvedParams = await params;
    const profile = await currentProfile();

    // Check if user is authenticated
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if serverId is provided
    if (!resolvedParams.serverId) {
      return new NextResponse("Server ID missing", { status: 400 });
    }

    // Verify that the user is a member of the server with ADMIN or MODERATOR role
    const member = await db.member.findFirst({
      where: {
        serverId: resolvedParams.serverId,
        profileId: profile.id,
        role: { in: ["ADMIN", "MODERATOR"] }, // Allow both Admins and Moderators
      },
    });

    if (!member) {
      return new NextResponse("Unauthorized: You are not an Admin or Moderator", { status: 403 });
    }

    // Update the server's invite code
    const server = await db.server.update({
      where: {
        id: resolvedParams.serverId,
      },
      data: {
        inviteCode: uuidv4(),
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVER_ID_PATCH]", error);
    if (error) {
      return new NextResponse("Server not found", { status: 404 });
    }
    return new NextResponse("Internal Error", { status: 500 });
  }
}