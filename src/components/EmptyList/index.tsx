import { ActivityIndicator, Text, View } from "react-native";

import { colors } from "../../styles/colors";

interface EmptyListProps {
  isLoading: boolean;
}

export const EmptyList: React.FC<EmptyListProps> = ({ isLoading }) => {
  if (isLoading) {
    return (
      <View className="items-center py-8">
        <ActivityIndicator size="small" color={colors["purple-base"]} />
        <Text className="mt-2 text-gray-500">Carregando...</Text>
      </View>
    );
  }

  return (
    <View className="items-center py-8">
      <Text className="text-gray-500">Nenhum comentário encontrado.</Text>
      <Text className="text-gray-400 text-sm mt-1">
        Seja o primeiro a adicionar um comentário.
      </Text>
    </View>
  );
};
