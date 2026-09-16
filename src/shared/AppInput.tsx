import {
  ReactNode,
} from "react";

import {
  StyleProp,
  ViewStyle,
} from "react-native";

import {
  TextInput,
} from "react-native-paper";

import {
  Eye,
  EyeOff,
} from "lucide-react-native";

interface AppInputProps {
  value: string;

  placeholder?: string;

  onChangeText?: (
    text: string
  ) => void;

  secureTextEntry?: boolean;

  disabled?: boolean;

  style?: StyleProp<ViewStyle>;

  outlineStyle?: StyleProp<ViewStyle>;

  leftIcon?: ReactNode;

  rightIcon?: ReactNode;

  onRightIconPress?: () => void;

  noOutline?: boolean;

  multiline?: boolean;

    numberOfLines?: number;

    textAlignVertical?:
    | "top"
    | "center"
    | "bottom";

  variant?:
    | "classic"
    | "modern";
}

export default function AppInput({
  value,

  placeholder,

  onChangeText,

  secureTextEntry,

  disabled,

  style,

  outlineStyle,

  leftIcon,

  rightIcon,

  onRightIconPress,

  noOutline,

  multiline = false,

    numberOfLines = 1,

    textAlignVertical = "top",

  variant = "classic",
}: AppInputProps) {
  const primaryColor =
    variant === "modern"
      ? "#2553D7"
      : "#1146B5";

  return (
    <TextInput
      value={value}
      mode="outlined"
      onChangeText={
        onChangeText
      }
      disabled={disabled}
      secureTextEntry={
        secureTextEntry
      }
      placeholder={placeholder}
      activeOutlineColor={
        primaryColor
      }
      outlineColor={
        noOutline
          ? "transparent"
          : "rgba(0,0,0,0.2)"
      }
      multiline={multiline}

        numberOfLines={
        multiline
            ? numberOfLines
            : 1
        }

        contentStyle={{
          textAlignVertical: multiline ? "top" : "center",
          paddingVertical: 10,
        }}
      textColor="rgba(0,0,0,0.75)"
      placeholderTextColor="rgba(0,0,0,0.45)"
      selectionColor={
        primaryColor
      }
      dense
      left={
        leftIcon ? (
          <TextInput.Icon
            icon={() =>
              leftIcon
            }
          />
        ) : undefined
      }
      right={
        rightIcon ? (
          <TextInput.Icon
            icon={() =>
              rightIcon
            }
            onPress={
              onRightIconPress
            }
          />
        ) : undefined
      }
      outlineStyle={[
        {
          borderRadius: 14,

          borderWidth: 1,
        },

        outlineStyle,
      ]}
      style={[
        {
          width: "100%",

          backgroundColor:
            "white",
          minHeight: multiline ? 120 : 36,
        },

        style,
      ]}
    />
  );
}