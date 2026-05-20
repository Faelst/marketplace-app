import { Text, View } from "react-native";

export const CartHeader: React.FC = () => {
  return (
    <View className="py-3 gap-1 mb-4">
      <Text className="text-[24px] font-bold text-gray-800">Cart</Text>
      <Text className="text-gray-400">
        Review your selected products and proceed to checkout.
      </Text>
    </View>
  );
};
