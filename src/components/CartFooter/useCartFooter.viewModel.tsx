import { useState } from "react";
import { CreditCard } from "../../shared/interfaces/credit-card";
import { useCartStore } from "../../shared/store/cart-store";
import { useSubmitOrderMutation } from "../../shared/queries/orders/use-submit-order.mutation";
import { router } from "expo-router";
import { useAppModal } from "../../shared/hooks/useAppModal";
import { Alert } from "react-native";

export const useCartFooterViewModel = () => {
  const { totalPrice, products, clearCart } = useCartStore();

  const [selectedCreditCard, setSelectedCreditCard] =
    useState<CreditCard | null>(null);

  const createOrderMutation = useSubmitOrderMutation();

  const { showSuccess } = useAppModal();

  const submitOrder = async () => {
    await createOrderMutation.mutateAsync({
      creditCardId: selectedCreditCard?.id!,
      items: products.map(
        (product) =>
          ({
            productId: product.id,
            quantity: product.quantity,
          }) as any,
      ),
    });

    clearCart();

    showSuccess({
      title: "Order Submitted",
      message: "Your order has been successfully submitted.",
      buttonLabel: "View Orders",
      onButtonPress: () => {
        router.push("/orders");
      },
    });
  };

  return {
    totalPrice,
    selectedCreditCard,
    setSelectedCreditCard,
    submitOrder,
    isOrderSubmitting: createOrderMutation.isPending,
  };
};
