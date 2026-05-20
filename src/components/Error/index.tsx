import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { colors } from "../../styles/colors";
import { AppButton } from "../AppButton";
import { router } from "expo-router";

export const Error = () => {
  return (
    <View className="flex-1 bg-background items-center justify-center px-6">
      <Ionicons name="alert-circle" color={colors.danger} size={40} />
      <Text className="mt-4 text-danger text-xl text-center">
        Ocorreu um erro ao carregar os detalhes do produto.
      </Text>

      <AppButton className="mt-10" onPress={router.back} label="Voltar" />
    </View>
  );
};
