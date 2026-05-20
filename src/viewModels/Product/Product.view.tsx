import { FlatList } from "react-native-gesture-handler";
import { useProductViewModel } from "./useProduct.viewModel";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import { Header } from "./components/Header";
import { CommentItem } from "./components/CommentItem";
import { ListFooter } from "../../components/ListFooter";
import { EmptyList } from "../../components/EmptyList";
import { Loading } from "../../components/Loading";
import { Error } from "../../components/Error";
import { AddToCarFooter } from "../../components/AddToCarFooter";

export const ProductView: React.FC<ReturnType<typeof useProductViewModel>> = ({
  error,
  isLoading,
  product,
  comments,
  isRefetching,
  isFetchingNextPage,
  handleRefreshComments,
  handleEndReached,
  handleAddToCart,
  handleOpenReview,
}) => {
  if (error) {
    return <Error />;
  }

  if (isLoading || !product) {
    return <Loading />;
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <FlatList
        data={comments}
        renderItem={({ item }) => <CommentItem comment={item as any} />}
        ListHeaderComponent={
          <Header handleOpenReview={handleOpenReview} product={product!} />
        }
        onEndReached={handleEndReached}
        onRefresh={handleRefreshComments}
        refreshing={isRefetching}
        ListFooterComponent={<ListFooter isLoadingMore={isFetchingNextPage} />}
        ListEmptyComponent={<EmptyList isLoading={isLoading} />}
        className="px-6"
        contentContainerStyle={{ paddingBottom: 30 }}
      />
      <AddToCarFooter product={product} onAddToCart={handleAddToCart} />
    </SafeAreaView>
  );
};
