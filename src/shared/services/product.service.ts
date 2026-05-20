import { marketplaceApi } from "../api/marketplace.api";
import {
  CreateProductCommentRequest,
  CreateProductCommentResponse,
} from "../interfaces/http/create-product-comment";
import {
  GetProductCommentsParams,
  GetProductCommentsResponse,
} from "../interfaces/http/get-product-comments";
import { GetProductsRequest } from "../interfaces/http/product";
import { ProductByIdResponse } from "../interfaces/http/product-by-id-response";
import { ProductResponse } from "../interfaces/http/products-response";
import {
  UpdateProductCommentRequest,
  UpdateProductCommentResponse,
} from "../interfaces/http/update-product-comment";
import { ProductCategory } from "../interfaces/product";

export const getProducts = async (params: GetProductsRequest) => {
  const { data } = await marketplaceApi.post<ProductResponse>(
    "/products",
    params,
  );

  return data;
};

export const getProductCategories = async () => {
  const { data } =
    await marketplaceApi.get<ProductCategory[]>(`/products/categories`);

  return data;
};

export const getProductById = async (id: number) => {
  const { data } = await marketplaceApi.get<ProductByIdResponse>(
    `/products/${id}`,
  );
  return data;
};

export const getProductComments = async (params: GetProductCommentsParams) => {
  const { data } = await marketplaceApi.post<GetProductCommentsResponse>(
    `/products/comments`,
    params,
  );
  return data;
};

export const createProductComment = async ({
  content,
  productId,
  rating,
}: CreateProductCommentRequest) => {
  const { data } = await marketplaceApi.post<CreateProductCommentResponse>(
    `/products/create/comments`,
    { content, productId, rating },
  );
  return data;
};

export const getUserComment = async (productId: number) => {
  const { data } = await marketplaceApi.get<{
    comment: {
      id: number;
      content: string;
      rating: number;
      user: {
        id: number;
        name: string;
      };
      createdAt: string;
      updatedAt: string;
    };
  }>(`/products/${productId}/user-comment`);
  return data;
};

export const updateUserComment = async ({
  commentId,
  content,
  rating,
}: UpdateProductCommentRequest) => {
  const { data } = await marketplaceApi.put<UpdateProductCommentResponse>(
    `/products/comments/${commentId}`,
    { content, rating },
  );
  return data;
};
