import { use, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterFormData, registerSchema } from "./register.schema";
import { useRegisterMutation } from "../../shared/queries/auth/useRegister.mutation";
import { useUserStore } from "../../shared/store/user-store";
import { useImage } from "../../shared/hooks/useImage";
import { useUploadAvatarMutation } from "../../shared/queries/auth/use-upload-avatar.mutation";

export const useRegisterViewModel = () => {
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  const { updateUser } = useUserStore();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    },
  });

  const { handleSelectImage } = useImage({
    aspect: [1, 1],
    quality: 0.8,
    allowsEditing: true,
    callback: (uri: string) => {
      setAvatarUri(uri);
    },
    // cameraType: "front",
  });

  const uploadAvatarMutation = useUploadAvatarMutation();

  const onSuccessRegister = async () => {
    if (avatarUri) {
      const { url } = await uploadAvatarMutation.mutateAsync(avatarUri);
      updateUser({
        avatarUrl: url,
      });
    }
  };

  const userRegisterMutation = useRegisterMutation({
    onSuccess: onSuccessRegister,
  });

  const onSubmit = handleSubmit(async (userData: RegisterFormData) => {
    const { confirmPassword, ...rest } = userData;

    await userRegisterMutation.mutateAsync({
      ...rest,
    });
  });

  return {
    control,
    handleSubmit: onSubmit,
    errors,
    handleSelectAvatar: handleSelectImage,
    avatarUri,
  };
};
