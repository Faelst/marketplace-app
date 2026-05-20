import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AppPriceText } from "../AppPriceText";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import { AppButton } from "../AppButton";
import { CreditCardItem } from "../CreditCardItem";
import { FC } from "react";
import { useCartFooterViewModel } from "./useCartFooter.viewModel";
import { CartFooterProps } from ".";
import { CreditCard } from "../../shared/interfaces/credit-card";

export const CartFooterView: FC<
  ReturnType<typeof useCartFooterViewModel> & CartFooterProps
> = ({
  onOpenCartBottomSheet,
  setSelectedCreditCard,
  creditCards,
  isLoadingCreditCards,
  selectedCreditCard,
  totalPrice,
  isOrderSubmitting,
  submitOrder,
}) => {
  return (
    <View className="bg-white p-4 rounded-lg mt-6">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xs font-semibold text-gray-500">Valor Total</Text>
        <AppPriceText
          value={totalPrice}
          classNameCurrency="text-base font-bold text-gray-900"
          classNameValue="text-BASE font-bold text-gray-900"
        />
      </View>

      <View className="mb-4">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-xs font-semibold text-gray-600">
            CARTAO DE CREDITO
          </Text>

          <TouchableOpacity
            className="flex-row items-center gap-2"
            onPress={onOpenCartBottomSheet}
          >
            <Ionicons
              name="card-outline"
              size={20}
              color={colors["purple-base"]}
            />
            <Text className="text-xs text-purple-base font-bold">
              Adicionar cartão
            </Text>
          </TouchableOpacity>
        </View>

        {isLoadingCreditCards ? (
          <View className="py-4 items-center">
            <ActivityIndicator size={"small"} color={colors["purple-base"]} />
            <Text className="text-sm text-gray-500 mt-2">
              Carregando cartões...
            </Text>
          </View>
        ) : (
          <FlatList
            data={creditCards}
            className="gap-3"
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item: creditCard }) => (
              <CreditCardItem
                creditCard={creditCard}
                isSelected={selectedCreditCard?.id === creditCard.id}
                onSelectCreditCard={() => setSelectedCreditCard(creditCard)}
              />
            )}
          />
        )}

        <AppButton
          label="Checkout"
          className="mt-4"
          onPress={submitOrder}
          isLoading={isOrderSubmitting}
        />
      </View>
    </View>
  );
};
