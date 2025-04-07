import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import NavigationAction from "./navigation-action";

const NavigationSidebar = async () => {
    const profile = await currentProfile();
    if(!profile) {
        return redirect("/");
    }

    const servers = await db.server.findMany({
        where: {
            members: {
                some: {
                    id: profile.id,
                },
            },
        },
    });


  return (
    <div className="space-y-4 h-full w-full dark:bg-[#1E1F22] flex flex-col items-center justify-between py-3 text-primary">
        <NavigationAction />
    </div>
  )
}

export default NavigationSidebar