import { Image, Text, TouchableOpacity, View } from "react-native";
import { useProductCardViewModel } from "./useProductCard";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import { AppPriceText } from "../AppPriceText";

export const ProductCardView: React.FC<
  ReturnType<typeof useProductCardViewModel>
> = ({
  product,
  displayName,
  formatRating,
  handleNavigateToProductDetails,
}) => {
  return (
    <TouchableOpacity
      onPress={handleNavigateToProductDetails}
      className="w-[48%] my-1 rounded-xl shadow-sm overflow-hidden h-[157px] p-1 bg-white mb-2"
    >
      <View>
        <Image
          source={{ uri: product.photo }}
          className="w-full h-[96px] rounded-[6px]"
          resizeMode="cover"
        />
        <View className="absolute top-0 right-0 flex-row items-center px-2 py-1 rounded-b-lg rounded-r-none bg-white">
          <Ionicons name="star" size={12} color={colors["blue-base"]} />
          <Text className="text-sm font-bold ml-1">{formatRating}</Text>
        </View>
        <View className="p-3">
          <Text className="text-xs font-semibold mb-1" numberOfLines={1}>
            {displayName}
          </Text>
          <View className="flex-row items-center justify-between">
            <Text className="text-sm text-grays-300 mt-1">
              <AppPriceText value={Number(product.value)} />
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
