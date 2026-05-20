import { CreditCard } from "../../shared/interfaces/credit-card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const useCreditCardItemViewModel = (creditCard: CreditCard) => {
  const formatExpirationDate = () => {
    const formatDate = format(new Date(creditCard.expirationDate), "MM/yyyy", {
      locale: ptBR,
    });
    return formatDate;
  };

  const formatCardNumber = creditCard.number.slice(-4);

  return {
    creditCard,
    formatCardNumber,
    formatExpirationDate,
  };
};
