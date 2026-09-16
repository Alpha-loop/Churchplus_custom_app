import {
  ReactNode,
} from "react";

import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

interface AppCardProps {
  children: ReactNode;

  padding?: number;

  style?: StyleProp<ViewStyle>;
}

export default function AppCard({
  children,

  padding = 16,

  style,
}: AppCardProps) {
  return (
    <View
      style={[
        styles.card,

        {
          padding,
        },

        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles =
  StyleSheet.create({
    card: {
      backgroundColor:
        "#FFFFFF",

      borderRadius: 20,

      shadowColor: "#000",

      shadowOffset: {
        width: 0,
        height: 2,
      },

      shadowOpacity: 0.08,

      shadowRadius: 8,

      elevation: 3,
    },
  });