import { useEffect, useState } from "react";
import { useGetUserCommentQuery } from "../../shared/queries/comments/use-get-user-comment.query";
import { useMutationCreateComment } from "../../shared/queries/comments/use-create-comment.mutation";
import { useUpdateCommentMutation } from "../../shared/queries/comments/use-update-comment.mutation";
import { Toast } from "toastify-react-native";
import { useBottomSheet } from "@gorhom/bottom-sheet";

interface UseReviewBottomSheetViewModelParams {
  productId: number;
}

interface RatingFormInterface {
  content: string;
  rating: number;
  isEditing: boolean;
  commentId?: number;
}

const initialRatingFormState: RatingFormInterface = {
  content: "",
  rating: 0,
  isEditing: false,
  commentId: undefined,
};

export const useReviewBottomSheetViewModel = ({
  productId,
}: UseReviewBottomSheetViewModelParams) => {
  const [ratingForm, setRatingForm] = useState<RatingFormInterface>(
    initialRatingFormState,
  );
  const { data: userComment, isLoading: isLoadingUserComment } =
    useGetUserCommentQuery(productId);

  const { close: closeBottomSheet } = useBottomSheet();

  const createCommentMutation = useMutationCreateComment(productId);
  const updateCommentMutation = useUpdateCommentMutation(productId);

  const handleSubmit = () => {
    if (ratingForm.rating === 0) {
      Toast.warn("Por favor, selecione uma nota para o produto.", "top");
      return;
    }

    if (ratingForm.content.trim() === "") {
      Toast.warn("Por favor, escreva um comentário sobre o produto.", "top");
      return;
    }

    if (ratingForm.isEditing && userComment && userComment.comment) {
      updateCommentMutation.mutate({
        commentId: userComment.comment.id,
        content: ratingForm.content,
        rating: ratingForm.rating,
      });

      closeBottomSheet();
    } else {
      createCommentMutation.mutate({
        productId,
        content: ratingForm.content,
        rating: ratingForm.rating,
      });

      closeBottomSheet();
    }
  };

  const handleRatingChange = (newRating: number) => {
    setRatingForm((prev) => ({
      ...prev,
      rating: newRating,
    }));
  };

  const handleContentChange = (newContent: string) => {
    setRatingForm((prev) => ({
      ...prev,
      content: newContent,
    }));
  };

  useEffect(() => {
    if (
      userComment &&
      userComment.comment &&
      userComment.comment.content &&
      userComment.comment.rating
    ) {
      setRatingForm({
        content: userComment.comment.content,
        rating: userComment.comment.rating,
        isEditing: true,
        commentId: userComment.comment.id,
      });
    } else {
      setRatingForm(initialRatingFormState);
    }

    closeBottomSheet();
  }, [userComment]);

  const isLoading =
    isLoadingUserComment ||
    createCommentMutation.isPending ||
    updateCommentMutation.isPending;

  return {
    ratingForm,
    isLoading,
    closeBottomSheet,
    handleRatingChange,
    handleContentChange,
    handleSubmit,
  };
};
