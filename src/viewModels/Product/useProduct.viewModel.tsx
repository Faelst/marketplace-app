import { createElement } from "react";
import { useGetProductCommentsInfinityQuery } from "../../shared/queries/product/use-get-product-comments-infinity.query";
import { useGetProductDetails } from "../../shared/queries/product/use-get-product-details";
import { useCartStore } from "../../shared/store/cart-store";
import { useModalStore } from "../../shared/store/modal-store";
import { AddToCartSuccessModal } from "../../components/AddToCartSuccessModal";
import { router } from "expo-router";
import { useBottomSheetStore } from "../../shared/store/bottomsheet-store";
import { ReviewBottomSheet } from "../../components/ReviewBottomSheet";

export const useProductViewModel = ({ id }: { id: number }) => {
  const { data, isLoading, error } = useGetProductDetails(id);
  const {
    comments,
    isLoading: isCommentsLoading,
    hasNextPage,
    fetchNextPage,
    refetch,
    error: commentsError,
    isRefetching,
    isFetchingNextPage,
  } = useGetProductCommentsInfinityQuery({
    productId: id,
  });
  const {
    addProduct,
    clearCart,
    getProductCount,
    products,
    removeProduct,
    totalPrice,
    updateQuantity,
  } = useCartStore();
  const { open, close } = useModalStore();
  const { open: openBottomSheet, close: closeBottomSheet } =
    useBottomSheetStore();

  const handleLoadMoreComments = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleRefreshComments = () => {
    if (!isRefetching) {
      refetch();
    }
  };

  const handleEndReached = () => {
    handleLoadMoreComments();
  };

  const handleAddToCart = () => {
    if (!data) return;

    addProduct({
      id: data.id,
      name: data.name,
      price: Number(data.value),
      image: data.photo,
    });

    open(
      createElement(AddToCartSuccessModal, {
        productName: data.name,
        onGoToCart: handleGoToCart,
        onClose: handleCloseModal,
        onContinueShopping: handleContinueShopping,
      }),
    );
  };

  const handleGoToCart = () => {
    router.push("/(private)/(tabs)/cart");
    close();
  };

  const handleContinueShopping = () => {
    router.push("/(private)/(tabs)/home");
    close();
  };

  const handleCloseModal = () => {
    close();
  };

  const handleOpenReview = () => {
    if (!data) return;

    openBottomSheet({
      content: createElement(ReviewBottomSheet, {
        productId: data.id,
      }),
    });
  };

  return {
    product: data,
    comments,
    isLoading,
    error,
    isCommentsLoading,
    hasNextPage,
    commentsError,
    isRefetching,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
    handleLoadMoreComments,
    handleRefreshComments,
    handleEndReached,
    handleAddToCart,
    handleOpenReview,
  };
};
