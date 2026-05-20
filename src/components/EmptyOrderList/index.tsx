import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import colors from "tailwindcss/colors";
import { AppButton } from "../AppButton";
import { router } from "expo-router";
import { AppButtonVariantEnum } from "../AppButton/button.variant";

export const EmptyOrderList = () => {
  return (
    <View className="flex-1 items-center p-20 pt-16">
      <Ionicons name="cart-outline" size={80} color={colors.gray[200]} />
      <Text className="text-xl font-bold text-gray-700 my-4 text-center">
        Você ainda não possui pedidos
      </Text>
      <Text className="text-gray-500 text-base my-4 mb-8 text-center">
        Adicione produtos ao seu carrinho para começar a fazer pedidos.
      </Text>

      <AppButton
        label="Adicionar Produtos"
        leftIcon="storefront-outline"
        onPress={() => router.push("/home")}
        variant={AppButtonVariantEnum.OUTLINED}
      />
    </View>
  );
};
