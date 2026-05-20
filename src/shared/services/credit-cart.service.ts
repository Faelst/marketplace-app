import { marketplaceApi } from "../api/marketplace.api";
import { CreditCard } from "../interfaces/credit-card";
import {
  CreateCreditCardRequest,
  CreateCreditCardResponse,
  GetCreditCardResponse,
} from "../interfaces/http/credit-card";

export const getCreditCard = async () => {
  const { data } =
    await marketplaceApi.get<GetCreditCardResponse[]>("/credit-cards");

  return data;
};

export const createCreditCard = async (body: CreateCreditCardRequest) => {
  const { data } = await marketplaceApi.post<CreateCreditCardResponse>(
    "/credit-cards",
    body,
  );

  return data;
};
