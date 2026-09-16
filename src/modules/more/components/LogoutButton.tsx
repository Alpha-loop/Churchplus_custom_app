import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  TouchableRipple,
} from "react-native-paper";

import {
  LogoutIcon,
} from "@/assets/img/icons";

interface Props {
  isLoggedIn: boolean;

  onPress: () => void;
}

export default function LogoutButton({
  isLoggedIn,
  onPress,
}: Props) {
  return (
    <TouchableRipple
      rippleColor="rgba(223,239,255,0.74)"
      onPress={onPress}
      style={styles.container}
    >
      <View style={styles.row}>
        <LogoutIcon size={20} color="#FE2034" />

        <Text style={styles.text}>
          {isLoggedIn
            ? "Logout"
            : "Login"}
        </Text>
      </View>
    </TouchableRipple>
  );
}

const styles =
  StyleSheet.create({
    container: {
      marginBottom: 50,
    },

    row: {
      flexDirection: "row",

      alignItems: "center",

      gap: 8,

      paddingVertical: 10,

      paddingLeft: 20,
    },

    text: {
      color: "#FE2034",

      fontSize: 14,
    },
  });