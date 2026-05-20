import { marketplaceApi } from "../api/marketplace.api";
import { GetOrdersResponse } from "../interfaces/http/get-orders";
import {
  SubmitOrderRequest,
  SubmitOrderResponse,
} from "../interfaces/http/submit-order";

export const submitOrder = async (order: SubmitOrderRequest) => {
  const { data } = await marketplaceApi.post<SubmitOrderResponse>(
    "/orders",
    order,
  );
  return data;
};

export const getOrders = async () => {
  const { data } = await marketplaceApi.get<GetOrdersResponse>("/orders");

  return data;
};
