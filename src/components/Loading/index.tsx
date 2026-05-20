import { Text, View } from "react-native";

export const Loading = () => {
  return (
    <View className="flex-1 bg-background">
      <View className="items-center justify-center flex-1">
        <Text className="text-gray-500 mt-4 text-purple-base">
          Carregando...
        </Text>
      </View>
    </View>
  );
};
