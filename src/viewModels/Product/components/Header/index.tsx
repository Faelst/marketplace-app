import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { ProductInterface } from "../../../../shared/interfaces/product";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../styles/colors";
import { BuildImageUrl } from "../../../../shared/helpers/build-image-url";
import { AppPriceText } from "../../../../components/AppPriceText";
import { router } from "expo-router";

interface HeaderProps {
  product: ProductInterface;
  handleOpenReview: () => void;
}

export const Header = ({ product, handleOpenReview }: HeaderProps) => {
  const handleGoBack = () => {
    router.back();
  };

  return (
    <>
      <View className="pb-5 items-center">
        <TouchableOpacity
          className="w-full justify-start flex-row items-center gap-3"
          onPress={handleGoBack}
        >
          <Ionicons name="arrow-back" size={24} color={colors["purple-base"]} />
          <Text className="text-base text-purple-base">Voltar</Text>
        </TouchableOpacity>
      </View>

      <View className="w-full rounded-lg shadow-gray-500/3 bg-white">
        <Image
          source={{
            uri: BuildImageUrl(product.photo),
          }}
          className="w-full h-[164px] rounded-lg"
          resizeMode="cover"
        />

        <View className="absolute top-0 right-0 right-0 flex-row bg-blue-light px-2 py-1 rounded-bl-lg  rounded-tr-lg items-center justify-center">
          <Ionicons name="star" size={16} color={colors["purple-base"]} />
          <Text className="text-sm font-semibold ml-1 text-gray-800">
            {product.averageRating}
          </Text>
          <Text className="text-[10px] font-semibold ml-1  text-gray-800 ml-1">
            /5
          </Text>
        </View>
      </View>

      <View className="bg-background py-8">
        <View className="flex-row justify-between items-baseline mb-4">
          <Text className="text-xl font-semibold text-gray-800 max-w-[60%]">
            {product.name}
          </Text>
          <View>
            <AppPriceText
              value={Number(product.value)}
              classNameValue="text-xl font-bold text-gray-800 ml-1"
            />
          </View>
        </View>

        <View className="flex-row items-center bg-blue-light p-3 rounded-lg mb-4">
          <View className="bg-blue-base w-[36px] h-[36px] rounded-lg items-center justify-center">
            <Ionicons name="trending-up" size={20} color={colors.white} />
          </View>

          <Text className="text-sm text-gray-600 flex-1 ml-5">
            <Text className="font-bold">{product.views} pessoas</Text>
            {" já visualizaram este produto."}
          </Text>
        </View>

        <View className="mb-4">
          <Text className="text-base leading-6 text-gray-500">
            {product.description}
          </Text>
        </View>

        {(product.width || product.height) && (
          <View className="mb-4">
            {product.width && (
              <Text className="text-sm text-gray-500 mb-1">
                Largura: <Text className="font-bold">{product.width}cm</Text>
              </Text>
            )}
            {product.height && (
              <Text className="text-sm text-gray-500 mb-1">
                Altura: <Text className="font-bold">{product.height}cm</Text>
              </Text>
            )}
          </View>
        )}

        <View className="mb-6">
          <Text className="text-base font-bold text-gray-800">Categoria</Text>
          <Text className="text-base font-bold text-gray-600">
            {product.category.name}
          </Text>
        </View>

        <View className="flex-row items-center justify-between pt-4 border-t border-gray-200">
          <Text className="text-base font-bold text-gray-800">Avaliações</Text>

          <TouchableOpacity onPress={handleOpenReview}>
            <Text className="text-base font-medium text-purple-base">
              Avaliar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
