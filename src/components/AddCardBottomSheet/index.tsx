import { AddCardBottomSheetView } from "./AddCardBottomSheet.view";
import { useAddCardBottomSheetViewModel } from "./useAddCardBottomSheet.viewModel";

export const AddCardBottomSheet: React.FC = () => {
  const props = useAddCardBottomSheetViewModel();

  return <AddCardBottomSheetView {...props} />;
};
