import ChatHeader from "@/components/chat/chat-header";
import { getOrCreateConversation } from "@/lib/conversation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { SignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface MemberIdPage {
    params: {
        serverId: string;
        memberId: string;
    }
}

const MemberIdPage = async ({params}: MemberIdPage) => {
    const profile = await currentProfile();
    const resolvedParams = await params;
    if(!profile){
        return <SignIn fallbackRedirectUrl= '/' />
    }
    const currentMember = await db.member.findFirst({
        where:{
            serverId: resolvedParams.serverId, 
            profileId: profile.id,
        },
        include:{
            profile: true,
        }
    })
    if(!currentMember){
        return redirect('/')
    }

    const conversation = await getOrCreateConversation(currentMember.id, resolvedParams.memberId);
    if(!conversation){
        return redirect(`/servers/${resolvedParams.serverId}`);
    }

    const {memberOne, memberTwo} = conversation;
    const otherMember = memberOne.profileId === profile.id ? memberTwo : memberOne;

    return ( 
        <div className="h-full bg-white dark:bg-[#313338] flex flex-col ">
            <ChatHeader imageUrl={otherMember.profile.imageUrl} name={otherMember.profile.name} serverId={resolvedParams.serverId} type="conversation" />
        </div>
     );
}
 
export default MemberIdPage;

