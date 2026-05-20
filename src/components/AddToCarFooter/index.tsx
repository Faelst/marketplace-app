import { Text, View } from "react-native";
import { AppButton } from "../AppButton";
import { ProductInterface } from "../../shared/interfaces/product";
import { AppPriceText } from "../AppPriceText";
import App from "../../app";

interface AddToCarFooterProps {
  product: ProductInterface;
  onAddToCart: () => void;
}

export const AddToCarFooter: React.FC<AddToCarFooterProps> = ({
  product,
  onAddToCart,
}) => {
  return (
    <View className="fixed bottom-0 left-0 right-0 bg-white p-7 h-[120px] flex-row items-center">
      <View className="flex-1">
        <AppPriceText value={Number(product.value)} />
      </View>

      <View>
        <AppButton
          className="w-[130px] h-[40px]"
          label="Adicionar"
          onPress={onAddToCart}
          leftIcon="cart"
        />
      </View>
    </View>
  );
};
