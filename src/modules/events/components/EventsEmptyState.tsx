import {
  View,
  Text,
} from "react-native";

export default function EventsEmptyState() {
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
          fontSize: 20,
          fontWeight:
            "800",
        }}
      >
        No Event
      </Text>

      <Text>
        Check back later
        to see upcoming
        events.
      </Text>
    </View>
  );
}