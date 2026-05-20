import { Text, View } from "react-native";
import { useOrdersViewModel } from "./useOrder.viewModel";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native";
import { OrderItem } from "../../components/OrderItem";
import { EmptyOrderList } from "../../components/EmptyOrderList";
import { ErrorListOrder } from "../../components/ErrorListOrder";

export const OrderView: React.FC<ReturnType<typeof useOrdersViewModel>> = ({
  orders,
  totalOrders,
  error,
}) => {
  if (error) {
    return <ErrorListOrder />;
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        contentContainerClassName="px-6 py-4"
        ListHeaderComponent={
          <View className="gap-2 mb-6">
            <Text className="text-[24px] font-bold text-gray-900">
              Meus Pedidos
            </Text>
            <Text className="text-gray-400 text-sm">
              Confira sua lista de produtos comprados
            </Text>
          </View>
        }
        renderItem={({ item }) => <OrderItem order={item} />}
        ListEmptyComponent={<EmptyOrderList />}
      />
    </SafeAreaView>
  );
};
