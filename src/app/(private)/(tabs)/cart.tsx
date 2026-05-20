import { Text, View } from "react-native";
import { CartView } from "../../../viewModels/Cart/Cart.view";
import { useCartViewModel } from "../../../viewModels/Cart/useCart.viewModel";

export default function Cart() {
  const props = useCartViewModel();

  return <CartView {...props} />;
}
