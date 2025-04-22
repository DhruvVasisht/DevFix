import { ChannelType, MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ServerHeader } from "./server-header";
import { ScrollArea } from "../ui/scroll-area";
import { ServerSearch } from "./server-search";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { Separator } from "../ui/separator";
import ServerSection from "./server-section";
import { ServerChannel } from "./server-channel";
import ServerMember from "./server-member";


interface ServerSideBarProps {
  serverId: string;
}

const iconMap  = {
  [ChannelType.TEXT] : <Hash className="mr-2 h-4 w-4" />,
  [ChannelType.VIDEO] : <Video className="mr-2 h-4 w-4" />,
  [ChannelType.AUDIO] : <Mic className="mr-2 h-4 w-4" />
};

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: <ShieldCheck className="h-4 w-4 mr-2 text-red-400"/>,
  [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 mr-2 text-red-400"/>,



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
  <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
    <ServerHeader server={server} role={role} />
    <ScrollArea className="px-3 flex-1">
      <div className="mt-2">
        <ServerSearch data={[{
          label: "Threads",
          type: "channel",
          data: textChannels?.map((channel) => ({
            icon: iconMap[channel.type],
            name: channel.name,
            id: channel.id,
          })),
        },
        {
          label: "Ping Pods",
          type: "channel",
          data: audioChannels?.map((channel) => ({
            icon: iconMap[channel.type],
            name: channel.name,
            id: channel.id,
          })),
        },
        {
          label: "Pixel Pods",
          type: "channel",
          data: videoChannels?.map((channel) => ({
            icon: iconMap[channel.type],
            name: channel.name,
            id: channel.id,
          })),
        },
        {
          label: "Developers",
          type: "member",
          data: members?.map((member) => ({
            name: member.profile.name,
            id: member.id,
            icon: roleIconMap[member.role],
          })),
        }
        ]} />

      </div>
      <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2"/>
      {!!textChannels?.length && (
        <div className="mb-2">
          <ServerSection server={server} label="Threads" role={role} sectionType="channels" 
          channelType={ChannelType.TEXT} />
          {textChannels.map((channel)=>(
            <ServerChannel key={channel.id} channel={channel} server={server} role={role} />
          ))}
        </div>
      )}
      {!!audioChannels?.length && (
        <div className="mb-2">
          <ServerSection server={server} label="Ping Pods" role={role} sectionType="channels" 
          channelType={ChannelType.AUDIO} />
          {audioChannels.map((channel)=>(
            <ServerChannel key={channel.id} channel={channel} server={server} role={role} />
          ))}
        </div>
      )}
      {!!videoChannels?.length && (
        <div className="mb-2">
          <ServerSection server={server} label="Pixel Pods" role={role} sectionType="channels" 
          channelType={ChannelType.VIDEO} />
          {videoChannels.map((channel)=>(
            <ServerChannel key={channel.id} channel={channel} server={server} role={role} />
          ))}
        </div>
      )}
      {!!members?.length && (
        <div className="mb-2">
          <ServerSection server={server} label="Developers" role={role} sectionType="members" 
          channelType={ChannelType.VIDEO} />
          {members.map((channel)=>(
            <ServerMember />
          ))}
          </div>
      )}
    </ScrollArea>
    </div>
  );
};

export default ServerSideBar;
