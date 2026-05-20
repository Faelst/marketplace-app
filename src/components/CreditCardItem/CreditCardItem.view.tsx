import { Text, TouchableOpacity, View } from "react-native";
import { CreditCard } from "../../shared/interfaces/credit-card";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import { useCreditCardItemViewModel } from "./useCreditCardItem.modelView";

interface CreditCardItemProps extends ReturnType<
  typeof useCreditCardItemViewModel
> {
  creditCard: CreditCard;
  isSelected?: boolean;
  onSelectCreditCard: () => void;
}

export const CreditCardItemView: React.FC<CreditCardItemProps> = ({
  creditCard,
  formatCardNumber,
  formatExpirationDate,
  isSelected,
  onSelectCreditCard,
}) => {
  return (
    <TouchableOpacity
      onPress={onSelectCreditCard}
      className={`p-4 rounded-lg border bg-white ${isSelected ? "border-purple-base" : "border-gray-200"}`}
    >
      <View className="flex-row">
        <View className="mr-4">
          <Ionicons
            name="card-outline"
            size={24}
            color={colors["purple-base"]}
          />
        </View>

        <View>
          <Text className="text-base font-semibold">
            Final number {formatCardNumber}
          </Text>
          <Text className="text-sm text-gray-500 mt-1">
            {formatExpirationDate()}
          </Text>
        </View>

        <TouchableOpacity className="ml-auto">
          <Ionicons
            name="pencil-outline"
            color={colors["purple-base"]}
            size={18}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
