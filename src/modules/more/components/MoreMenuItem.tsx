import { ReactNode } from "react";

import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  TouchableRipple,
} from "react-native-paper";

interface Props {
  icon: ReactNode;

  title: string;

  onPress: () => void;
}

export default function MoreMenuItem({
  icon,
  title,
  onPress,
}: Props) {
  return (
    <TouchableRipple
      rippleColor="rgba(223,239,255,0.74)"
      onPress={onPress}
    >
      <View style={styles.container}>
        {icon}

        <Text style={styles.title}>
          {title}
        </Text>
      </View>
    </TouchableRipple>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flexDirection: "row",

      alignItems: "center",

      gap: 10,

      paddingVertical: 10,

      paddingLeft: 20,
    },

    title: {
      fontSize: 14,

      color: "#000",
    },
  });