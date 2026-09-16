import {
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface Props {
  gifSource: any;
}

export default function CheckinSuccessContent({
  gifSource,
}: Props) {
  return (
    <View style={styles.container}>
      <Image
        source={gifSource}
        resizeMode="contain"
        style={styles.image}
      />

      <Text style={styles.text}>
        Your Check-in was
      </Text>

      <Text style={styles.text}>
        Successful
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
    },

    image: {
      width: 100,
      height: 100,
      marginBottom: 20,
    },

    text: {
      fontSize: 18,
      fontWeight: "600",
      color:
        "rgba(0,0,0,0.8)",
      textAlign:
        "center",
    },
  });