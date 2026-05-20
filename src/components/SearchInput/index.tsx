import { Text, TouchableOpacity, View } from "react-native";
import { AppInput } from "../AppInput";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import { useBottomSheetStore } from "../../shared/store/bottomsheet-store";
import { Filter } from "../Filter";

interface SearchInputProps {
  onChangeText: (text: string) => void;
  searchText: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  onChangeText,
  searchText,
}) => {
  const { open } = useBottomSheetStore();

  return (
    <View className="mb-3 mt-6">
      <Text className="text-2xl font-bold mt-6 mb-4">Explore Produtos</Text>
      <View className="flex-row">
        <View className="flex-1">
          <AppInput
            placeholder="Buscar produtos..."
            leftIcon="search"
            className="text-lg"
            onChangeText={onChangeText}
            value={searchText}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            open({
              content: <Filter />,
            });
          }}
          className="ml-5 mt-6 items-center justify-center rounded-xl border-[1px] h-[48px] w-[48px] border-purple-base"
        >
          <Ionicons
            name="filter-outline"
            size={24}
            color={colors[`purple-base`]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
