import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  MapPin,
  UserPlus,
  ChevronRight,
  Users,
} from "lucide-react-native";

import useMeetupDiscovery from "@/modules/social/hooks/useMeetupDiscovery";

import { useTheme } from "@/theme/ThemeContext";

function PersonPhoto({
  photo,
  placeholderColor,
}: {
  photo?: string;
  placeholderColor: string;
}) {
  return photo ? (
    <Image
      source={{ uri: photo }}
      style={styles.photo}
    />
  ) : (
    <View
      style={[
        styles.photo,
        { backgroundColor: placeholderColor },
      ]}
    />
  );
}

export default function ModernSocialsScreen() {
  const { colors } = useTheme();

  const {
    loading,
    current,
    upcoming,
    hasMore,
    skip,
    sendRequest,
  } =
    useMeetupDiscovery();

  if (loading) {
    return (
      <View
        style={[
          styles.centerWrap,
          { backgroundColor: colors.background },
        ]}
      >
        <ActivityIndicator
          size="large"
          color={colors.primary}
        />
      </View>
    );
  }

  if (!hasMore || !current) {
    return (
      <View
        style={[
          styles.centerWrap,
          { backgroundColor: colors.background },
        ]}
      >
        <Text
          style={[
            styles.emptyText,
            { color: colors.textMuted },
          ]}
        >
          No more members to
          show right now —
          check back soon.
        </Text>
      </View>
    );
  }

  const alreadyRequested =
    Boolean(
      current.friendshipRequest
    ) &&
    current.friendshipRequest !==
      "None";

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      {upcoming.length > 0 ? (
        <View
          style={[
            styles.countBadge,
            { backgroundColor: colors.primaryMuted },
          ]}
        >
          <Users
            size={13}
            color={colors.primary}
          />

          <Text
            style={[
              styles.countBadgeText,
              { color: colors.primary },
            ]}
          >
            {upcoming.length}{" "}
            more{" "}
            {upcoming.length === 1
              ? "member"
              : "members"}{" "}
            to explore
          </Text>
        </View>
      ) : null}

      <View
        style={
          styles.cardStack
        }
      >
        {upcoming
          .slice()
          .reverse()
          .map((item, i) => {
            const depthFromFront =
              upcoming.length -
              i;

            return (
              <View
                key={
                  item.id ??
                  i
                }
                style={[
                  styles.peekCard,
                  { backgroundColor: colors.placeholder },
                  {
                    transform: [
                      {
                        scale:
                          1 -
                          depthFromFront *
                            0.05,
                      },

                      {
                        translateY:
                          depthFromFront *
                          14,
                      },
                    ],

                    opacity:
                      1 -
                      depthFromFront *
                        0.28,
                  },
                ]}
              >
                <PersonPhoto
                  photo={
                    item.photo
                  }
                  placeholderColor={colors.placeholder}
                />
              </View>
            );
          })}

        <View
          style={[
            styles.card,
            { backgroundColor: colors.placeholder },
          ]}
        >
          <PersonPhoto
            photo={
              current.photo
            }
            placeholderColor={colors.placeholder}
          />

          {/* Overlays the person's photo — white text on a dark
              overlay stays correct regardless of theme. */}
          <View
            style={
              styles.overlay
            }
          >
            <Text
              style={
                styles.name
              }
              numberOfLines={1}
            >
              {current.fullName}
            </Text>

            {current.address ? (
              <View
                style={
                  styles.locationRow
                }
              >
                <MapPin
                  size={14}
                  color="rgba(255,255,255,0.85)"
                />

                <Text
                  style={
                    styles.locationText
                  }
                  numberOfLines={1}
                >
                  {
                    current.address
                  }
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </View>

      <View
        style={
          styles.actionsRow
        }
      >
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={skip}
          style={[
            styles.skipButton,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <ChevronRight
            size={18}
            color={colors.textSecondary}
          />

          <Text
            style={[
              styles.skipText,
              { color: colors.textSecondary },
            ]}
          >
            Next
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.85}
          disabled={
            alreadyRequested
          }
          onPress={
            sendRequest
          }
          style={[
            styles.requestButton,
            { backgroundColor: colors.primary },
            alreadyRequested &&
              styles.requestButtonDisabled,
          ]}
        >
          <UserPlus
            size={18}
            color="#FFFFFF"
          />

          <Text
            style={
              styles.requestText
            }
          >
            {alreadyRequested
              ? "Request Sent"
              : "Send Friend Request"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 16,
  },

  centerWrap: {
    flex: 1,

    alignItems: "center",

    justifyContent: "center",

    padding: 24,
  },

  emptyText: {
    fontSize: 14,

    textAlign: "center",
  },

  countBadge: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    gap: 6,

    alignSelf: "center",

    borderRadius: 20,

    paddingHorizontal: 14,

    paddingVertical: 7,

    marginBottom: 14,
  },

  countBadgeText: {
    fontSize: 12,

    fontWeight: "700",
  },

  cardStack: {
    flex: 1,
  },

  card: {
    flex: 1,

    borderRadius: 20,

    overflow: "hidden",
  },

  peekCard: {
    position: "absolute",

    top: 0,

    left: 0,

    right: 0,

    bottom: 0,

    borderRadius: 20,

    overflow: "hidden",
  },

  photo: {
    width: "100%",

    height: "100%",
  },

  overlay: {
    position: "absolute",

    bottom: 0,

    left: 0,

    right: 0,

    padding: 20,

    backgroundColor: "rgba(0,0,0,0.4)",
  },

  name: {
    fontSize: 22,

    fontWeight: "800",

    color: "#FFFFFF",
  },

  locationRow: {
    flexDirection: "row",

    alignItems: "center",

    gap: 6,

    marginTop: 6,
  },

  locationText: {
    fontSize: 13,

    color: "rgba(255,255,255,0.85)",

    flex: 1,
  },

  actionsRow: {
    flexDirection: "row",

    gap: 10,

    marginTop: 16,
  },

  skipButton: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    gap: 6,

    borderRadius: 24,

    paddingVertical: 14,

    paddingHorizontal: 20,

    borderWidth: 1,
  },

  skipText: {
    fontSize: 14,

    fontWeight: "700",
  },

  requestButton: {
    flex: 1,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    gap: 8,

    borderRadius: 24,

    paddingVertical: 14,
  },

  requestButtonDisabled: {
    opacity: 0.5,
  },

  requestText: {
    fontSize: 14,

    fontWeight: "700",

    color: "#FFFFFF",
  },
});