import {
  ActivityIndicator,
  ActivityIndicatorComponent,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useReviewBottomSheetViewModel } from "./useReviewBottomSheet.viewModel";
import { Ionicons } from "@expo/vector-icons";
import { AppInput } from "../AppInput";
import { AppButton } from "../AppButton";
import { AppButtonVariantEnum } from "../AppButton/button.variant";
import { Stars } from "../Stars";
import { colors } from "../../styles/colors";

export const ReviewBottomSheetView: React.FC<
  ReturnType<typeof useReviewBottomSheetViewModel>
> = ({
  ratingForm,
  handleContentChange,
  handleRatingChange,
  handleSubmit,
  isLoading,
}) => {
  return (
    <View className="bg-background rounded-t-2xl">
      <View className="flex-row items-center justify-between p-6">
        <Text className="text-lg font-bold text-gray-900">
          {ratingForm.isEditing ? "Editar Avaliação" : "Avaliar Produto"}
        </Text>

        <TouchableOpacity className="w-8 h-8 items-center justify-center rounded-[10px] border border-gray-400">
          <Ionicons name="close" size={24} color={colors.grays[400]} />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View className="p-6 items-center justify-center min-h-[200px]">
          <ActivityIndicator color={colors["purple-base"]} size={"large"} />
          <Text className="text-gray-500 mt-3 text-center">
            Verificando avaliação...
          </Text>
        </View>
      ) : (
        <View className="p-6">
          <Text className="font-semibold text-base text-gray-400 mb-2">
            Nota
          </Text>

          <View className="flex-row items-center mb-6">
            <Stars rating={ratingForm.rating} onChange={handleRatingChange} />
          </View>

          <AppInput
            label="Comentário"
            placeholder={
              ratingForm.isEditing
                ? "Edite seu comentário sobre o produto"
                : "Deixe seu comentário sobre o produto"
            }
            value={ratingForm.content}
            onChangeText={handleContentChange}
            multiline
            numberOfLines={5}
            className="h-[150px]"
            textAlign="left"
            containerClassName="mb-8"
          />

          <View className="flex-row gap-3 mb-12">
            <View className="flex-1">
              <AppButton
                variant={AppButtonVariantEnum.OUTLINED}
                label="Cancelar"
              />
            </View>

            <View className="flex-1">
              <AppButton
                variant={AppButtonVariantEnum.OUTLINED}
                label={ratingForm.isEditing ? "Atualizar" : "Enviar"}
                onPress={handleSubmit}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};
