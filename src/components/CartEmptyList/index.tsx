import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "tailwindcss/colors";
import { AppButton } from "../AppButton";
import { AppButtonVariantEnum } from "../AppButton/button.variant";
import { router } from "expo-router";

export const CartEmptyList: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 ">
      <View className="flex-1 justify-center items-center px-20 pt-16">
        <Ionicons
          name="cart-outline"
          size={70}
          color={colors.gray[200]}
          className="mb-4"
        />

        <Text className="text-xl text-gray-70 my-4 text-center font-medium">
          Your cart is empty. Start adding products to your cart.
        </Text>
        <Text className="text-sm text-gray-500 text-center">
          Browse our catalog and find the best products for you.
        </Text>

        <AppButton
          leftIcon="storefront-outline"
          variant={AppButtonVariantEnum.OUTLINED}
          className="w-[180px] self-center mt-6"
          label="Browse Products"
          onPress={() => {
            router.push("/(private)/(tabs)/home");
          }}
        />
      </View>
    </SafeAreaView>
  );
};
