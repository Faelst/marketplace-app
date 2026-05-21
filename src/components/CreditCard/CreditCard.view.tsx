import { FC } from "react";
import { useCreditCardViewModel } from "./useCreditCard.viewModel";
import { Text, View } from "react-native";
import { colors } from "../../styles/colors";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { clsx } from "clsx";

const PURPLE_GRADIENT: readonly [string, string, string] = [
  colors["disabled-purple"],
  colors["purple-base"],
  colors["purple-dark"],
];

export const CreditCardView: FC<ReturnType<typeof useCreditCardViewModel>> = ({
  isFlipped,
  focusedField,
  backAnimationStyle,
  frontAnimationStyle,
  watchedValue,
}) => {
  return (
    <View className="h-[192px]">
      <Animated.View
        style={[
          frontAnimationStyle,
          {
            position: "absolute",
            width: "100%",
            height: 192,
            backfaceVisibility: "hidden",
          },
        ]}
      >
        <LinearGradient
          colors={PURPLE_GRADIENT}
          start={{ x: 0.21, y: -0.01 }}
          style={{
            flex: 1,
            borderRadius: 16,
            padding: 20,
          }}
        >
          <View className="flex-row justify-between items-center mb-4">
            <View className="w-12 h-8 bg-yellow-400 rounded-md" />
          </View>

          <View
            className={clsx("py-2 px-1 rounded-xl mb-6", {
              "": focusedField !== "number",
              "bg-white/20": focusedField === "number",
            })}
          >
            <Text className="text-white text-lg tracking-widest text-center">
              {watchedValue?.number || "1234 5678 9012 3456"}
            </Text>
          </View>

          <View className="flex-row justify-between items-end">
            <View
              className={clsx("flex-1 py-2 px-2 rounded-xl", {
                "": focusedField !== "titularName",
                "bg-white/20": focusedField === "titularName",
              })}
            >
              <Text className="text-white text-sm font-bold text-start uppercase">
                PORTADOR
              </Text>
              <Text className="text-white text-base text-start font-semibold">
                {watchedValue?.titularName || "Fulano da Silva"}
              </Text>
            </View>

            <View
              className={clsx("py-2 px-1 rounded-xl ml-4", {
                "": focusedField !== "expirationDate",
                "bg-white/20": focusedField === "expirationDate",
              })}
            >
              <Text className="text-white text-xs mb-1 font-semibold">
                VALIDO ATE
              </Text>
              <Text className="text-white text-sm font-bold">
                {watchedValue?.expirationDate || "MM/AA"}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>

      <Animated.View
        style={[
          backAnimationStyle,
          {
            position: "absolute",
            width: "100%",
            height: 192,
            backfaceVisibility: "hidden",
          },
        ]}
      >
        <LinearGradient
          colors={PURPLE_GRADIENT}
          start={{ x: 0.21, y: -0.01 }}
          style={{
            flex: 1,
            borderRadius: 16,
          }}
        >
          <View className="h-[40px] bg-black w-full mt-8" />

          <View className="flex-1 justify-center items-end px-5">
            <View className="w-24">
              <Text className="text-white text-xs font-semibold mb-1">CVV</Text>

              <View
                className={clsx("p-2 h-8 justify-center rounded-xl bg-white", {
                  "bg-white/20": focusedField === "CVV",
                })}
              >
                <Text className="text-black text-sm font-bold">
                  {watchedValue?.CVV || "123"}
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>
    </View>
  );
};
