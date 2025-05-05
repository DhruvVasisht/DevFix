import { Channel, ChannelType, Server } from '@prisma/client';
import { create } from 'zustand';

export type ModalType = "createServer" | "inviteDevs" | "editServer" | "members" | "createChannel" | 
"LeaveServer" | "deleteServer" | "deleteChannel" | "editChannel";
interface ModalData {
  server?: Server;
  channelType?:ChannelType;
  channel?: Channel;
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
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  onOpen: (type, data = {}) =>{document.body.style.pointerEvents = "auto", set({ type, isOpen: true, data })},
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  onClose: () =>{ document.body.style.pointerEvents = "auto",  set({ type:null, isOpen: false, data:{} })}, // Clear data
}));
