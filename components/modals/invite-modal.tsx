"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCw } from "lucide-react";
import useOrigin from "@/hooks/use-origin";
import { useState } from "react";
import axios from "axios";

const InviteModal = () => {
  const { onOpen,isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "inviteDevs";
  const origin = useOrigin();
  const {server} =data;
  const inviteLink = `${origin}/invite/${server?.inviteCode}`;
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const onCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }

  const onNew = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(`/api/servers/${server?.id}/invite-code`); 
      onOpen("inviteDevs", {server: response.data});
    } catch (error) {
      console.log(error);
    }
    finally {
      setIsLoading(false);
    }
  }
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
          <div className="mt-2 flex items-center gap-x-2">
            <Input
              readOnly
              disabled={isLoading}
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              value={inviteLink}
            />
            <Button size="icon" onClick={onCopy} disabled={isLoading}>
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
            <Button variant={"link"} size={"sm"} className="text-xs bg-indigo-500" onClick={onNew} disabled={isLoading}>Generate New Link <RefreshCw className="w-4 h-4 ml-2" /></Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
