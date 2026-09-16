import {
  View,
  StyleSheet,
} from "react-native";

import {
  Button,
} from "react-native-paper";

interface AuthPromptProps {
  navigation: any;
}

export default function AuthPrompt({
  navigation,
}: AuthPromptProps) {
  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        onPress={() =>
          navigation.navigate(
            "Login"
          )
        }
      >
        Login
      </Button>

      <Button
        mode="outlined"
        onPress={() =>
          navigation.navigate(
            "Register"
          )
        }
      >
        Signup
      </Button>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flexDirection: "row",

      gap: 12,

      justifyContent:
        "center",

      alignItems: "center",

      flex: 1,
    },
  });