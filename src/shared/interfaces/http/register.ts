import { UserInterface } from "../user";

export interface RegisterHttpInterface {
  name: string;
  email: string;
  avatarUrl?: string;
  phone: string;
  password: string;
}
