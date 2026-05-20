import { baseURL, marketplaceApi } from "../api/marketplace.api";
import { AuthResponseHttpInterface } from "../interfaces/http/auth-response";
import { LoginHttpInterface } from "../interfaces/http/login";
import { RegisterHttpInterface } from "../interfaces/http/register";
import {
  UpdateProfileResponse,
  UpdateUserRequest,
} from "../interfaces/http/update-profile";
import { UploadAvatarResponse } from "../interfaces/http/upload-avatar";

export const register = async (body: RegisterHttpInterface) => {
  const { data } = await marketplaceApi.post<AuthResponseHttpInterface>(
    "/auth/register",
    body,
  );

  return data;
};

export const login = async (body: LoginHttpInterface) => {
  const { data } = await marketplaceApi.post<AuthResponseHttpInterface>(
    "/auth/login",
    body,
  );

  return data;
};

export const uploadAvatar = async (avatarUri: string) => {
  const formData = new FormData();

  formData.append("avatar", {
    uri: avatarUri,
    name: "avatar.jpeg",
    type: "image/jpeg",
  } as unknown as Blob);

  const { data } = await marketplaceApi.post<UploadAvatarResponse>(
    "/user/avatar",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  data.fileName = `${baseURL}${data.url}`;

  return data;
};

export const updateProfile = async (body: UpdateUserRequest) => {
  const { data } = await marketplaceApi.put<UpdateProfileResponse>(
    "/user",
    body,
  );

  return data;
};
