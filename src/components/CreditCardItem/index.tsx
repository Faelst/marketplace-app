import { CreditCard } from "../../shared/interfaces/credit-card";
import { useCreditCardItemViewModel } from "./useCreditCardItem.modelView";
import { CreditCardItemView } from "./CreditCardItem.view";

interface CreditCardItemProps {
  creditCard: CreditCard;
  isSelected?: boolean;
  onSelectCreditCard: () => void;
}

export const CreditCardItem: React.FC<CreditCardItemProps> = ({
  creditCard,
  isSelected,
  onSelectCreditCard,
}) => {
  const props = useCreditCardItemViewModel(creditCard);
  return (
    <CreditCardItemView
      {...props}
      isSelected={isSelected}
      onSelectCreditCard={onSelectCreditCard}
    />
  );
};
