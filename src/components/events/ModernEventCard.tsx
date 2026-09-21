import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Image } from "expo-image";

import {
  Calendar,
  CalendarPlus,
  Clock,
  MapPin,
} from "lucide-react-native";

import EventImagePlaceholder from "./EventImagePlaceholder";

import moment from "moment";

import { EventItem } from "@/modules/events/types/event.types";

import { useTheme } from "@/theme/ThemeContext";

interface Props {
  event: EventItem;

  onPress: () => void;

  onAddToCalendar: () => void;
}

export default function ModernEventCard({
  event,
  onPress,
  onAddToCalendar,
}: Props) {
  const { colors } = useTheme();

  const dateLabel =
    event.startDate
      ? moment(
          event.startDate
        ).format(
          "dddd, MMM D, YYYY"
        )
      : null;

  const timeLabel =
    event.startDate &&
    event.endDate
      ? `${moment(
          event.startDate
        ).format(
          "h:mm A"
        )} — ${moment(
          event.endDate
        ).format("h:mm A")}`
      : null;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}
    >
      {event.primaryImageUrl ? (
        <Image
              cachePolicy="memory-disk"
          source={{
            uri: event.primaryImageUrl,
          }}
          style={styles.image}
        />
      ) : (
        <EventImagePlaceholder
          height={180}
          style={styles.image}
        />
      )}

      <View style={styles.body}>
        <View
          style={styles.tagRow}
        >
          <View
            style={styles.tags}
          >
            {event.isRegistrationEnabled ? (
              <View
                style={[
                  styles.tag,
                  { backgroundColor: colors.dangerMuted },
                ]}
              >
                <Text
                  style={[
                    styles.tagText,
                    { color: colors.danger },
                  ]}
                >
                  Registration
                  Required
                </Text>
              </View>
            ) : null}

            {event.eventTypeName ? (
              <View
                style={[
                  styles.tag,
                  { backgroundColor: colors.primaryMuted },
                ]}
              >
                <Text
                  style={[
                    styles.tagText,
                    { color: colors.primary },
                  ]}
                >
                  {
                    event.eventTypeName
                  }
                </Text>
              </View>
            ) : null}
          </View>

          <TouchableOpacity
            onPress={
              onAddToCalendar
            }
            hitSlop={8}
          >
            <CalendarPlus
              size={20}
              color={colors.textMuted}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPress}
        >
          <Text
            style={[
              styles.title,
              { color: colors.textPrimary },
            ]}
          >
            {event.name}
          </Text>

          {dateLabel ? (
            <View
              style={styles.row}
            >
              <Calendar
                size={14}
                color={colors.textMuted}
              />

              <Text
                style={[
                  styles.rowText,
                  { color: colors.textSecondary },
                ]}
              >
                {dateLabel}
              </Text>
            </View>
          ) : null}

          {timeLabel ? (
            <View
              style={styles.row}
            >
              <Clock
                size={14}
                color={colors.textMuted}
              />

              <Text
                style={[
                  styles.rowText,
                  { color: colors.textSecondary },
                ]}
              >
                {timeLabel}
              </Text>
            </View>
          ) : null}

          {event.venueDisplayName ? (
            <View
              style={styles.row}
            >
              <MapPin
                size={14}
                color={colors.textMuted}
              />

              <Text
                style={[
                  styles.rowText,
                  { color: colors.textSecondary },
                ]}
              >
                {
                  event.venueDisplayName
                }
              </Text>
            </View>
          ) : null}
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onPress}
          style={[
            styles.cta,
            { backgroundColor: colors.primary },
          ]}
        >
          <Text
            style={
              styles.ctaText
            }
          >
            {event.isRegistrationEnabled
              ? "REGISTER"
              : "VIEW EVENT"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,

    overflow: "hidden",

    marginBottom: 18,

    borderWidth: 1,
  },

  image: {
    width: "100%",

    height: 180,
  },

  body: {
    padding: 14,
  },

  tagRow: {
    flexDirection: "row",

    justifyContent:
      "space-between",

    alignItems: "flex-start",

    marginBottom: 10,
  },

  tags: {
    flexDirection: "row",

    flexWrap: "wrap",

    gap: 6,

    flex: 1,

    marginRight: 10,
  },

  tag: {
    borderRadius: 8,

    paddingHorizontal: 10,

    paddingVertical: 5,
  },

  tagText: {
    fontSize: 11,

    fontWeight: "600",
  },

  title: {
    fontSize: 16,

    fontWeight: "700",

    marginBottom: 8,
  },

  row: {
    flexDirection: "row",

    alignItems: "center",

    gap: 8,

    marginBottom: 4,
  },

  rowText: {
    fontSize: 13,
  },

  cta: {
    borderRadius: 22,

    paddingVertical: 13,

    alignItems: "center",

    marginTop: 14,
  },

  ctaText: {
    color: "#FFFFFF",

    fontWeight: "700",

    fontSize: 13,

    letterSpacing: 0.5,
  },
});