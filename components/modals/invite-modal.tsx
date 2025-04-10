"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Label } from "@/components/ui/label";

 

const InviteModal = () => {
    const {isOpen , onClose , type} = useModal();
    const isModalOpen = isOpen && type === "inviteDevs";
  

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="text-black bg-white p-0 overflow-hidden ">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl font-bold text-center">
           Invite Developers 
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
            Codespace Invite Link
          </Label>

        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
