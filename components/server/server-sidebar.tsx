import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

interface ServerSideBarProps {
  serverId: string;
}

const ServerSideBar = async ({ serverId }: ServerSideBarProps) => {
  const profile = await currentProfile();
  if (!profile) {
    redirect("/");
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });
    if (!server) {
        redirect("/");
    }

  const role = server.members.find((member) => member.profile.id === profile.id)?.role;

  const textChannels = server?.channels.filter((channel)=>channel.type === ChannelType.TEXT);
  const videoChannels = server?.channels.filter((channel)=>channel.type === ChannelType.VIDEO);
  const audioChannels = server?.channels.filter((channel)=>channel.type === ChannelType.AUDIO);
  const members = server?.members.filter((member) => member.profile.id !== profile.id);
  
  return ( 
  <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31]">
    ServerSideBar
    </div>
  );
};

export default ServerSideBar;
