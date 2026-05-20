import { useState } from "react";
import { BuildImageUrl } from "../../shared/helpers/build-image-url";
import { useProductInfinityQuery } from "../../shared/queries/product/use-product-infinity.query";
import { useFilterStore } from "../../shared/store/use-filter-store";
import { useDebounce } from "../../shared/hooks/useDebounce";
import { router } from "expo-router";

export const useHomeViewModel = () => {
  const { appliedFilterState } = useFilterStore();
  const [searchText, setSearchText] = useState<string>("");
  const { debouncedValue } = useDebounce<string>(searchText);
  const productInfinityQuery = useProductInfinityQuery({
    filters: {
      ...appliedFilterState,
      searchText: debouncedValue,
    },
  });

  const handleLoadMore = () => {
    if (
      productInfinityQuery.hasNextPage &&
      !productInfinityQuery.isFetchingNextPage &&
      !productInfinityQuery.isLoading
    ) {
      productInfinityQuery.fetchNextPage();
    }
  };

  const handleRefresh = () => {
    if (!productInfinityQuery.isRefetching && !productInfinityQuery.isLoading) {
      productInfinityQuery.refetch();
    }
  };

  const products = productInfinityQuery.data
    ? productInfinityQuery.data.pages
        .flatMap((page) => page.data)
        .map((product) => ({
          ...product,
          photo: BuildImageUrl(product.photo) || "",
        }))
    : [];

  const handleEndReached = () => {
    if (productInfinityQuery.hasNextPage) {
      handleLoadMore();
    }
  };

  const handleGoToProfile = () => {
    router.push("/profile");
  };

  return {
    ...productInfinityQuery,
    products,
    handleLoadMore,
    handleEndReached,
    handleRefresh,
    setSearchText,
    searchText,
    handleGoToProfile,
  };
};
