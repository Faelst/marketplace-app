import { useRouter } from "expo-router";
import { ProductInterface } from "../../shared/interfaces/product";

interface ProductCardViewModelParams {
  product: ProductInterface;
}

export const useProductCardViewModel = ({
  product,
}: ProductCardViewModelParams) => {
  const router = useRouter();

  const formatProductName = (name: string) => {
    if (name.length > 16) {
      return name.substring(0, 16) + "...";
    }
    return name;
  };

  const handleNavigateToProductDetails = () => {
    router.push(`/product/${product.id}`);
  };

  const displayName = formatProductName(product.name);

  const formatRating = product.ratingCount.toFixed(1).replace(".", ",");

  return { product, displayName, formatRating, handleNavigateToProductDetails };
};
