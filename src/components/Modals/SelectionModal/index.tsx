import { Text, TouchableOpacity, View } from "react-native";
import { SelectionOptions } from "../../../shared/hooks/useAppModal";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import clsx from "clsx";

export interface SelectionModalProps {
  title: string;
  message?: string;
  options: SelectionOptions[];
}

export const SelectionModal: React.FC<SelectionModalProps> = ({
  title,
  message,
  options,
}: SelectionModalProps) => {
  const getButtonClass = (variant?: "primary" | "secondary" | "danger") =>
    clsx("w-full py-3 px-4 rounded-lg items-center mb-2", {
      "bg-purple-base": variant === "primary",
      "bg-blue-dark": variant === "secondary",
      "bg-danger": variant === "danger",
    });

  return (
    <View className="bg-white rounded-xl shadow-2xl w-[85%] mx-auto max-w-sm p-6">
      <View className="items-center">
        <Text className="text-lg font-bold text-gray-900 mb-3">{title}</Text>

        {message && (
          <Text className="text-base text-gray-500 mb-6 leading-6">
            {message}
          </Text>
        )}
      </View>

      <View className="mt-1">
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            className={`py-3 px-4 rounded-lg items-center  mb-2 ${getButtonClass(option?.variant ?? "primary")}`}
            onPress={option.onPress}
          >
            <View className="flex-row items-center">
              {option.icon && (
                <Ionicons
                  name={option.icon}
                  size={20}
                  className="mr-2 text-gray-500"
                  color={"#FFF"}
                />
              )}
              <Text className="text-center font-semibold text-white">
                {option.title}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
