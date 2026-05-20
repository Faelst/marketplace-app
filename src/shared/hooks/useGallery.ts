import { ImagePickerOptions } from "expo-image-picker";
import { useCallback, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Toast } from "toastify-react-native";
import { Alert, Linking } from "react-native";

export const useGallery = ({
  aspect = [4, 3],
  quality = 1,
  exif = false,
  allowsEditing,
}: ImagePickerOptions) => {
  const [isLoading, setIsLoading] = useState(false);

  const requestGalleryPermission = useCallback(async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      const isGranted = status === "granted";

      if (!isGranted) {
        Alert.alert(
          "Permission Required",
          "Gallery access is required to select photos. Please enable it in your settings.",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Open Settings",
              onPress: () => {
                Linking.openSettings();
              },
            },
          ],
        );
        return false;
      }

      Toast.success("Gallery permission granted!", "top");
      return isGranted;
    } catch (error) {
      Toast.error(
        "Error requesting gallery permission. Please try again.",
        "top",
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const openGallery = useCallback(async (): Promise<string | null> => {
    setIsLoading(true);
    try {
      const hasPermission = await requestGalleryPermission();

      if (!hasPermission) {
        Toast.error("Gallery permission not granted", "top");
        return null;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        aspect,
        quality,
        allowsEditing,
        exif,
      });

      if (!result.canceled && result.assets.length > 0) {
        Toast.success("Photo selected successfully!", "top");
        return result.assets[0].uri;
      }

      return null;
    } catch (error) {
      Toast.error("Error opening gallery. Please try again.", "top");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [aspect, quality, allowsEditing, exif, requestGalleryPermission]);

  return { isLoading, requestGalleryPermission, openGallery };
};
