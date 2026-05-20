import { UserInterface } from "../user";

export interface UpdateUserRequest extends UserInterface {
  newPassword?: string;
}

export interface UpdateProfileResponse {
  user: UserInterface;
}
