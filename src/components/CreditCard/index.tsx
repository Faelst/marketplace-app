import { CreditCardView } from "./CreditCard.view";
import { useCreditCardViewModel } from "./useCreditCard.viewModel";

export const CreditCard = () => {
  const props = useCreditCardViewModel();

  return <CreditCardView {...props} />;
};
