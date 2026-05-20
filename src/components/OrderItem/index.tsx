import { Image, Text, View } from "react-native";
import { Order } from "../../shared/interfaces/orders";
import { BuildImageUrl } from "../../shared/helpers/build-image-url";
import { format } from "date-fns";
import { AppPriceText } from "../AppPriceText";

interface OrderItemProps {
  order: Order;
}

export const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  return (
    <View className="bg-white mb-3 rounded-lg p-3 pl-0 flex-row items-center h-[89px]">
      <View className="p-1">
        <Image
          source={{ uri: BuildImageUrl(order.productPhoto) }}
          className="w-[88px] h-[80px] rounded-lg mr-4"
          resizeMode="cover"
        />
      </View>

      <View className="flex-1 py-4 justify-between">
        <View className="flex-row justify-between items-start mb-2">
          <Text
            className="text-base font-semibold text-gray-900 flex-1 mr-2"
            numberOfLines={1}
          >
            {order.productName}
          </Text>
          <Text className="text-sm text-gray-600">
            {format(new Date(order.createdAt), "dd/MM/yyyy")}
          </Text>
        </View>

        <View>
          <View className="flex-row items-center gap-2">
            <Text className="text-sm text-gray-600">
              {order.quantity} {order.quantity > 1 ? "Unidades" : "Unidade"}
            </Text>
            <View className="w-2 h-2 bg-gray-300 rounded-full self-center" />
            <AppPriceText
              value={order.totalPrice}
              classNameCurrency="text-sm text-gray-600"
              classNameValue="text-sm text-gray-600"
            />
          </View>
          <Text className="text-sm text-gray-600 mt-1">
            Cartao final {order.creditCard.maskedNumber.slice(-4)}
          </Text>
        </View>
      </View>
    </View>
  );
};
