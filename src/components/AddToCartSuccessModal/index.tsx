import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { colors } from "../../styles/colors";
import { AppButton } from "../AppButton";

interface AddToCartSuccessModalProps {
  productName: string;
  onGoToCart: () => void;
  onClose: () => void;
  onContinueShopping: () => void;
}

export const AddToCartSuccessModal: React.FC<AddToCartSuccessModalProps> = ({
  productName,
  onGoToCart,
  onClose,
  onContinueShopping,
}) => {
  return (
    <View className="bg-white rounded-xl p-6 w-full max-w-sm">
      <View className="items-center mb-4">
        <View className="w-16 h-16 bg-green-100 rounded-full items-center justify-center">
          <Ionicons name="checkmark" size={32} color={colors.success} />
        </View>

        <Text className="text-lg font-semibold mt-4 text-center">
          {productName} added to cart!
        </Text>
      </View>

      <View className="gap-3">
        <AppButton leftIcon="cart" onPress={onGoToCart} label="Ver carrinho" />
        <AppButton
          leftIcon="at-outline"
          onPress={onContinueShopping}
          label="Continuar comprando"
        />
        <AppButton leftIcon="close" onPress={onClose} label="Fechar" />
      </View>
    </View>
  );
};
