import AsyncStorage from "@react-native-async-storage/async-storage";

import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";
import { CartService } from "../services/cart.service";

export interface CartProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartStore {
  products: CartProduct[];
  totalPrice: number;
  addProduct: (product: Omit<CartProduct, "quantity">) => void;
  removeProduct: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getProductCount: () => number;
}

const defaultCartState: Pick<
  CartStore,
  "products" | "totalPrice" | "getProductCount"
> = {
  products: [],
  totalPrice: 0,
  getProductCount: () => 0,
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      ...defaultCartState,
      addProduct: (product) => {
        set((state) => {
          const updatedProducts = CartService.addProductToCart(
            state.products,
            product,
          );
          return {
            products: updatedProducts,
            totalPrice: CartService.calculateTotalPrice(updatedProducts),
          };
        });
      },
      removeProduct: (productId) =>
        set((state) => {
          const updatedProducts = CartService.removeProductFromCart(
            state.products,
            productId,
          );
          return {
            products: updatedProducts,
            totalPrice: CartService.calculateTotalPrice(updatedProducts),
          };
        }),
      updateQuantity: (productId, quantity) =>
        set((state) => {
          const updatedProducts = CartService.updateProductQuantity(
            state.products,
            productId,
            quantity,
          );
          return {
            products: updatedProducts,
            totalPrice: CartService.calculateTotalPrice(updatedProducts),
          };
        }),
      clearCart: () => set({ ...defaultCartState }),
    }),
    {
      name: "marketplace-cart",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
