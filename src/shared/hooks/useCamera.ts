import { useCallback, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Toast } from "toastify-react-native";

interface UseCameraOptions {
  aspect?: [number, number];
  quality?: number;
  allowsEditing?: boolean;
  exif?: boolean;
}

export const useCamera = ({
  aspect = [4, 3],
  quality = 1,
  allowsEditing = false,
  exif = false,
}: UseCameraOptions) => {
  const [isLoading, setIsLoading] = useState(false);

  const requestCameraPermission = useCallback(async (): Promise<boolean> => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      const isGranted = status === "granted";

      if (!isGranted) {
        Toast.error(
          "Camera permission is required to take photos. Please enable it in your settings.",
          "top",
        );
        return false;
      }

      Toast.success("Camera permission granted!", "top");
      return isGranted;
    } catch (error) {
      Toast.error(
        "Error requesting camera permission. Please try again.",
        "top",
      );
      return false;
    }
  }, []);

  const openCamera = useCallback(async (): Promise<string | null> => {
    setIsLoading(true);
    try {
      const hasPermission = await requestCameraPermission();

      if (!hasPermission) {
        console.warn("Camera permission not granted");
        return null;
      }

      const result = await ImagePicker.launchCameraAsync({
        aspect,
        quality,
        allowsEditing,
        exif,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        Toast.success("Photo taken successfully!", "top");
        return result.assets[0].uri;
      }

      return null;
    } catch (error: any) {
      if (error.code === "ERR_CAMERA_UNAVAILABLE_ON_SIMULATOR") {
        Toast.error(
          "Camera is not available on the simulator. Please test on a real device.",
          "top",
        );
        return null;
      }

      Toast.error("Error opening camera. Please try again.", "top");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [aspect, quality, allowsEditing, exif]);

  return { requestCameraPermission, openCamera, isLoading };
};
