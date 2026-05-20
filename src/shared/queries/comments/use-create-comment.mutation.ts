import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProductComment } from "../../services/product.service";
import { CreateProductCommentRequest } from "../../interfaces/http/create-product-comment";
import { Toast } from "toastify-react-native";

export const useMutationCreateComment = (productId: number) => {
  const query = useQueryClient();

  const mutation = useMutation({
    mutationFn: (comment: CreateProductCommentRequest) =>
      createProductComment(comment),
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: ["product-comments-infinity", productId],
      });
      query.invalidateQueries({
        queryKey: ["userComment", productId],
      });

      Toast.success("Avaliação criada com sucesso!", "top");
    },
    onError: () => {
      Toast.error("Erro ao criar avaliação. Tente novamente.", "top");
    },
  });

  return mutation;
};
