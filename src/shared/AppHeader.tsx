import { ReactNode } from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";

import {
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import {
  ChevronLeft,
} from "lucide-react-native";

interface AppHeaderProps {
  title: string;

  onBackPress?: () => void;

  rightComponent?: ReactNode;

  backgroundColor?: string;

  textColor?: string;

  variant?: "classic" | "modern";

  textAlign?: "left" | "center" | "right";

  position?: string,

  left?: number
}

export default function AppHeader({
  title,
  onBackPress,
  rightComponent,
  backgroundColor,
  textColor = "#FFFFFF",
  variant = "classic",
  // textAlign = "center",
  position,
  left
}: AppHeaderProps) {
  const insets =
    useSafeAreaInsets();

  const primaryColor =
    backgroundColor ??
    (variant === "modern"
      ? "#2553D7"
      : "#1146B5");
    
  const platform = Platform.OS;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            primaryColor,

          paddingTop:
            insets.top,
        },
      ]}
    >
      <View style={styles.content}>
        {onBackPress && (
          <TouchableOpacity
            onPress={
              onBackPress
            }
            style={
              styles.backButton
            }
          >
            <ChevronLeft
              size={28}
              color={textColor}
            />
          </TouchableOpacity>
        )}

        <Text
          style={
            {
              color: textColor,
              // textAlign: textAlign,

              fontSize: 20,

              fontWeight: "700",

              
              

            }
          }
        >
          {title}
        </Text>

        {rightComponent && (
          <View
            style={
              styles.rightContainer
            }
          >
            {rightComponent}
          </View>
        )}
      </View>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      minHeight: Platform.OS === "ios" ? 110 : 90,

      justifyContent:
        "flex-end",

      paddingBottom: 20,

      paddingHorizontal: 10,
    },

    content: {
      flex: 1,

      justifyContent: "center",

      alignItems: "center",

      position: "relative",
    },

    backButton: {
      position: "absolute",

      left:1,
    },

    rightContainer: {
      position: "absolute",

      right: 24,
    },

    // title: {
      

    //   // textAlign: 'left',
    // },
});