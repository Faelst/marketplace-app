import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "../../services/auth.service";
import { UpdateUserRequest } from "../../interfaces/http/update-profile";
import { Toast } from "toastify-react-native";
import { useUserStore } from "../../store/user-store";
import { useAppModal } from "../../hooks/useAppModal";

export const useUpdateProfileMutation = () => {
  const { updateUser } = useUserStore();
  const { showSuccess } = useAppModal();
  const mutation = useMutation({
    mutationFn: (body: UpdateUserRequest) => updateProfile(body),
    onSuccess: (response) => {
      updateUser({
        ...response.user,
      });

      showSuccess({
        title: "Sucesso!",
        message: "Dados cadastrais atualizados com sucesso!",
      });
    },
    onError: () => {
      Toast.error("Erro ao atualizar perfil. Tente novamente.", "top");
    },
  });

  return mutation;
};
