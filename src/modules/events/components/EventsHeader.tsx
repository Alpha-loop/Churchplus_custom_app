import {
  Text,
  View,
  StyleSheet,
} from "react-native";

export default function EventsHeader() {
  return (
    <View>
      <Text
        style={
          styles.title
        }
      >
        Events
      </Text>

      <Text
        style={
          styles.subtitle
        }
      >
        Check in to any of
        the events below
        via QR code or
        location based
        check in.
      </Text>
    </View>
  );
}

const styles =
  StyleSheet.create({
    title: {
      textAlign:
        "center",

      fontSize: 22,

      fontWeight:
        "800",
    },

    subtitle: {
      textAlign:
        "center",

      marginTop: 15,

      color:
        "#444",
    },
  });