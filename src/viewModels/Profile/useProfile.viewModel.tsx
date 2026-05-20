import { useForm } from "react-hook-form";
import { ProfileFormData, profileSchemaResolver } from "./profile.schema";
import { useImage } from "../../shared/hooks/useImage";
import { useState } from "react";
import { useUserStore } from "../../shared/store/user-store";
import { BuildImageUrl } from "../../shared/helpers/build-image-url";
import { useUploadAvatarMutation } from "../../shared/queries/auth/use-upload-avatar.mutation";
import { Toast } from "toastify-react-native";
import { CameraType } from "expo-image-picker";
import { router } from "expo-router";
import { useUpdateProfileMutation } from "../../shared/queries/profile/use-update-profile.mutation";

export const useProfileViewModel = () => {
  const { user, logout, updateUser } = useUserStore();

  const [avatarUri, setAvatarUri] = useState<string | null>(
    BuildImageUrl(user?.avatarUrl || "") || null,
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: profileSchemaResolver as any,
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      password: undefined,
      confirmPassword: undefined,
    },
  });

  const uploadAvatarMutation = useUploadAvatarMutation();
  const updateProfileMutation = useUpdateProfileMutation();

  const uploadAvatarCallback = async (uri: string) => {
    if (!uri) return;

    await uploadAvatarMutation.mutateAsync(uri);

    Toast.show({
      type: "success",
      text1: "Avatar updated successfully",
    });
  };

  const { handleSelectImage } = useImage({
    aspect: [1, 1],
    quality: 0.8,
    allowsEditing: true,
    callback: uploadAvatarCallback,
    cameraType: CameraType.front,
  });

  const validatePasswords = (userData: ProfileFormData) => {
    if (!userData.password) return true;

    if (
      userData?.password === userData?.confirmPassword &&
      userData?.password?.length > 0
    ) {
      return false;
    }

    return true;
  };

  const handleUpdateProfile = handleSubmit(async (data) => {
    if (!validatePasswords(data)) return;

    await updateProfileMutation.mutateAsync(data as any);
  });

  const handleLogout = () => {
    logout();
  };

  const handleGoBack = () => {
    router.back();
  };

  return {
    control,
    avatarUri,
    handleSubmit: handleUpdateProfile,
    handleSelectAvatar: handleSelectImage,
    handleLogout,
    handleGoBack,
  };
};
