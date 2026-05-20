import { create } from "zustand";

export interface FilterState {
  valueMin: number;
  valueMax: number;
  selectedCategories: number[];
  searchText: string;
}

interface FilterStore {
  appliedFilterState: FilterState;
  filterState: FilterState;
  updateFilter: (props: {
    key: keyof FilterState;
    value: string | number | number[] | string[];
  }) => void;
  resetFilter: () => void;
  applyFilters: () => void;
}

const defaultFilterState: FilterState = {
  valueMin: 0,
  valueMax: 0,
  selectedCategories: [],
  searchText: "",
};

export const useFilterStore = create<FilterStore>((set) => ({
  appliedFilterState: defaultFilterState,
  filterState: defaultFilterState,
  updateFilter: ({ key, value }) =>
    set((state) => ({
      filterState: {
        ...state.filterState,
        [key]: value,
      },
    })),
  resetFilter: () => set({ filterState: defaultFilterState }),
  applyFilters: () =>
    set((state) => ({ appliedFilterState: state.filterState })),
}));
