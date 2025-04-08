"use client"

import CreateServerModal from "@/components/modals/create-server-modal";
import { useEffect, useState } from "react";

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
        </>
    )
}

