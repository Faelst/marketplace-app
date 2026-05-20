import { FC } from "react";
import { AppPriceTextView } from "./AppPriceTextView";
import { useAppPriceTextViewModel } from "./useAppPriceTextView";

interface AppPriceTextParams {
  classNameCurrency?: string;
  classNameValue?: string;
  value: number;
}

export const AppPriceText: FC<AppPriceTextParams> = ({
  classNameCurrency,
  classNameValue,
  value,
}) => {
  const viewModel = useAppPriceTextViewModel(value);

  return (
    <AppPriceTextView
      {...viewModel}
      classNameCurrency={classNameCurrency}
      classNameValue={classNameValue}
    />
  );
};
