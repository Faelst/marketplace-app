import {
  Pressable,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { AppInputVariants, appInputVariants } from "./input.variant";
import { Ionicons } from "@expo/vector-icons";
import { useAppInputViewModel } from "./useAppInputViewModel";

export interface AppInputProps extends TextInputProps, AppInputVariants {
  label?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  containerClassName?: string;
  mask?: (value: string) => void | string;

  error?: string;
}

export const AppInput: React.FC<AppInputProps> = ({
  label,
  leftIcon,
  containerClassName,
  value,
  secureTextEntry = false,
  isDisabled,
  onBlur,
  onFocus,
  mask,
  error,
  onChangeText,
  ...textInputProps
}: AppInputProps) => {
  const {
    getIconColor,
    handlePasswordToggle,
    showPassword,
    handleFocus,
    handleBlur,
    handleTextChange,
    isFocused,
  } = useAppInputViewModel({
    onBlur,
    onFocus,
    isError: !!error,
    mask,
    onChangeText,
    isDisabled,
    secureTextEntry,
    value,
  });

  const styles = appInputVariants({
    isFocused,
    isError: !!error,
    isDisabled,
  });

  return (
    <View
      className={styles.container({
        className: containerClassName,
      })}
    >
      <Text className={styles.label()}>{label}</Text>
      <Pressable className={styles.wrapper()}>
        {leftIcon && (
          <Ionicons color={getIconColor()} size={22} name={leftIcon} />
        )}
        <TextInput
          onBlur={handleBlur}
          onFocus={handleFocus}
          onChangeText={handleTextChange}
          className={styles.input()}
          value={value}
          secureTextEntry={secureTextEntry && !showPassword}
          editable={!isDisabled}
          {...textInputProps}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={handlePasswordToggle}>
            <Ionicons
              size={22}
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              color={getIconColor()}
            />
          </TouchableOpacity>
        )}
      </Pressable>

      {error && (
        <Text className={styles.error()}>
          <Ionicons className="ml-2" name="alert-circle-outline" size={16} />
          {error}
        </Text>
      )}
    </View>
  );
};
