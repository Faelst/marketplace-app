import { ProductInterface } from "../product";

export interface GetProductByIdRequest {
  id: string;
}

export interface GetProductByIdResponse {
  data: ProductInterface;
}
