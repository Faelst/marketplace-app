import { useQuery } from "@tanstack/react-query";
import { getProductCategories } from "../../services/product.service";

export const useGetProductCategoriesQuery = () => {
  const query = useQuery({
    queryKey: ["product-categories"],
    queryFn: async () => {
      try {
        const response = await getProductCategories();
        return response;
      } catch (error) {
        throw error;
      }
    },
    staleTime: 2 * 24 * 60 * 60 * 1000,
  });

  return query;
};
