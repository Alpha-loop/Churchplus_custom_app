import {
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  Event,
  EventSummary,
} from "../types/event.types";

interface Props {
  event: EventSummary;
}

export default function EventSummaryCard({
  event,
}: Props) {
  return (
    <View
      style={
        styles.container
      }
    >
      <Image
        source={{
          uri:
            event.mediaUrl,
        }}
        style={
          styles.image
        }
      />

      <Text
        style={
          styles.title
        }
      >
        {event.title}
      </Text>

      <Text
        style={
          styles.date
        }
      >
        {event.date}
      </Text>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      alignItems:
        "center",
    },

    image: {
      width: 120,
      height: 130,
      borderRadius: 8,
    },

    title: {
      marginTop: 10,
      fontSize: 18,
      fontWeight:
        "700",
      color:
        "#041395",
      textAlign:
        "center",
    },

    date: {
      marginTop: 5,
      textAlign:
        "center",
      color:
        "#555",
    },
  });