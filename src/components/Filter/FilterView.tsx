import { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useFilterModel } from "./useFilterModel";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import { AppInput } from "../AppInput";
import { AppButton } from "../AppButton";
import { AppButtonVariantEnum } from "../AppButton/button.variant";
import CheckBox from "expo-checkbox";

export const FilterView: FC<ReturnType<typeof useFilterModel>> = ({
  productCategories,
  error,
  isLoading,
  filterState,
  refetch,
  handleCategoryToggle,
  handleSearchTextChange,
  handleValueMaxChange,
  handleValueMinChange,
  handleApplyFilters,
  handleResetFilters,
}) => {
  return (
    <View>
      <View className="flex-row items-center justify-between p-4 px-6">
        <Text className="text-lg font-bold text-gray-900">
          Filtrar anuncios{" "}
        </Text>

        <TouchableOpacity>
          <Ionicons name="close" size={20} color={colors["purple-base"]} />
        </TouchableOpacity>
      </View>

      <View className="p-4 px-6">
        <Text className="font-semibold text-base text-gray-400">VALOR</Text>
        <View className="flex-row mb-4 w-[100%]">
          <View className="flex-1">
            <AppInput
              placeholder="De"
              keyboardType="numeric"
              containerClassName="w-[90%]"
              onChangeText={handleValueMinChange}
              value={
                filterState.valueMin ? filterState.valueMin.toString() : ""
              }
            />
          </View>
          <View className="flex-1">
            <AppInput
              placeholder="Até"
              keyboardType="numeric"
              containerClassName="w-[90%]"
              onChangeText={handleValueMaxChange}
              value={
                filterState.valueMax ? filterState.valueMax.toString() : ""
              }
            />
          </View>
        </View>

        <Text className="font-semibold text-base text-gray-300 mb-5">
          CATEGORIA
        </Text>
        {isLoading ? (
          <Text>Carregando categorias...</Text>
        ) : error ? (
          <View>
            <Text className="text-red-500">Erro ao carregar categorias</Text>
            <TouchableOpacity onPress={() => refetch()} className="mt-2">
              <Text className="text-blue-500">Tentar novamente</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="mb-6 gap-2">
            {productCategories?.map((category) => (
              <TouchableOpacity
                key={`product-category-${category.id}`}
                className="flex-row items-center py-2"
                onPress={() => handleCategoryToggle(category.id)}
              >
                <CheckBox
                  value={filterState.selectedCategories.includes(category.id)}
                  onValueChange={() => handleCategoryToggle(category.id)}
                  color={colors["purple-base"]}
                  className="mr-3 rounded-full"
                />
                <Text className="text-base text-gray-400">{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View className="flex-row gap-3 mt-4 mb-6">
          <View className="flex-1 ">
            <AppButton
              variant={AppButtonVariantEnum.OUTLINED}
              label="Limpar filtros"
              onPress={handleResetFilters}
            />
          </View>
          <View className="flex-1 ">
            <AppButton
              variant={AppButtonVariantEnum.FILLED}
              label="Aplicar filtros"
              onPress={handleApplyFilters}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
