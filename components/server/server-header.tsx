"use client";

import { ServerWithMemberWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, LogOut, PlusCircle, Settings, Trash, UserPlus, Users } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface ServerHeaderProps {
  server: ServerWithMemberWithProfiles;
  role?: MemberRole;
}

export const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const {onOpen} = useModal();
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition focus:outline-none cursor-pointer">
            {server.name}
            <ChevronDown className="h-5 w-5 ml-auto" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-white space-y-[2px]">
          {isModerator && (
            <DropdownMenuItem
              onClick={()=> onOpen("inviteDevs", { server })}
              className="flex justify-between cursor-pointer">
              Invite Devs <UserPlus className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
          )}
          {isAdmin && (
            <DropdownMenuItem 
            onClick={()=> onOpen("editServer", { server })}
            className="flex justify-between cursor-pointer">
              Codespace Settings <Settings className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
          )}
          {isAdmin && (
            <DropdownMenuItem onClick={()=> onOpen("members", { server })} className="flex justify-between cursor-pointer">
              Manage Devs <Users className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
          )}
          {isModerator && (
            <DropdownMenuItem className="flex justify-between cursor-pointer">
              Create Channel <PlusCircle className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
          )}
          {isModerator && (
            <DropdownMenuSeparator/>
          )}
          {isAdmin && (
            <DropdownMenuItem className="text-red-400 flex justify-between cursor-pointer ">
              Delete Codespace <Trash className="text-rose-500 h-4 w-4 ml-auto" />
            </DropdownMenuItem>
          )}
           {!isAdmin && (
            <DropdownMenuItem className="text-red-400 flex justify-between cursor-pointer ">
              Leave Codespace <LogOut className="text-rose-500 h-4 w-4 ml-auto" />
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
