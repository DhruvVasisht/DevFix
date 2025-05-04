import ChatHeader from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { SignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface ChannelIdPageProps {
    params:{
        serverId: string,
        channelId: string
    }
}

const ChannelIdPage = async ({params}:ChannelIdPageProps) => {
    const profile = await currentProfile();
    const resolvedParams = await params;
    if(!profile) {
        return <SignIn fallbackRedirectUrl="/" />;
    }

    const channel = await db.channel.findUnique({
        where:{
            id:resolvedParams.channelId
        }
    })
    const member = await db.member.findFirst({
        where:{
            serverId: resolvedParams.serverId,
            profileId: profile.id,
        }
    })
    if(!member || !channel) {
        redirect("/");
    }
        return (
            <div className="bg-white dark:bg-[#313338] flex flex-col h-full overflow-hidden">
              {/* Chat Header */}
              <div className="shrink-0">
                <ChatHeader 
                  serverId={resolvedParams.serverId}
                  name={channel.name}
                  type="channel"
                />
              </div>
          
              {/* Scrollable Messages */}
              <div className="flex-1 min-h-0 overflow-y-auto">
                <ChatMessages
                  member={member}
                  chatId={channel.id}
                  name={channel.name}
                  type="channel"
                  apiUrl="/api/messages"
                  socketUrl="/api/socket/messages"
                  socketQuery={{
                    channelId: channel.id,
                    serverId: channel.serverId,
                  }}
                  paramKey="channelId"
                  paramValue={channel.id}
                />
              </div>
          
              {/* Fixed Chat Input */}
              <div className="shrink-0">
                <ChatInput
                  name={channel.name}
                  type="channel"
                  apiUrl="/api/socket/messages"
                  query={{
                    channelId: resolvedParams.channelId,
                    serverId: resolvedParams.serverId,
                  }}
                />
              </div>
            </div>
          );
}
 
export default ChannelIdPage;