import { useForm } from "react-hook-form";
import { LoginFormData, loginSchemaResolver } from "./login.schema";
import { useLoginMutation } from "../../shared/queries/auth/useLogin.mutation";
import { useUserStore } from "../../shared/store/user-store";

export const useLoginViewModel = () => {
  const { user } = useUserStore();

  const { control, handleSubmit } = useForm<LoginFormData>({
    defaultValues: {
      email: "fael_st@hotmail.com",
      password: "Coby2442",
    },
    resolver: loginSchemaResolver,
  });

  const loginMutation = useLoginMutation();

  const onSubmit = handleSubmit(async (data: LoginFormData) => {
    await loginMutation.mutateAsync({
      email: data.email,
      password: data.password,
    });
  });

  return {
    control,
    onSubmit,
  };
};
