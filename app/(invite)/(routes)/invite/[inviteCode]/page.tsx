import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface InviteCodePageProps {
  params: Promise<{ inviteCode: string }>; // Type params as a Promise
}

const InviteCodePage = async ({ params }: InviteCodePageProps) => {
  const profile = await currentProfile();
  if (!profile) {
    return <RedirectToSignIn />;
  }

  // Await params to resolve the Promise
  const { inviteCode } = await params;

  if (!inviteCode) {
    return redirect("/");
  }

  const existingServer = await db.server.findFirst({
    where: {
      inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }

  const server = await db.server.update({
    where: {
      inviteCode,
    },
    data: {
      members: {
        create: [{ profileId: profile.id }],
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return (
    <div>
      <h1>Invite Code</h1>
    </div>
  );
};

export default InviteCodePage;