import { FlatList, Text, View } from "react-native";
import { useCartViewModel } from "./useCart.viewModel";
import { SafeAreaView } from "react-native-safe-area-context";
import { CartEmptyList } from "../../components/CartEmptyList";
import { CartHeader } from "../../components/CartHeader";
import { CartFooter } from "../../components/CartFooter";
import { ProductCartCard } from "../../components/ProductCartCard";

export const CartView: React.FC<ReturnType<typeof useCartViewModel>> = ({
  products,
  creditCards,
  isLoadingCreditCards,
  onOpenCartBottomSheet,
}) => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCartCard product={item} />}
        keyExtractor={(item) => `product-cart-id-${item.id}`}
        contentContainerClassName="px-6"
        ListEmptyComponent={<CartEmptyList />}
        ListHeaderComponent={<CartHeader />}
        ListFooterComponent={
          products.length > 0 ? (
            <CartFooter
              onOpenCartBottomSheet={onOpenCartBottomSheet}
              creditCards={creditCards}
              isLoadingCreditCards={isLoadingCreditCards}
            />
          ) : null
        }
      />
    </SafeAreaView>
  );
};
