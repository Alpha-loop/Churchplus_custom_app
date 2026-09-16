import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import {
  Event,
} from "../types/event.types";

import moment from "moment";

interface Props {
  event: Event;
}

export default function EventInfoCard({
  event,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {event.name}
      </Text>

      <Text style={styles.description}>
        {event.summary}
      </Text>

      <View style={styles.row}>
        <View>
          <Text style={styles.label}>
            Group
          </Text>

          {/* <Text style={styles.value}>
            {event.fullGroupName}
          </Text> */}
        </View>

        <View>
          <Text style={styles.label}>
            Date
          </Text>

          <Text style={styles.value}>
            {event.startDate
            ? moment(
                event.startDate
              ).format(
                "MMM DD YYYY"
              )
            : "Date TBA"}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      padding: 20,
    },

    title: {
      fontSize: 18,
      fontWeight: "700",
      color: "#000",
    },

    description: {
      marginTop: 10,
      color: "#666",
      lineHeight: 22,
    },

    row: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      marginTop: 30,
    },

    label: {
      color: "#777",
      fontSize: 13,
    },

    value: {
      marginTop: 4,
      fontSize: 15,
      fontWeight: "600",
    },
  });