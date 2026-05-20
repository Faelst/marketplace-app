import { create } from "zustand";

interface ModalConfig {
  animationType?: "fade" | "slide" | "none";
  transparent?: boolean;
  statusBarTranslucent?: boolean;
}

interface ModalStore {
  isOpen: boolean;
  config: ModalConfig;
  content: React.ReactNode | null;
  open: (content: React.ReactNode, config?: ModalConfig) => void;
  close: () => void;
}

export const useModalStore = create<ModalStore>((set, get) => ({
  isOpen: false,
  content: null,
  config: {
    animationType: "fade",
    transparent: true,
    statusBarTranslucent: true,
  },
  open: (content, config) => {
    return set({
      isOpen: true,
      content,
      config: {
        ...get().config,
        ...config,
      },
    });
  },
  close: () => {
    set({ isOpen: false, content: null });
  },
}));
