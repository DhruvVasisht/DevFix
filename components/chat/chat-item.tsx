"use client";

import { Member, Profile } from "@prisma/client";
import UserAvatar from "../user-avatar";
import { ActionTooltip } from "../action-tooltip";
import { ShieldCheck, ShieldAlert, FileIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ChatItemProps {
  id: string;
  content: string;
  fileUrl: string | null;
  member: Member & {
    profile: Profile;
  };
  timestamp: string;
  deleted: boolean;
  currentMember: Member;
  isUpdated: boolean;
  socketUrl: string;
  socketQuery: Record<string, string>;
}

const roleIconMap = {
  ADMIN: <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />,
  MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-rose-500" />,
  GUEST: null,
};

export const ChatItem = ({
  id,
  content,
  fileUrl,
  member,
  timestamp,
  deleted,
  currentMember,
  isUpdated,
  socketUrl,
  socketQuery,
}: ChatItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [fileType, setFileType] = useState<string | null>(null);

  const isAdmin = currentMember.role === "ADMIN";
  const isModerator = currentMember.role === "MODERATOR";
  const isOwner = currentMember.id === member.id;
  const canEdit = !deleted && isOwner && !fileUrl;
  const canDelete = !deleted && (isOwner || isAdmin || isModerator);
  const isPdf = fileType === "pdf" && fileUrl;
  const isImage = fileType === "image" && fileUrl;

  useEffect(() => {
    const detectFileType = async () => {
      if (!fileUrl) return;

      try {
        const response = await fetch(fileUrl, { method: "HEAD" });
        const contentType = response.headers.get("content-type");

        if (contentType?.includes("application/pdf")) {
          setFileType("pdf");
        } else if (contentType?.startsWith("image/")) {
          setFileType("image");
        } else {
          setFileType(null);
        }
      } catch (error) {
        console.error("Error detecting file type:", error);
        setFileType(null);
      }
    };

    detectFileType();
  }, [fileUrl]);

  return (
    <div className="relative group flex items-center hover:bg-black/5 p-4 w-full transition">
      <div className="group flex gap-x-2 items-start w-full">
        <div className="cursor-pointer hover:drop-shadow-md transition">
          <UserAvatar src={member.profile.imageUrl} />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-x-2">
            <div className="flex items-center justify-center">
              <p className="font-semibold cursor-pointer hover:underline">
                {member.profile.name}
              </p>
              <ActionTooltip label={member.role}>
                {roleIconMap[member.role]}
              </ActionTooltip>
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {timestamp}
            </span>
          </div>
          {isImage && (
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square w-48 h-48 overflow-hidden rounded-md border flex items-center bg-secondary"
            >
              <Image
                src={fileUrl}
                alt={content}
                fill
                className="object-cover"
              />
            </a>
          )}
          {isPdf && (
            <div className="relative flex items-center p-2 mt-2 rounded-md">
              <FileIcon className="h-10 w-10 fill-blue-200 stroke-indigo-400" />
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
              >
                PDF File
              </a>
            </div>
          )}
          {!isImage && !isPdf && fileUrl && (
            <div className="relative flex items-center p-2 mt-2 rounded-md">
              <FileIcon className="h-10 w-10 fill-blue-200 stroke-indigo-400" />
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
              >
                File
              </a>
            </div>
          )}
          {!fileUrl && !isEditing && (
            <p
              className={cn(
                "text-sm text-zinc-600 dark:text-zinc-300",
                deleted &&
                  "italic text-zinc-500 dark:text-zinc-400 text-xs mt-1"
              )}
            >
              {content}
              {isUpdated && !deleted && (
                <span className="text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">
                  (edited)
                </span>
              )}
            </p>
          )}
        </div>
      </div>
      {}
    </div>
  );
};
