import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useRegisterViewModel } from "./useRegister.viewModel";
import { AppInputController } from "../../components/AppInputController";
import { AuthFormHeader } from "../../components/AuthFormHeader";
import { useRouter } from "expo-router";
import { KeyboardContainer } from "../../components/KeyboardContainer";
import { AppButtonVariantEnum } from "../../components/AppButton/button.variant";
import { AppButton } from "../../components/AppButton";

export const RegisterView: React.FC<
  ReturnType<typeof useRegisterViewModel>
> = ({ handleSubmit, control, errors, handleSelectAvatar, avatarUri }) => {
  const router = useRouter();

  return (
    <KeyboardContainer>
      <ScrollView className="flex-1 px-8">
        <AuthFormHeader
          title="Crie sua conta"
          subTitle="informe seus dados e crie uma conta"
        />

        <TouchableOpacity
          className="w-28 h-28 bg-gray-200 rounded-full items-center justify-center my-4 self-center"
          onPress={handleSelectAvatar}
        >
          {avatarUri ? (
            <Image
              source={{ uri: avatarUri }}
              className="w-28 h-28 rounded-full"
              resizeMode="cover"
            />
          ) : (
            <Text className="text-gray-500">Avatar</Text>
          )}
        </TouchableOpacity>

        <AppInputController
          control={control}
          name="name"
          leftIcon="person-outline"
          label="Nome"
          placeholder="Enter your name"
        />

        <AppInputController
          control={control}
          name="phone"
          leftIcon="call-outline"
          label="Phone"
          placeholder="Enter your phone number"
        />

        <Text className="text-base mt-6 text-gray-500 font-bold">Acesso</Text>
        <AppInputController
          control={control}
          name="email"
          leftIcon="mail-outline"
          label="Email"
          placeholder="Enter your email"
        />

        <AppInputController
          control={control}
          name="password"
          leftIcon="lock-closed-outline"
          label="Password"
          placeholder="Enter your password"
          secureTextEntry
        />

        <AppInputController
          control={control}
          name="confirmPassword"
          leftIcon="lock-closed-outline"
          label="Confirm Password"
          placeholder="Confirm your password"
          secureTextEntry
        />

        <AppButton
          label="Register"
          onPress={handleSubmit}
          rightIcon="arrow-forward"
          variant={AppButtonVariantEnum.FILLED}
          className="mt-4"
        />

        <View className="mt-16 gap-6 ">
          <Text className="text-start text-base text-gray-400">
            Already have an account?
          </Text>
          <AppButton
            label="Sign Up"
            onPress={() => router.push("/(public)/login")}
            rightIcon="arrow-forward"
            variant={AppButtonVariantEnum.OUTLINED}
          />
        </View>
      </ScrollView>
    </KeyboardContainer>
  );
};
