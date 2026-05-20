import { CartProduct } from "../../shared/store/cart-store";
import { ProductCartCardView } from "./ProductCartCard.view";
import { useProductCartCardViewModel } from "./useProductCartCard.viewModel";

interface ProductCartProps {
  product: CartProduct;
}

export const ProductCartCard: React.FC<ProductCartProps> = ({ product }) => {
  const props = useProductCartCardViewModel();

  return <ProductCartCardView product={product} {...props} />;
};
