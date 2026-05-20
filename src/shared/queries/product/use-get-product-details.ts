import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../services/product.service";

export const useGetProductDetails = (productId: number) => {
  const query = useQuery({
    queryKey: ["product-details", productId],
    queryFn: async () => {
      try {
        const response = await getProductById(productId);
        return response;
      } catch (error) {
        throw error;
      }
    },
  });

  return query;
};
