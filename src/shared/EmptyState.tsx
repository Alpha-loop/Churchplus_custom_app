import {
  ReactNode,
} from "react";

import {
  StyleSheet,
  Text,
  View,
} from "react-native";

interface EmptyStateProps {
  title: string;

  description?: string;

  icon?: ReactNode;
}

export default function EmptyState({
  title,

  description,

  icon,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      {icon}

      <Text style={styles.title}>
        {title}
      </Text>

      {description ? (
        <Text
          style={
            styles.description
          }
        >
          {description}
        </Text>
      ) : null}
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,

      justifyContent:
        "center",

      alignItems: "center",

      padding: 24,
    },

    title: {
      fontSize: 18,

      fontWeight: "700",

      color: "#111827",

      marginTop: 16,
    },

    description: {
      fontSize: 14,

      color: "#6B7280",

      textAlign: "center",

      marginTop: 8,

      lineHeight: 22,
    },
  });