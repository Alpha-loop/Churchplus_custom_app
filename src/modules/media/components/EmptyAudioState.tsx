import {
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function EmptyAudioState() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        No audio yet
      </Text>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,

      justifyContent:
        "center",

      alignItems:
        "center",

      paddingVertical:
        50,
    },

    text: {
      fontSize: 15,

      fontWeight:
        "700",
    },
  });