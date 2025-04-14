import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "./ui/avatar";

interface UserAvatarProps {
    src?: string;
    className?: string;
}

const UserAvatar = ({src , className}: UserAvatarProps) => {
    return (
        <Avatar className={cn("md:h-10 w-10 " , className)}>
            <AvatarImage src={src}/>

        </Avatar>
      );
}
 
export default UserAvatar;