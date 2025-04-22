"use client";

import { ServerWithMemberWithProfiles } from "@/types";
import { ChannelType, MemberRole } from "@prisma/client";
import { ActionTooltip } from "../action-tooltip";
import { Plus, Settings } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface ServerSectionProps {
  label: string;
  role?: MemberRole;
  sectionType: "channels" | "members";
  channelType: ChannelType;
  server?: ServerWithMemberWithProfiles;
}

const ServerSection = ({
  label,
  role,
  sectionType,
  channelType,
  server,
}: ServerSectionProps) => {
    const {onOpen} = useModal();
  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      {role !== MemberRole.GUEST && sectionType === "channels" && (
        <ActionTooltip label="Create Node" side="top">
          <button onClick={()=> onOpen("createChannel")} className="darK:hover:text-white transition">
            <Plus className="w-4 h-4 cursor-pointer" />
          </button>
        </ActionTooltip>
      )}
      {role === MemberRole.ADMIN && sectionType === "members" && (
        <ActionTooltip label="Create Node" side="top">
          <button className="darK:hover:text-white transition">
            <Settings className="w-4 h-4 cursor-pointer" />
          </button>
        </ActionTooltip>
      )}
    </div>
  );
};

export default ServerSection;
