import ChatHeader from "@/components/chat/chat-header";
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
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader />
        </div>
      );
}
 
export default ChannelIdPage;