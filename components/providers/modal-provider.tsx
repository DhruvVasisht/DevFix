"use client"

import CreateServerModal from "@/components/modals/create-server-modal";
import { useEffect, useState } from "react";
import InviteModal from "@/components/modals/invite-modal";
import { EditServerModal } from "../modals/edit-server-modal";
export const ModalProvider = () => {
    const [mounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!mounted) {
        return null;
    }
    
    return (
        <>
        <CreateServerModal />
        <InviteModal />
        <EditServerModal />
        </>
    )
}

