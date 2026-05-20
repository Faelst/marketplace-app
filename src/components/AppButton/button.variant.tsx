import { tv, VariantProps } from "tailwind-variants";

export enum AppButtonVariantEnum {
  FILLED = "filled",
  OUTLINED = "outlined",
}

export const appButtonVariants = tv({
  slots: {
    base: "w-full h-[38px] rounded-[10px] border px-4 flex-row items-center justify-start",
    text: "font-semibold text-base",
    icon: "",
  },
  variants: {
    hasIcon: {
      true: {
        base: "justify-between",
      },
      false: {
        base: "justify-center",
      },
    },
    isLoading: {
      true: {
        base: "opacity-60",
      },
      false: {
        base: "",
      },
    },
    isDisabled: {
      true: {
        base: "opacity-40",
      },
      false: {
        base: "",
      },
    },
    variant: {
      [AppButtonVariantEnum.FILLED]: {
        base: "bg-purple-base border-purple-base",
        text: "text-white",
      },
      [AppButtonVariantEnum.OUTLINED]: {
        base: "bg-transparent border-purple-base",
        text: "text-purple-base",
      },
    },
  },
  defaultVariants: {
    hasIcon: false,
    isLoading: false,
    isDisabled: false,
    variant: AppButtonVariantEnum.FILLED,
  },
});

export type AppButtonVariants = VariantProps<typeof appButtonVariants>;
