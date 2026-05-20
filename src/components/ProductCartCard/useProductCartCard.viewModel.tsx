import { useCartStore } from "../../shared/store/cart-store";

export const useProductCartCardViewModel = () => {
  const { updateQuantity, removeProduct } = useCartStore();

  const handleIncreaseQuantity = (productId: number, quantity: number) => {
    updateQuantity(productId, quantity + 1);
  };

  const handleDecreaseQuantity = (productId: number, quantity: number) => {
    if (quantity > 1) {
      updateQuantity(productId, quantity - 1);
    }

    if (quantity <= 1) {
      removeProduct(productId);
    }
  };

  return { handleIncreaseQuantity, handleDecreaseQuantity };
};
