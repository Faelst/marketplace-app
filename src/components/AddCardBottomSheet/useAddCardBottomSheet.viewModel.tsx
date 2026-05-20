import { useForm } from "react-hook-form";
import { useCreateCreditCardMutation } from "../../shared/queries/credit-card/use-create-credit-card.mutation";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CreditCardFormData,
  CreditCardSchema,
} from "../../shared/schemas/credit-card-schema";
import { useBottomSheetStore } from "../../shared/store/bottomsheet-store";
import { useState } from "react";

type FocusedField = "number" | "CVV" | "expirationDate" | null;

const formatExpirationDate = (
  dateString: string,
  setError: (message: string) => void,
): string => {
  const [month, year] = dateString.split("/").map(Number);

  if (isNaN(month) || isNaN(year)) {
    setError("Invalid expiration date format");
    throw new Error("Invalid expiration date format");
  }

  if (month < 1 || month > 12) {
    setError("Invalid month in expiration date");
    throw new Error("Invalid month in expiration date");
  }

  if (year < 0 || year > 99) {
    setError("Invalid year in expiration date");
    throw new Error("Invalid year in expiration date");
  }

  const fullYear = year < 100 ? 2000 + year : year;
  const expirationDate = new Date(fullYear, month - 1, 1);
  return expirationDate.toISOString().split("T")[0];
};

export const useAddCardBottomSheetViewModel = () => {
  const createCreditCardMutation = useCreateCreditCardMutation();
  const [focusedField, setFocusedField] = useState<FocusedField>(null);

  const { control, handleSubmit, reset, clearErrors, setError } =
    useForm<CreditCardFormData>({
      resolver: yupResolver(CreditCardSchema),
      defaultValues: {
        number: "",
        CVV: undefined,
        expirationDate: "",
      },
    });

  const { close: closeBottomSheet } = useBottomSheetStore();

  const handleCreateCreditCard = handleSubmit(
    async ({ number, CVV, expirationDate }) => {
      await createCreditCardMutation.mutateAsync({
        number: number.replace(/\s/g, ""),
        CVV,
        expirationDate: formatExpirationDate(expirationDate, (message) => {
          setError("expirationDate", { type: "manual", message });
        }),
      });

      closeBottomSheet();
    },
  );

  const expirationDateMask = (value: string) => {
    const cleanedValue = value.replace(/\D/g, "");

    if (cleanedValue.length < 2) {
      return cleanedValue;
    }

    const month = cleanedValue.slice(0, 2);
    const year = cleanedValue.slice(2, 4);

    if (year.length > 0) {
      return `${month}/${year}`;
    }

    return month;
  };

  const cardNumberMask = (value: string) => {
    const cleanedValue = value.replace(/\D/g, "");

    return cleanedValue.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
  };

  const handleFieldFocus = (field: FocusedField) => {
    setFocusedField(field);
  };

  const handleFieldBlur = () => {
    setFocusedField(null);
  };

  const isFlipped = focusedField === "CVV";

  return {
    control,
    isFlipped,
    handleSubmit,
    reset,
    clearErrors,
    handleCreateCreditCard,
    expirationDateMask,
    cardNumberMask,
    handleFieldFocus,
    handleFieldBlur,
  };
};
