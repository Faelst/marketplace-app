import { Image, Text, TouchableOpacity, View } from "react-native";
import { useUserStore } from "../../shared/store/user-store";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import { router } from "expo-router";
import { BuildImageUrl } from "../../shared/helpers/build-image-url";

export const HomeHeader = () => {
  const { user } = useUserStore();

  const handleGoToProfile = () => {
    router.push("/profile");
  };

  return (
    <View>
      <TouchableOpacity
        onPress={handleGoToProfile}
        className="flex-row items-center gap-2"
      >
        <View className="relative">
          {user?.avatarUrl ? (
            <Image
              source={{ uri: BuildImageUrl(user.avatarUrl) }}
              className="w-[56px] h-[56px] rounded-xl border-shape"
            />
          ) : (
            <View className="w-[56px] h-[56px] rounded-xl items-center justify-center border-gray-200 border-2 bg-shape ">
              <Ionicons name="person" size={24} color={colors.grays[300]} />
            </View>
          )}
        </View>

        <View>
          <Text className="text-sm text-grays-300 font-bold">
            Ola, {user?.name.split(" ")[0] || "Usuário"}
          </Text>
          <View className="flex-row items-center gap-2">
            <Text className="text-purple-base font-bold text-sm">
              Ver perfil
            </Text>
            <Ionicons
              name="arrow-forward-outline"
              size={20}
              color={colors["purple-base"]}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
