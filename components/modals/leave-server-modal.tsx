"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { useState } from "react";

const LeaveServerModal = () => {
  const { onOpen,isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "LeaveServer";
  const {server} =data;
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="text-black bg-white p-0 overflow-hidden ">
        <DialogHeader className="pt-8 px-6">
         <DialogTitle className="text-2xl font-bold text-center">
            Leave Server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to leave <span className="font-bold text-indigo-500">{server?.name}</span> ?
          </DialogDescription>
         
        <div className="p-6">
         Leave Server
        </div>
        </DialogHeader>
        <DialogFooter>
        
      </DialogFooter>
      </DialogContent>
      
    </Dialog>
  );
};

export default LeaveServerModal;
