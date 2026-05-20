import { useInfiniteQuery } from "@tanstack/react-query";
import { getProductComments } from "../../services/product.service";
import { BuildImageUrl } from "../../helpers/build-image-url";
import { baseURL } from "../../api/marketplace.api";

export interface UseGetProductCommentsInfinityQueryParams {
  productId: number;
}

export const useGetProductCommentsInfinityQuery = ({
  productId,
}: UseGetProductCommentsInfinityQueryParams) => {
  const query = useInfiniteQuery({
    queryKey: ["product-comments-infinity", productId],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getProductComments({
        productId,
        pagination: {
          perPage: 5,
          page: pageParam,
        },
      });

      return response;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  const comments =
    query.data?.pages
      .flatMap((page) => page.data)
      .map((comment) => ({
        ...comment,
        user: {
          ...comment.user,
          avatar: {
            url: comment?.user?.avatar?.url
              ? `${baseURL}${comment?.user?.avatar?.url}`
              : undefined,
          },
        },
      })) || [];

  return {
    ...query,
    comments,
  };
};
