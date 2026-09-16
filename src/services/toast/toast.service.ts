import Toast from "react-native-toast-message";

type ToastType =
  | "success"
  | "error"
  | "info";

interface ShowToastProps {
  type: ToastType;

  title?: string;

  message: string;
}

export function showToast({
  type,

  title,

  message,
}: ShowToastProps) {
  Toast.show({
    type,

    text1:
      title || type.toUpperCase(),

    text2: message,

    position: "top",

    visibilityTime: 4000,
  });
}