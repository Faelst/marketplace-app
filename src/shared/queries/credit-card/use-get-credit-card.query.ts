import { useQuery } from "@tanstack/react-query";
import { getCreditCard } from "../../services/credit-cart.service";

export const useGetCreditCardQuery = () => {
  const query = useQuery({
    queryKey: ["credit-card"],
    queryFn: getCreditCard,
    staleTime: 1000 * 60 * 5,
  });

  return query;
};
