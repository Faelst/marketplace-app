import Constants from "expo-constants";
import { Platform } from "react-native";
import { baseURL } from "../api/marketplace.api";

export const BuildImageUrl = (originalUrl: string) => {
  if (!originalUrl) return originalUrl;

  if (Constants.expoConfig?.extra?.isProduction) {
    const fullUrl = originalUrl.startsWith("/")
      ? `${baseURL}${originalUrl}`
      : originalUrl;
    return fullUrl;
  }

  const fullUrl = originalUrl.startsWith("/")
    ? `${baseURL}${originalUrl}`
    : originalUrl;

  return Platform.select({
    android: fullUrl.replace("localhost", "10.0.2.2"),
    ios: fullUrl,
  });
};
