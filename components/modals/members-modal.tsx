"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { ServerWithMemberWithProfiles } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserAvatar from "@/components/user-avatar";
import { ShieldAlert, ShieldCheck } from "lucide-react";

const MembersModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "members";
  const { server } = data as { server: ServerWithMemberWithProfiles };
  const roleIconMap = {
    "GUEST" : null,
    "ADMIN" : <ShieldAlert className="h-4 w-4 text-rose-500"/>,
    "MODERATOR" : <ShieldCheck className="h-4 w-4 text-indigo-500 ml-2" />,
    
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="text-black bg-white overflow-hidden ">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl font-bold text-center">
            Invite Developers
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            {server?.members?.length} Members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[420px] pr-6">
          {server?.members?.map((member) => (
            <div key={member.id} className="flex items-center gap-x-2 mb-6">
              <UserAvatar src={member.profile.imageUrl} />
              <div className="flex flex-col gap-y-1 ">
                <div className="text-sm font-semibold flex items-center gap-x-2 ">{member.profile.name} {roleIconMap[member.role]}</div>
              
              <p className="text-xs text-zinc-500 ml-auto">
                {member.profile.email}
              </p>
              <div>
                
              </div>
            </div>
            </div>
          ))}

        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default MembersModal;
