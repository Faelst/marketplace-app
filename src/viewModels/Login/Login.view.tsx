import { Text, TouchableOpacity, View } from "react-native";
import { AuthFormHeader } from "../../components/AuthFormHeader";
import { AppInputController } from "../../components/AppInputController";
import { useRouter } from "expo-router";
import { KeyboardContainer } from "../../components/KeyboardContainer";
import { useLoginViewModel } from "./useLogin.viewModel";
import { AppButton } from "../../components/AppButton";
import { AppButtonVariantEnum } from "../../components/AppButton/button.variant";

export const LoginView: React.FC<ReturnType<typeof useLoginViewModel>> = ({
  control,
  onSubmit,
}) => {
  const router = useRouter();

  return (
    <KeyboardContainer>
      <View className="flex-1 justify-center px-8 items-center">
        <View className="flex-1 justify-center w-full space-y-6">
          <AuthFormHeader
            title="Acesse sua conta"
            subTitle="bem-vindo de volta! estamos felizes em vê-lo novamente"
          />

          <AppInputController
            control={control}
            name="email"
            leftIcon="mail-outline"
            label="email"
            placeholder="Enter your email"
          />

          <AppInputController
            control={control}
            name="password"
            leftIcon="lock-closed-outline"
            label="password"
            placeholder="Enter your password"
            secureTextEntry
          />

          <AppButton
            label="Login"
            onPress={onSubmit}
            rightIcon="arrow-forward"
            variant={AppButtonVariantEnum.FILLED}
            className="mt-4"
          />
        </View>

        <View className="flex-2 gap-6 pb-16">
          <Text className="text-start text-base text-gray-400">
            Don't have an account?
          </Text>
          <AppButton
            label="Sign Up"
            onPress={() => router.push("/(public)/register")}
            rightIcon="arrow-forward"
            variant={AppButtonVariantEnum.OUTLINED}
          />
        </View>
      </View>
    </KeyboardContainer>
  );
};
