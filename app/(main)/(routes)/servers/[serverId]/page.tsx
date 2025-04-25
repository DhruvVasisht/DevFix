import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { SignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface ServerIdPageProps {
  params: Promise<{ serverId: string }>; // Use Promise for params
}

const ServerPage = async (props: ServerIdPageProps) => {
  const params = await props.params; // Await params
  const profile = await currentProfile();

  if (!profile) {
    return <SignIn fallbackRedirectUrl="/" />;
  }

  const server = await db.server.findUnique({
    where: {
      id: params.serverId, // Use awaited params
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: "general",
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  const initialChannel = server?.channels[0];
  if (initialChannel?.name !== "general") {
    return null;
  }

  return redirect(`/servers/${params.serverId}/channels/${initialChannel.id}`);
};

export default ServerPage;