import { Hash } from 'lucide-react'
import { MobileToggle } from "../mobile-toggle"
import UserAvatar from "../user-avatar"
import { SocketIndicator } from "../socket-indicator"
import { ChatVideoButton } from "./chat-video-button"

interface ChatHeaderProps {
  serverId: string
  type: "channel" | "conversation"
  name: string
  imageUrl?: string
}

const ChatHeader = ({ serverId, name, type, imageUrl }: ChatHeaderProps) => {
  return (
    <div
      className="text-md font-semibold px-3 flex items-center h-14 border-neutral-200
         dark:border-neutral-800 border-b-[0.5px] sticky top-0 bg-white/95 dark:bg-[#313338]/95 backdrop-blur-sm z-10"
    >
      <MobileToggle serverId={serverId} />

      {type === "channel" && (
        <div className="bg-emerald-500/10 dark:bg-emerald-500/20 p-2 rounded-md mr-2">
          <Hash className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        </div>
      )}

      {type === "conversation" && (
        <UserAvatar src={imageUrl} className="h-9 w-9 md:h-9 md:w-9 mr-2" />
      )}

      <p className="font-bold text-base text-black dark:text-white">{name}</p>

      <div className="ml-auto flex items-center">
        {type === "conversation" && <ChatVideoButton />}
        <SocketIndicator />
      </div>
    </div>
  )
}

export default ChatHeader
