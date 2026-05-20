import { CreditCard } from "../credit-card";

export interface GetCreditCardResponse extends CreditCard {}

export interface CreateCreditCardRequest {
  number: string;
  CVV: number;
  expirationDate: string;
}

export interface CreateCreditCardResponse {
  data: CreditCard;
  message: string;
  success: boolean;
}
