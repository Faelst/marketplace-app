import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../styles/global.css";
import { AppModal } from "../components/AppModal";
import ToastManager from "toastify-react-native";
import { useUserStore } from "../shared/store/user-store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppBottomSheet } from "../components/AppBottomSheet";

const queryClient = new QueryClient();

export default function Layout() {
  const { token } = useUserStore();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          {token ? (
            <Stack.Screen name="(private)" />
          ) : (
            <Stack.Screen name="(public)" />
          )}
        </Stack>
        <AppModal />
        <AppBottomSheet />
        <ToastManager useModal={false} />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
