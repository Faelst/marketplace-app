import { ProductInterface } from "../product";
import { PaginationResponse } from "./paggination-response";

export interface ProductResponse extends PaginationResponse<ProductInterface> {}
