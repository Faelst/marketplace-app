import { createElement } from "react";
import { useModalStore } from "../store/modal-store";
import { Ionicons } from "@expo/vector-icons";
import {
  SelectionModal,
  SelectionModalProps,
} from "../../components/Modals/SelectionModal";
import {
  SuccessModal,
  SuccessModalProps,
} from "../../components/Modals/SuccessModal";

export interface SelectionOptions {
  title: string;
  message?: string;
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  variant?: "primary" | "secondary" | "danger";
}

export const useAppModal = () => {
  const { open, close } = useModalStore();

  const showSelection = (config: {
    title: string;
    message?: string;
    options: SelectionOptions[];
  }) => {
    open(
      createElement(SelectionModal, {
        options: config.options,
        title: config.title,
        message: config.message,
      } as SelectionModalProps),
      {},
    );
  };

  const showSuccess = (config: SuccessModalProps) => {
    const content = createElement(SuccessModal, {
      ...config,
      onButtonPress: () => {
        if (config.onButtonPress) {
          config.onButtonPress();
        }
        close();
      },
    });
    console.log("Showing success modal with content:", content);
    open(content, {});
  };

  return { showSelection, showSuccess };
};
