import { CartProduct } from "../store/cart-store";

export const CartService = {
  findExistingProduct: (products: CartProduct[], productId: number) => {
    return products.some((p) => p.id === productId);
  },
  addProductToCart: (
    products: CartProduct[],
    product: Omit<CartProduct, "quantity">,
  ) => {
    const existingProduct = CartService.findExistingProduct(
      products,
      product.id,
    );
    if (existingProduct) {
      return products.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p,
      );
    } else {
      return [...products, { ...product, quantity: 1 }];
    }
  },
  calculateTotalPrice: (products: CartProduct[]) => {
    return products.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    );
  },
  removeProductFromCart: (products: CartProduct[], productId: number) => {
    return products.filter((p) => p.id !== productId);
  },
  updateProductQuantity: (
    products: CartProduct[],
    productId: number,
    quantity: number,
  ) => {
    return products.map((p) => (p.id === productId ? { ...p, quantity } : p));
  },
};
