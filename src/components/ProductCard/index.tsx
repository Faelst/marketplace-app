import { useProductCardViewModel } from "./useProductCard";
import { ProductCardView } from "./ProductCard.view";
import { ProductInterface } from "../../shared/interfaces/product";

interface ProductCardProps {
  product: ProductInterface;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const props = useProductCardViewModel({ product });

  return <ProductCardView {...props} />;
};
