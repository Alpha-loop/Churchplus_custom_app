import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import {
  CalendarCheck,
} from "@/assets/img/icons";

import moment from "moment";

import {
  Event,
} from "../types/event.types";
import { ChevronRight } from "lucide-react-native";

interface Props {
  event: Event;

  onPress: (
    event: Event
  ) => void;
}

export default function EventCard({
  event,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      onPress={() =>
        onPress(event)
      }
      style={
        styles.container
      }
    >
      <View style={
        {
          flexDirection: "row",
          justifyContent: "space-between",
        }
      }>
        <View>
          <View
            style={
              styles.dayRow
            }
          >
            <CalendarCheck
              size={13}
              color="black"
            />

            <Text>
              {event.startDate
                ? moment(
                    event.startDate
                  ).format(
                    "dddd"
                  )
                : "Date TBA"}
            </Text>
          </View>

          <Text
            style={
              styles.title
            }
          >
            {event.name}
          </Text>
        </View>

        <View>
          <ChevronRight />
        </View>
      </View>

      {/* <Text
        numberOfLines={2}
        style={{
          marginTop: 10,
          color: "#666",
        }}
      >
        {event.summary ||
          "Event details coming soon"}
      </Text> */}

      <View
        style={
          styles.bottomRow
        }
      >
        <View>
          <Text
            style={
              styles.label
            }
          >
            Venue
          </Text>

          <Text
            style={
              styles.value
            }
          >
            {event.venueDisplayName ||
              "TBA"}
          </Text>
        </View>

        <View>
          <Text
            style={
              styles.label
            }
          >
            Date
          </Text>

          <Text
            style={
              styles.value
            }
          >
            {event.startDate
              ? moment(
                  event.startDate
                ).format(
                  "DD MMM YYYY"
                )
              : "TBA"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles =
  StyleSheet.create({
    container: {
      backgroundColor:
        "#FFF",

      padding: 20,

      borderRadius: 12,

      marginBottom: 12,
    },

    dayRow: {
      flexDirection:
        "row",

      alignItems:
        "center",

      gap: 6,
    },

    title: {
      fontSize: 17,

      fontWeight:
        "700",

      marginTop: 10,
    },

    bottomRow: {
      flexDirection:
        "row",

      justifyContent:
        "space-between",

      marginTop: 15,
    },

    label: {
      color: "#777",
    },

    value: {
      fontWeight:
        "600",
    },
  });