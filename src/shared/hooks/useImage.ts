import { ImagePickerOptions } from "expo-image-picker";
import { useAppModal } from "./useAppModal";
import { useCamera } from "./useCamera";
import { useGallery } from "./useGallery";
import { useModalStore } from "../store/modal-store";

interface UseImageParams extends ImagePickerOptions {
  callback: (uri: string) => void;
}

export const useImage = ({
  aspect = [4, 3],
  quality = 1,
  exif = false,
  allowsEditing,
  callback,
}: UseImageParams) => {
  const modals = useAppModal();

  const { close } = useModalStore();

  const { openCamera, isLoading: isCameraLoading } = useCamera({
    aspect,
    quality,
    allowsEditing,
  });
  const { openGallery, isLoading: isGalleryLoading } = useGallery({
    aspect,
    quality,
    allowsEditing,
  });

  const loading = Boolean(isCameraLoading || isGalleryLoading);

  const handleCallback = (uri: string) => {
    close();

    if (callback) {
      callback(uri);
    }
  };

  const handleSelectImage = () => {
    modals.showSelection({
      title: "Select Avatar",
      message: "Choose an option to set your avatar",
      options: [
        {
          title: "Camera",
          onPress: async () => {
            const photoUri = await openCamera();
            handleCallback(photoUri || "");
          },
          icon: "camera",
          variant: "primary",
          message: "Use your camera to take a new photo",
        },
        {
          title: "Gallery",
          onPress: async () => {
            const photoUri = await openGallery();
            handleCallback(photoUri || "");
          },
          icon: "image",
          variant: "primary",
          message: "Select an existing photo from your gallery",
        },
      ],
    });
  };

  return { handleSelectImage, loading };
};
