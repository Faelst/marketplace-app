import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { colors } from "../../../styles/colors";
import { AppButton } from "../../AppButton";

export interface SuccessModalProps {
  title: string;
  message: string;
  buttonLabel?: string;
  onButtonPress?: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  title,
  message,
  buttonLabel = "OK",
  onButtonPress,
}) => {
  return (
    <View className="bg-white rounded-2xl p-6 w-[85%] max-w-sm mx-auto">
      <View className="items-center">
        <View className="mb-4 w-16 h-16 bg-green-100 rounded-full items-center justify-center">
          <Ionicons name="checkmark-circle" color={colors.success} size={32} />
        </View>

        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-900 text-center mb-2">
            {title}
          </Text>
          {message && (
            <Text className="text-gray-600 text-base text-center ">
              {message}
            </Text>
          )}
        </View>

        <AppButton label={buttonLabel} onPress={onButtonPress} />
      </View>
    </View>
  );
};
