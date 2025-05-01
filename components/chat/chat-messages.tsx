"use client";

import { Member } from "@prisma/client";
import { ChatWelcome } from "./chat-welcome";

interface ChatMessagesProps {
    name: string;
    member:Member;
    chatId: string;
    apiUrl: string;
    socketUrl: string;
    socketQuery: Record<string, string>;
    paramKey: "channelId" | "conversationId";
    paramValue: string;
    type:"channel" | "conversation";
}

export const ChatMessages = ({name, member, chatId , apiUrl, socketUrl, socketQuery, paramKey, paramValue, type}:ChatMessagesProps) => {
    return (
        <div className="flex flex-col flex-1 h-full overflow-y-auto">
            <div className="flex-1">
                <ChatWelcome name={name} type={type} />
            </div>
        </div>
    );
}