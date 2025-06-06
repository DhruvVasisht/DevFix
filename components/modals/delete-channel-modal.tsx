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
import { Button } from "../ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import qs from "query-string";

const DeleteChannelModal = () => {
  const {isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "deleteChannel";
  const { server, channel } = data;
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const onClick = async () => {
    try {
      setIsLoading(true);
      const url = qs.stringifyUrl({url:`/api/channels/${channel?.id}`, query: { serverId: server?.id}});
      await axios.delete(url)
      onClose();
      router.push(`/servers/${server?.id}`);
      router.refresh(); 
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="text-black bg-white p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl font-bold text-center">
            Delete Node
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to delete this? <br />
            <span className="text-indigo-500 font-semibold">{channel?.name}</span> will be permanently deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="px-6 py-4 bg-gray-100">
          <div className="flex items-center justify-between w-full">
            <Button disabled={isLoading} variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button disabled={isLoading} variant="primary" onClick={onClick}>
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteChannelModal;
