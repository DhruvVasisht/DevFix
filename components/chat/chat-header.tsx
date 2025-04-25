import { Hash, Menu } from "lucide-react";

interface ChatHeaderProps {
    serverId: string;
    type:"channel" | "conversation";
    name:string;
    imageUrl?:string;
}
const ChatHeader = ({serverId, name, type, imageUrl}:ChatHeaderProps) => {
    return (
        <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-[0.5px]">
            <Menu/>
            {type === "channel"}
        </div>
      );
}
 
export default ChatHeader;