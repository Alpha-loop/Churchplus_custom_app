import {
  ReactNode,
} from "react";

import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";

interface AppButtonProps {
  title: string;

  onPress?: () => void;

  loading?: boolean;

  disabled?: boolean;

  leftIcon?: ReactNode;

  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "checkin";

  fullWidth?: boolean;
}

export default function AppButton({
  title,

  onPress,

  loading = false,

  disabled = false,

  leftIcon,

  variant = "primary",

  fullWidth = true,
}: AppButtonProps) {
  const backgroundColor =
    variant === "primary"
      ? "#1146B5"
      : variant === "secondary"
      ? "#E5E7EB"
      : variant === "checkin"
      ? "rgba(3, 157, 244, 0.8)"
      : "transparent";
      

  const textColor =
    variant === "outline"
      ? "#1146B5"
      : variant === "secondary"
      ? "#111827"
      : "#FFFFFF";

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={
        disabled || loading
      }
      onPress={onPress}
      style={[
        styles.button,

        {
          backgroundColor,

          borderWidth:
            variant === "outline"
              ? 1
              : 0,

          borderColor:
            "#1146B5",

          opacity: disabled
            ? 0.6
            : 1,

          width: fullWidth
            ? "100%"
            : undefined,
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={textColor}
        />
      ) : (
        <View style={styles.row}>
          {leftIcon}

          <Text
            style={[
              styles.text,

              {
                color: textColor,
              },
            ]}
          >
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles =
  StyleSheet.create({
    button: {
      height: 54,

      borderRadius: 14,

      justifyContent:
        "center",

      alignItems: "center",

      paddingHorizontal: 20,
    },

    row: {
      flexDirection: "row",

      alignItems: "center",

      gap: 8,
    },

    text: {
      fontSize: 16,

      fontWeight: "600",
    },
  });