export interface UpdateProductCommentRequest {
  commentId: number;
  content: string;
  rating: number;
}

export interface UpdateProductCommentResponse {
  mensage: string;
  ratingUpdated: boolean;
  comment: {
    id: number;
    content: string;
    createdAt: string;
    udpatedAt: string;
  };
}
