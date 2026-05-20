import React from "react";
import {
  AppButtonVariantEnum,
  AppButtonVariants,
  appButtonVariants,
} from "./button.variant";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";

interface AppButtonProps extends TouchableOpacityProps, AppButtonVariants {
  label?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  variant?: AppButtonVariantEnum;
  isLoading?: boolean;
  className?: string;
}

export const AppButton: React.FC<AppButtonProps> = ({
  leftIcon,
  rightIcon,
  label,
  variant = AppButtonVariantEnum.FILLED,
  isDisabled,
  isLoading,
  className,
  ...rest
}: AppButtonProps) => {
  const styles = appButtonVariants({
    variant,
    isDisabled,
    isLoading,
    hasIcon: !!leftIcon || !!rightIcon,
  });

  const contentColor =
    variant === AppButtonVariantEnum.FILLED
      ? colors.white
      : colors["purple-base"];

  const renderContent = () => {
    if (isLoading) {
      return <ActivityIndicator size={"small"} color={contentColor} />;
    }

    return (
      <>
        {leftIcon && (
          <Ionicons name={leftIcon} size={20} color={contentColor} />
        )}

        {label && <Text className={styles.text()}>{label}</Text>}

        {rightIcon && (
          <Ionicons name={rightIcon} size={20} color={contentColor} />
        )}
      </>
    );
  };

  return (
    <TouchableOpacity className={styles.base({ className })} {...rest}>
      {renderContent()}
    </TouchableOpacity>
  );
};
