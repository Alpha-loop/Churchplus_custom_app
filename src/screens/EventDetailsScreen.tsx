import {
  Alert,
  Image,
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  ChevronLeft,
  Share2,
  Calendar,
  Clock,
  MapPin,
  QrCode,
} from "lucide-react-native";

import moment from "moment";

import EventImagePlaceholder from "../components/events/EventImagePlaceholder";

import useRequireAuth from "@/modules/auth/hooks/useRequireAuth";

import { useTheme } from "@/theme/ThemeContext";

export default function ModernEventDetailsScreen({
  navigation,
  route,
}: any) {
  const { colors } = useTheme();

  const { event } =
    route.params;

  const { requireAuth } =
    useRequireAuth();

  const isUpcoming =
    event.startDate
      ? moment(
          event.startDate
        ).isAfter(moment())
      : false;

  const dateLabel =
    event.startDate
      ? moment(
          event.startDate
        ).format(
          "MMM D, YYYY"
        )
      : null;

  const timeLabel =
    event.startDate
      ? moment(
          event.startDate
        ).format("h:mm A")
      : null;

  const onRegister = () =>
    requireAuth(
      () =>
        Alert.alert(
          "Coming Soon",
          "Registering for events isn't available yet."
        ),
      {
        message:
          "Sign in to register for this event.",
      }
    );

  const onCheckIn = () =>
    requireAuth(
      () =>
        navigation.navigate(
          "EventQRScanner"
        ),
      {
        message:
          "Sign in to check in to this event.",
      }
    );

  const onShare = async () => {
    try {
      await Share.share({
        title: event.name,

        message: `${
          event.name
        }${
          dateLabel
            ? ` — ${dateLabel}`
            : ""
        }`,
      });
    } catch (error) {
      console.log(
        "EVENT SHARE ERROR:",
        error
      );
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      {/* Hero always sits on a photo or the branded placeholder,
          so this stays light-content regardless of theme —
          same reasoning as the dark overlay badges elsewhere. */}
      <StatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
      >
        <View
          style={
            styles.heroWrap
          }
        >
          {event.primaryImageUrl ? (
            <Image
              source={{
                uri: event.primaryImageUrl,
              }}
              style={
                styles.hero
              }
            />
          ) : (
            <EventImagePlaceholder
              height={220}
            />
          )}

          <View
            style={
              styles.heroTopRow
            }
          >
            <TouchableOpacity
              onPress={() =>
                navigation.goBack()
              }
              style={
                styles.heroIconButton
              }
            >
              <ChevronLeft
                size={20}
                color="#FFFFFF"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={
                onShare
              }
              style={
                styles.heroIconButton
              }
            >
              <Share2
                size={18}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={
            styles.content
          }
        >
          {isUpcoming ? (
            <View
              style={
                styles.badgeRow
              }
            >
              <View
                style={[
                  styles.badgeDot,
                  { backgroundColor: colors.primary },
                ]}
              />

              <Text
                style={[
                  styles.badgeText,
                  { color: colors.primary },
                ]}
              >
                UPCOMING EVENT
              </Text>
            </View>
          ) : null}

          <Text
            style={[
              styles.title,
              { color: colors.textPrimary },
            ]}
          >
            {event.name}
          </Text>

          <View
            style={
              styles.infoRow
            }
          >
            {dateLabel ? (
              <View
                style={[
                  styles.infoCard,
                  { flex: 1, backgroundColor: colors.surfaceAlt },
                ]}
              >
                <Calendar
                  size={16}
                  color={colors.primary}
                />

                <Text
                  style={[
                    styles.infoLabel,
                    { color: colors.textMuted },
                  ]}
                >
                  DATE
                </Text>

                <Text
                  style={[
                    styles.infoValue,
                    { color: colors.textPrimary },
                  ]}
                >
                  {dateLabel}
                </Text>
              </View>
            ) : null}

            {timeLabel ? (
              <View
                style={[
                  styles.infoCard,
                  { flex: 1, backgroundColor: colors.surfaceAlt },
                ]}
              >
                <Clock
                  size={16}
                  color={colors.primary}
                />

                <Text
                  style={[
                    styles.infoLabel,
                    { color: colors.textMuted },
                  ]}
                >
                  TIME
                </Text>

                <Text
                  style={[
                    styles.infoValue,
                    { color: colors.textPrimary },
                  ]}
                >
                  {timeLabel}
                </Text>
              </View>
            ) : null}
          </View>

          {event.venueDisplayName ? (
            <View
              style={[
                styles.infoCard,
                { backgroundColor: colors.surfaceAlt },
              ]}
            >
              <MapPin
                size={16}
                color={colors.primary}
              />

              <Text
                style={[
                  styles.infoLabel,
                  { color: colors.textMuted },
                ]}
              >
                LOCATION
              </Text>

              <Text
                style={[
                  styles.infoValue,
                  { color: colors.textPrimary },
                ]}
              >
                {
                  event.venueDisplayName
                }
              </Text>
            </View>
          ) : null}

          {event.summary ? (
            <>
              <Text
                style={[
                  styles.sectionTitle,
                  { color: colors.textPrimary },
                ]}
              >
                About the Event
              </Text>

              <Text
                style={[
                  styles.summary,
                  { color: colors.textSecondary },
                ]}
              >
                {event.summary}
              </Text>
            </>
          ) : null}

          {event.isRegistrationEnabled ? (
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={
                onRegister
              }
              style={[
                styles.registerButton,
                { backgroundColor: colors.primary },
              ]}
            >
              <Text
                style={
                  styles.registerText
                }
              >
                REGISTER NOW
              </Text>
            </TouchableOpacity>
          ) : null}

          <Text
            style={[
              styles.sectionTitle,
              {
                marginTop: 28,
                color: colors.textPrimary,
              },
            ]}
          >
            Event Check-in
          </Text>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={
              onCheckIn
            }
            style={[
              styles.checkinCard,
              { backgroundColor: colors.surfaceAlt },
            ]}
          >
            <View
              style={[
                styles.checkinIcon,
                { backgroundColor: colors.primaryMuted },
              ]}
            >
              <QrCode
                size={20}
                color={colors.primary}
              />
            </View>

            <View
              style={{
                flex: 1,
              }}
            >
              <Text
                style={[
                  styles.checkinTitle,
                  { color: colors.textPrimary },
                ]}
              >
                Scan to Check In
              </Text>

              <Text
                style={[
                  styles.checkinSubtitle,
                  { color: colors.textMuted },
                ]}
              >
                Scan the code posted
                at the venue when
                you arrive
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  heroWrap: {
    position: "relative",
  },

  hero: {
    width: "100%",

    height: 220,
  },

  heroTopRow: {
    position: "absolute",

    top: 54,

    left: 16,

    right: 16,

    flexDirection: "row",

    justifyContent:
      "space-between",
  },

  heroIconButton: {
    width: 36,

    height: 36,

    borderRadius: 18,

    backgroundColor: "rgba(0,0,0,0.4)",

    alignItems: "center",

    justifyContent: "center",
  },

  content: {
    padding: 16,
  },

  badgeRow: {
    flexDirection: "row",

    alignItems: "center",

    gap: 6,

    marginBottom: 8,
  },

  badgeDot: {
    width: 8,

    height: 8,

    borderRadius: 4,
  },

  badgeText: {
    fontSize: 11,

    fontWeight: "700",

    letterSpacing: 0.4,
  },

  title: {
    fontSize: 22,

    fontWeight: "800",

    marginBottom: 16,
  },

  infoRow: {
    flexDirection: "row",

    gap: 10,

    marginBottom: 10,
  },

  infoCard: {
    borderRadius: 14,

    padding: 12,

    marginBottom: 10,
  },

  infoLabel: {
    fontSize: 10,

    fontWeight: "700",

    letterSpacing: 0.4,

    marginTop: 8,
  },

  infoValue: {
    fontSize: 14,

    fontWeight: "700",

    marginTop: 2,
  },

  sectionTitle: {
    fontSize: 16,

    fontWeight: "700",

    marginTop: 10,

    marginBottom: 8,
  },

  summary: {
    fontSize: 14,

    lineHeight: 21,
  },

  registerButton: {
    borderRadius: 24,

    paddingVertical: 15,

    alignItems: "center",

    marginTop: 20,
  },

  registerText: {
    color: "#FFFFFF",

    fontWeight: "700",

    fontSize: 14,

    letterSpacing: 0.4,
  },

  checkinCard: {
    flexDirection: "row",

    alignItems: "center",

    gap: 12,

    borderRadius: 14,

    padding: 14,
  },

  checkinIcon: {
    width: 40,

    height: 40,

    borderRadius: 20,

    alignItems: "center",

    justifyContent: "center",
  },

  checkinTitle: {
    fontSize: 14,

    fontWeight: "700",
  },

  checkinSubtitle: {
    fontSize: 12,

    marginTop: 2,
  },
});