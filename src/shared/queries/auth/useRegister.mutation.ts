import { useMutation } from "@tanstack/react-query";
import * as AuthServices from "../../services/auth.service";
import { RegisterHttpInterface } from "../../interfaces/http/register";
import { AuthResponseHttpInterface } from "../../interfaces/http/auth-response";
import { useUserStore } from "../../store/user-store";

interface UserRegisterMutationParams {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export const useRegisterMutation = ({
  onSuccess,
  onError,
}: UserRegisterMutationParams) => {
  const { setSession } = useUserStore();

  const mutation = useMutation({
    mutationFn: (userData: RegisterHttpInterface) => {
      return AuthServices.register(userData);
    },
    onSuccess: (data) => {
      setSession({ ...data });
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    },
  });

  return mutation;
};
