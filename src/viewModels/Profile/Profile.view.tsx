import { SafeAreaView } from "react-native-safe-area-context";
import { useProfileViewModel } from "./useProfile.viewModel";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { AppButton } from "../../components/AppButton";
import { AppButtonVariantEnum } from "../../components/AppButton/button.variant";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import { KeyboardContainer } from "../../components/KeyboardContainer";
import { AppInputController } from "../../components/AppInputController";

export const ProfileView: React.FC<ReturnType<typeof useProfileViewModel>> = ({
  control,
  avatarUri,
  handleSelectAvatar,
  handleSubmit,
  handleLogout,
  handleGoBack,
}) => {
  return (
    <KeyboardContainer>
      <ScrollView className="flex-1 px-6">
        <View className="justify-between flex-row items-center py-3">
          <TouchableOpacity
            className="flex-row items-center"
            onPress={handleGoBack}
          >
            <Ionicons
              name="arrow-back"
              size={20}
              color={colors["purple-base"]}
            />
            <Text className="text-purple-base font-bold text-sm ml-2">
              Voltar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center"
            onPress={handleLogout}
          >
            <Ionicons name="log-out" size={20} color={colors["danger"]} />
            <Text className="text-danger font-bold text-sm ml-2">Sair</Text>
          </TouchableOpacity>
        </View>

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

        <Text className="text-base mt-6 text-gray-500 font-bold">
          Dados Pessoais
        </Text>

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
          label="Atualizar Perfil"
          onPress={handleSubmit}
          variant={AppButtonVariantEnum.FILLED}
          className="mt-4"
        />
      </ScrollView>
    </KeyboardContainer>
  );
};
