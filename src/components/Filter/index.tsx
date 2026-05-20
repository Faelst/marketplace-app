import { FilterView } from "./FilterView";
import { useFilterModel } from "./useFilterModel";

export const Filter = () => {
  const propos = useFilterModel();

  return <FilterView {...propos} />;
};
