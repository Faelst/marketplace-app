import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useAddCardBottomSheetViewModel } from "./useAddCardBottomSheet.viewModel";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import { AppInput } from "../AppInput";
import { AppButton } from "../AppButton";
import { AppButtonVariantEnum } from "../AppButton/button.variant";
import { AppInputController } from "../AppInputController";
import { CreditCard } from "../CreditCard";

export const AddCardBottomSheetView: React.FC<
  ReturnType<typeof useAddCardBottomSheetViewModel>
> = ({
  handleCreateCreditCard,
  control,
  expirationDateMask,
  cardNumberMask,
}) => {
  return (
    <ScrollView className="flex-1">
      <View className="p-8">
        <View className="flex-row justify-between items-center mb-6">
          <Text className="font-bode text-2xl text-center text-gray-900">
            Adicionar cartao
          </Text>
          <TouchableOpacity className="w-8 h-8 items-center justify-center border border-gray-400 rounded-md">
            <Ionicons name="close" size={24} color={colors.grays[400]} />
          </TouchableOpacity>
        </View>

        <CreditCard />

        <View className="mt-6 gap-4">
          <AppInputController
            control={control}
            name="number"
            placeholder="Número do cartão"
            leftIcon="card-outline"
            label="Número do cartão"
            mask={cardNumberMask}
            keyboardType="numeric"
            maxLength={19}
          />

          <AppInputController
            control={control}
            name="titularName"
            placeholder="Nome completo"
            leftIcon="person-outline"
            label="Nome completo"
          />

          <View className="flex-row gap-4">
            <View className="flex-1">
              <AppInputController
                control={control}
                name="expirationDate"
                placeholder="MM/AA"
                leftIcon="calendar-outline"
                label="Validade"
                keyboardType="numeric"
                maxLength={5}
                mask={expirationDateMask}
              />
            </View>

            <View className="flex-1">
              <AppInputController
                control={control}
                name="CVV"
                placeholder="CVV"
                leftIcon="shield-checkmark-outline"
                label="Código de segurança"
                keyboardType="numeric"
                maxLength={3}
              />
            </View>
          </View>

          <View className="flex-row gap-4">
            <View className="flex-1">
              <AppButton
                label="Cancelar"
                variant={AppButtonVariantEnum.OUTLINED}
                className="w-full "
              />
            </View>

            <View className="flex-1">
              <AppButton
                label="Adicionar cartão"
                className="w-full"
                onPress={handleCreateCreditCard}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
