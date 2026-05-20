import { createElement } from "react";
import { useBottomSheetStore } from "../../shared/store/bottomsheet-store";
import { useCartStore } from "../../shared/store/cart-store";
import { AddCardBottomSheet } from "../../components/AddCardBottomSheet";
import { useGetCreditCardQuery } from "../../shared/queries/credit-card/use-get-credit-card.query";

export const useCartViewModel = () => {
  const { products } = useCartStore();

  const { open: openBottomSheet } = useBottomSheetStore();

  const { data: creditCards = [], isLoading: isLoadingCreditCards } =
    useGetCreditCardQuery();

  const onOpenCartBottomSheet = () => {
    openBottomSheet({
      content: createElement(AddCardBottomSheet),
    });
  };

  return { products, creditCards, isLoadingCreditCards, onOpenCartBottomSheet };
};
