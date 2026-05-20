import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { AppInput, AppInputProps } from "../AppInput";

interface AppInputControllerProps<T extends FieldValues> extends Omit<
  AppInputProps,
  "onChangeText" | "value" | "error"
> {
  control: Control<T>;
  name: Path<T>;
  error?: FieldErrors<T>;
}

export const AppInputController = <T extends FieldValues>({
  name,
  control,
  error,
  ...appInputProps
}: AppInputControllerProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
        formState: { isSubmitting },
      }) => (
        <AppInput
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          error={error?.message}
          isDisabled={appInputProps.isDisabled || isSubmitting}
          {...appInputProps}
        />
      )}
    />
  );
};
