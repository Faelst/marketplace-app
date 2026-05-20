import { Order } from "../orders";

export interface GetOrdersResponse {
  orders: Order[];
  totalOrders: number;
}
