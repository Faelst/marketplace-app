import { CreditCard } from "../../shared/interfaces/credit-card";
import { useCartFooterViewModel } from "./useCartFooter.viewModel";
import { CartFooterView } from "./CartFooter.view";

export interface CartFooterProps {
  onOpenCartBottomSheet: () => void;
  creditCards: CreditCard[];
  isLoadingCreditCards: boolean;
}

export const CartFooter: React.FC<CartFooterProps> = (
  props: CartFooterProps,
) => {
  const viewModelProps = useCartFooterViewModel();

  return <CartFooterView {...viewModelProps} {...props} />;
};
