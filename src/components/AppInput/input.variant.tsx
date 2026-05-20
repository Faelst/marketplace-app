import { tv, VariantProps } from "tailwind-variants";

export const appInputVariants = tv({
  slots: {
    container: "w-full my-4",
    wrapper: "flex-row items-center border-b border-gray-200 pb-2 gap-2",
    input: "flex-1 bg-transparent text-base text-gray-900 text-base",
    label: "text-gray-400 mb-3 font-semibold text-sm",
    error: "text-danger mt-1 text-sm",
    leftIcon: "text-purple-base",
  },
  variants: {
    isFocused: {
      true: {
        wrapper: "border-purple-base",
        label: "text-purple-base",
        leftIcon: "#7A31D8",
      },
    },
    isError: {
      true: {
        wrapper: "border-danger",
        label: "text-danger",
        leftIcon: "#DC2626",
      },
    },
    isDisabled: {
      true: {
        wrapper: "border-gray-200",
        label: "text-gray-200",
        input: "text-gray-200",
        leftIcon: "#D1D5DB",
      },
    },
  },
  defaultVariants: {
    isFocused: false,
    isError: false,
    isDisabled: false,
  },
});

export type AppInputVariants = VariantProps<typeof appInputVariants>;
