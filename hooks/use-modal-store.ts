import { Server } from '@prisma/client';
import { create } from 'zustand';

export type ModalType = "createServer" | "inviteDevs" | "editServer" | "members" | "createChannel" | 
"LeaveServer" | "deleteServer";

interface ModalData {
  server?: Server;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) =>{document.body.style.pointerEvents = "auto", set({ type, isOpen: true, data })},
  onClose: () =>{ document.body.style.pointerEvents = "auto",  set({ type:null, isOpen: false, data:{} })}, // Clear data
}));