import { useState } from "react";
import { useDebounce } from "../../shared/hooks/useDebounce";
import { useGetProductCategoriesQuery } from "../../shared/queries/product/use-get-product-categories";
import { useBottomSheetStore } from "../../shared/store/bottomsheet-store";
import { useFilterStore } from "../../shared/store/use-filter-store";

export const useFilterModel = () => {
  const {
    data: productCategories,
    isLoading,
    error,
    refetch,
  } = useGetProductCategoriesQuery();
  const { updateFilter, resetFilter, applyFilters, filterState } =
    useFilterStore();
  const { close } = useBottomSheetStore();
  const handleValueMaxChange = (value: string) => {
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      updateFilter({ key: "valueMax", value: numericValue });
    }
  };

  const handleValueMinChange = (value: string) => {
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      updateFilter({ key: "valueMin", value: numericValue });
    }
  };

  const handleSearchTextChange = (value: string) => {
    updateFilter({ key: "searchText", value });
  };

  const handleCategoryToggle = (categoryId: number) => {
    const categoryAlreadySelected =
      filterState.selectedCategories.includes(categoryId);

    if (categoryAlreadySelected) {
      const value = filterState.selectedCategories.filter(
        (id) => id !== categoryId,
      );
      updateFilter({
        key: "selectedCategories",
        value,
      });
    } else {
      const value = [...filterState.selectedCategories, categoryId];
      updateFilter({
        key: "selectedCategories",
        value,
      });
    }
  };

  const handleApplyFilters = () => {
    applyFilters();
    close();
  };

  const handleResetFilters = () => {
    resetFilter();
  };

  return {
    productCategories,
    isLoading,
    error,
    filterState,
    refetch,
    handleValueMaxChange,
    handleValueMinChange,
    handleCategoryToggle,
    handleSearchTextChange,
    handleApplyFilters,
    handleResetFilters,
  };
};
