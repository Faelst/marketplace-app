import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCreditCardRequest } from "../../interfaces/http/credit-card";
import { createCreditCard } from "../../services/credit-cart.service";
import { Toast } from "toastify-react-native";

export const useCreateCreditCardMutation = () => {
  const query = useQueryClient();

  const mutation = useMutation({
    mutationFn: (creditCardData: CreateCreditCardRequest) =>
      createCreditCard(creditCardData),
    onSuccess: (data) => {
      Toast.success("Cartão de crédito adicionado com sucesso!");
      query.invalidateQueries({
        queryKey: ["credit-card"],
      });
    },
  });

  return mutation;
};
