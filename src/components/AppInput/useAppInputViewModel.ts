import { useRef, useState } from "react";
import { FocusEvent, TextInput } from "react-native";
import { colors } from "../../styles/colors";

interface AppInputViewModel {
  value?: string;
  isError?: boolean;
  isDisabled?: boolean;
  secureTextEntry?: boolean;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
  mask?: (value: string) => void | string;
  onChangeText?: (text: string) => string | void;
}

export const useAppInputViewModel = ({
  secureTextEntry,
  isError,
  isDisabled,
  onFocus,
  onBlur,
  mask,
  onChangeText,
  value,
}: AppInputViewModel) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<TextInput>(null);

  const handlePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleWrapperPress = () => {
    inputRef.current?.focus();
  };

  const handleFocus = (event: FocusEvent) => {
    setIsFocused(true);
    onFocus?.(event);
  };

  const handleBlur = (event: FocusEvent) => {
    setIsFocused(false);
    onBlur?.(event);
  };

  const handleTextChange = (text: string) => {
    if (mask) {
      onChangeText?.((mask(text) as string) || "");
    } else {
      onChangeText?.(text);
    }
  };

  const getIconColor = () => {
    if (isError) {
      return colors["danger"];
    }

    if (value) {
      return colors["purple-base"];
    }

    if (isFocused) {
      return colors["purple-base"];
    }

    return colors["grays"][200];
  };

  const handlePasswordToggle = () => {
    setShowPassword((prevValue) => !prevValue);
  };

  return {
    inputRef,
    showPassword,
    isFocused,
    handlePasswordVisibility,
    handleWrapperPress,
    handleFocus,
    handleBlur,
    getIconColor,
    handleTextChange,
    handlePasswordToggle,
  };
};
