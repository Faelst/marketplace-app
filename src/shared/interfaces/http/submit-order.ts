import { Order } from "../orders";

export interface SubmitOrderRequest {
  creditCardId: number;
  items: Pick<Order, "productId" | "quantity">[];
}

export interface SubmitOrderResponse {
  message: string;
  ordersCount: number;
  orders: Order[];
}
