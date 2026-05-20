import { ActivityIndicator, View } from "react-native";

interface ListFooterParams {
  isLoadingMore: boolean;
}

export const ListFooter = ({ isLoadingMore }: ListFooterParams) => {
  if (!isLoadingMore) return null;

  return (
    <View className="py-4">
      <ActivityIndicator size="small" color="#000" />
    </View>
  );
};
