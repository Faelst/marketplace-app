import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { CreditCardProps } from ".";
import { useEffect } from "react";

export const useCreditCardViewModel = ({
  isFlipped,
  focusedField,
  watchedValue,
}: CreditCardProps) => {
  const flipValue = useSharedValue(0);

  const frontAnimationStyle = useAnimatedStyle(() => {
    const rotateValue = interpolate(flipValue.value, [0, 1], [0, 180]);

    return {
      transform: [{ rotateY: `${rotateValue}deg` }],
      backfaceVisibility: "hidden",
    };
  });

  const backAnimationStyle = useAnimatedStyle(() => {
    const rotateValue = interpolate(flipValue.value, [0, 1], [180, 360]);

    return {
      transform: [{ rotateY: `${rotateValue}deg` }],
      backfaceVisibility: "hidden",
    };
  });

  useEffect(() => {
    flipValue.value = withTiming(isFlipped ? 1 : 0, { duration: 700 });
  }, [isFlipped]);

  return {
    isFlipped,
    focusedField,
    watchedValue,
    flipValue,
    frontAnimationStyle,
    backAnimationStyle,
  };
};
