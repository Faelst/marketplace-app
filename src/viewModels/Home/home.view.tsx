import { FlatList, RefreshControl, Text, View } from "react-native";
import { useHomeViewModel } from "./useHome.viewModel";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeHeader } from "../../components/HomeHeader";
import { SearchInput } from "../../components/SearchInput";
import { ProductCard } from "../../components/ProductCard";
import { Footer } from "../../components/Footer";
import { colors } from "../../styles/colors";
import { memo } from "react";

const RenderHeader = memo(
  ({
    setSearchText,
    searchText,
  }: {
    setSearchText: (text: string) => void;
    searchText: string;
  }) => {
    return (
      <>
        <HomeHeader />
        <SearchInput onChangeText={setSearchText} searchText={searchText} />
      </>
    );
  },
);

export const HomeView: React.FC<ReturnType<typeof useHomeViewModel>> = ({
  products,
  handleEndReached,
  isLoading,
  hasNextPage,
  isFetchingNextPage,
  handleRefresh,
  isRefetching,
  setSearchText,
  searchText,
  handleGoToProfile,
}) => {
  return (
    <SafeAreaView className="flex-1 " edges={["top"]}>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        ListFooterComponent={
          <Footer
            isLoading={hasNextPage && Boolean(isLoading || isFetchingNextPage)}
          />
        }
        onEndReached={handleEndReached}
        columnWrapperClassName="justify-between"
        ListHeaderComponent={
          <RenderHeader setSearchText={setSearchText} searchText={searchText} />
        }
        contentContainerClassName="px-[16px] pb-[120px]"
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            colors={[colors["purple-base"]]}
            tintColor={colors["purple-base"]}
            onRefresh={handleRefresh}
          />
        }
      />
    </SafeAreaView>
  );
};
