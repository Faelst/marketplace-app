import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { colors } from "../../styles/colors";
import { AppButton } from "../AppButton";
import { router } from "expo-router";

export const ErrorListOrder = () => {
  return (
    <View className="flex-1 justify-center items-center px-6">
      <View className="items-center flex-row justify-center">
        <Text className="text-danger text-center text-xl">
          Falha ao carregar pedido.
        </Text>
        <Ionicons name="alert" size={23} color={colors["danger"]} />
      </View>

      <AppButton
        className="mt-6"
        label="Voltar para produtos"
        onPress={() => router.push("/home")}
      />
    </View>
  );
};
