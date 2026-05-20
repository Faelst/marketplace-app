import { create } from "zustand";

interface BottomSheetConfig {
  snapPoints: string[];
  enablePanDownToClose?: boolean;
}

interface BottomSheetStore {
  isOpen: boolean;
  content: React.ReactNode | null;
  config?: BottomSheetConfig;

  open: (params: {
    content: React.ReactNode;
    config?: Partial<BottomSheetConfig>;
  }) => void;
  close: () => void;
}

const defaultConfig: BottomSheetConfig = {
  snapPoints: ["50%", "100%"],
  enablePanDownToClose: true,
};

export const useBottomSheetStore = create<BottomSheetStore>((set) => ({
  isOpen: false,
  content: null,
  config: defaultConfig,
  open: ({ content, config }) =>
    set({
      isOpen: true,
      content,
      config: { ...defaultConfig, ...config },
    }),
  close: () =>
    set({
      isOpen: false,
      content: null,
      config: defaultConfig,
    }),
}));
