import { useMutation } from "@tanstack/react-query";
import * as AuthServices from "../../services/auth.service";
import { LoginHttpInterface } from "../../interfaces/http/login";
import { useUserStore } from "../../store/user-store";

export const useLoginMutation = () => {
  const { setSession } = useUserStore();

  const mutation = useMutation({
    mutationFn: (body: LoginHttpInterface) => AuthServices.login(body),
    onSuccess: (response) => {
      console.log("Login successful:", response);
      setSession({
        user: response.user,
        token: response.token,
        refreshToken: response.refreshToken,
      });
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });

  return mutation;
};
