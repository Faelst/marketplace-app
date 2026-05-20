import { useGetOrdersQuery } from "../../shared/queries/orders/use-get-orders.query";

export const useOrdersViewModel = () => {
  const { data: ordersResponse, error } = useGetOrdersQuery();

  return {
    orders: ordersResponse?.orders || [],
    totalOrders: ordersResponse?.totalOrders || 0,
    error,
  };
};
