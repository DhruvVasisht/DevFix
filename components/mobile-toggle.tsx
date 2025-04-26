import { Menu } from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import NavigationSidebar from "@/components/navigation/navigation-sidebar";
import ServerSidebar from "@/components/server/server-sidebar";

export const MobileToggle = ({
    serverId
}: {
    serverId: string;
}) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 grid grid-cols-[72px_1fr] gap-0">
                <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
                <div className="w-[72px] h-full">
                    <NavigationSidebar />
                </div>
                <div className="flex-1 h-full">
                    <ServerSidebar serverId={serverId} />
                </div>
            </SheetContent>
        </Sheet>
    )
}
