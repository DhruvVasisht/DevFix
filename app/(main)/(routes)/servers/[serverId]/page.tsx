import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { SignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";


interface ServerIdPageProps {
    params: { 
        serverId: string; 
    };
}

const ServerPage = async (params:ServerIdPageProps) => {
    const profile = await currentProfile();
    const resolvedParams = await params;
    if(!profile){
        return <SignIn fallbackRedirectUrl="/" />
    }

    const server = await db.server.findUnique({
        where:{
            id:resolvedParams.params.serverId,
            members:{
                some:{
                    profileId:profile.id,
                }
            }

        },
        include:{
            channels:{
                where:{
                    name: "general",
                },
                orderBy:{
                    createdAt:"asc"
                }
            }
        }
    })

    const initialChannel = server?.channels[0];
    if(initialChannel?.name !== "general"){
        return null;
    }
    return redirect(`/servers/${resolvedParams.params.serverId}/channels/${initialChannel.id}`)
}
 
export default ServerPage;