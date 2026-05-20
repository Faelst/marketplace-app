import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateProductCommentRequest } from "../../interfaces/http/update-product-comment";
import { updateUserComment } from "../../services/product.service";
import { Toast } from "toastify-react-native";

export const useUpdateCommentMutation = (productId: number) => {
  const query = useQueryClient();

  const mutation = useMutation({
    mutationFn: (comment: UpdateProductCommentRequest) =>
      updateUserComment(comment),
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: ["productComments", productId],
      });
      query.invalidateQueries({
        queryKey: ["userComment", productId],
      });

      Toast.success("Avaliação atualizada com sucesso!", "top");
    },
    onError: () => {
      Toast.error("Erro ao atualizar avaliação. Tente novamente.", "top");
    },
  });

  return mutation;
};
