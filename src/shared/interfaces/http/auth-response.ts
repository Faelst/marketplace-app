import { UserInterface } from "../user";

export interface AuthResponseHttpInterface {
  user: UserInterface;
  token: string;
  refreshToken: string;
}
