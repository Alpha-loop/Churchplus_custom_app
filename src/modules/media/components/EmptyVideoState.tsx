import {
  Text,
  View,
} from "react-native";

export default function EmptyVideoState() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent:
          "center",
        alignItems:
          "center",
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "700",
        }}
      >
        Oops! 😔
      </Text>

      <Text>
        No livestream yet,
        check back later.
      </Text>
    </View>
  );
}