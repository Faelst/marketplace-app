import { ProductComment } from "../product-comment";
import { PaginationResponse } from "./paggination-response";

export interface GetProductCommentsParams {
  productId: number;
  pagination: {
    page: number;
    perPage: number;
  };
}

export interface GetProductCommentsResponse extends PaginationResponse<ProductComment> {}
