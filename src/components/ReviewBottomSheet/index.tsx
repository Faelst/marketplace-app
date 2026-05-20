import { ReviewBottomSheetView } from "./ReviewBottomSheet.view";
import { useReviewBottomSheetViewModel } from "./useReviewBottomSheet.viewModel";

interface ReviewBottomSheetViewProps {
  productId: number;
}

export const ReviewBottomSheet = ({
  productId,
}: ReviewBottomSheetViewProps) => {
  const viewModel = useReviewBottomSheetViewModel({ productId });

  return <ReviewBottomSheetView {...viewModel} />;
};
