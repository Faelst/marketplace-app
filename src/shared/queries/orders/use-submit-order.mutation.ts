import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitOrder } from "../../services/orders.service";
import { Toast } from "toastify-react-native";

export const useSubmitOrderMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: submitOrder,
    onSuccess: (data) => {
      console.log("Order submitted successfully:", data);
      queryClient.invalidateQueries({
        queryKey: ["user-orders"],
      });
    },
    onError: (error) => {
      console.error("Error submitting order:", error);
      Toast.error(
        "Erro ao enviar o pedido. Por favor, tente novamente.",
        "top",
      );
    },
  });

  return mutation;
};
