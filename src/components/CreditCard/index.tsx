import { UseFormWatch } from "react-hook-form";
import { FocusedField } from "../AddCardBottomSheet/useAddCardBottomSheet.viewModel";
import { CreditCardView } from "./CreditCard.view";
import { useCreditCardViewModel } from "./useCreditCard.viewModel";

export interface CreditCardProps {
  isFlipped: boolean;
  focusedField: FocusedField;
  watchedValue?: any;
}

export const CreditCard = ({
  isFlipped,
  focusedField,
  watchedValue,
}: CreditCardProps) => {
  const props = useCreditCardViewModel({
    isFlipped,
    focusedField,
    watchedValue,
  });

  return <CreditCardView {...props} />;
};
