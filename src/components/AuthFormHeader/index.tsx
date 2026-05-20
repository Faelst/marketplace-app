import { Image, Text, View } from "react-native";

interface AuthFormHeaderProps {
  title: string;
  subTitle: string;
}

export const AuthFormHeader: React.FC<AuthFormHeaderProps> = ({
  title,
  subTitle,
}) => {
  return (
    <View className="items-center mb-8">
      <Image
        resizeMode="contain"
        source={require("../../assets/images/Logo.png")}
        className="mb-8 w-[80px] h-[60px]"
      />
      <Text className="text-2xl font-bold text-gray-500 mb-3 text-center">
        {title}
      </Text>

      <Text className="text-base text-gray-300 text-center">{subTitle}</Text>
    </View>
  );
};
