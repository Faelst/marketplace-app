export interface CreateProductCommentRequest {
  productId: number;
  content: string;
  rating: number;
}

export interface CreateProductCommentResponse {
  message: string;
  ratingApplied: number;
}
