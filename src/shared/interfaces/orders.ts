export interface Order {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  totalPrice: number;
  createdAt: string;
  productPhoto: string;
  creditCard: {
    id: number;
    maskedNumber: string;
  };
}
