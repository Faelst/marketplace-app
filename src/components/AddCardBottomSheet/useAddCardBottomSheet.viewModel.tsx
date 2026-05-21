import { useForm } from "react-hook-form";
import { useCreateCreditCardMutation } from "../../shared/queries/credit-card/use-create-credit-card.mutation";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CreditCardFormData,
  CreditCardSchema,
} from "../../shared/schemas/credit-card-schema";
import { useBottomSheetStore } from "../../shared/store/bottomsheet-store";
import { useRef, useState } from "react";
import { formatExpirationDate } from "../../shared/helpers/format-expiration-date";

export type FocusedField =
  | "number"
  | "CVV"
  | "expirationDate"
  | "titularName"
  | null;

export const useAddCardBottomSheetViewModel = () => {
  const createCreditCardMutation = useCreateCreditCardMutation();
  const [focusedField, setFocusedField] = useState<FocusedField>(null);

  const blurTimeoutRef = useRef<any | null>(null);

  const { control, handleSubmit, reset, clearErrors, setError, watch } =
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
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
      blurTimeoutRef.current = null;
    }
    setFocusedField(field);
  };

  const handleFieldBlur = () => {
    blurTimeoutRef.current = setTimeout(() => {
      setFocusedField(null);
    }, 100);
  };

  const isFlipped = focusedField === "CVV";

  const watchedValue = {
    number: watch("number"),
    titularName: watch("titularName"),
    expirationDate: watch("expirationDate"),
    CVV: watch("CVV"),
  };

  return {
    control,
    isFlipped,
    focusedField,
    watchedValue,
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
