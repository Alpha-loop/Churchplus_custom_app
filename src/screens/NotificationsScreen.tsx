import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  ChevronLeft,
  Bell,
} from "lucide-react-native";

import useNotifications from "@/modules/social/hooks/useNotifications";

import useCommunityFeed from "@/modules/home/hooks/useCommunityFeed";

import { formatDevotionalDate } from "../screenUtils/formatDevotionalDate";

import { useTheme } from "@/theme/ThemeContext";

const getInitial = (
  name?: string
) =>
  name?.trim()?.[0]?.toUpperCase() ||
  "?";

export default function ModernNotificationsScreen({
  navigation,
}: any) {
  const { colors } = useTheme();

  const {
    loading: requestsLoading,
    requests,
    approve,
    decline,
    refresh: refreshRequests,
  } = useNotifications();

  const {
    loading: feedLoading,
    feeds,
    onRefresh: refreshFeed,
  } = useCommunityFeed();

  const loading =
    requestsLoading &&
    feedLoading;

  const onRefresh = async () => {
    await Promise.all([
      refreshRequests(),
      refreshFeed(),
    ]);
  };

  const announcements =
    feeds.filter(
      (item: any) =>
        item._source === "admin"
    );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <View
        style={[
          styles.topBar,
          { backgroundColor: colors.surface },
        ]}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.goBack()
          }
          hitSlop={8}
        >
          <ChevronLeft
            size={22}
            color={colors.textPrimary}
          />
        </TouchableOpacity>

        <Text
          style={[
            styles.topBarTitle,
            { color: colors.textPrimary },
          ]}
        >
          Notifications
        </Text>

        <View
          style={{ width: 22 }}
        />
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={{
            marginTop: 24,
          }}
        />
      ) : (
        <ScrollView
          contentContainerStyle={{
            padding: 16,
          }}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={
                onRefresh
              }
            />
          }
        >
          {requests.length >
          0 ? (
            <>
              <Text
                style={[
                  styles.sectionTitle,
                  { color: colors.textPrimary },
                ]}
              >
                New Requests
              </Text>

              {requests.map(
                (
                  item: any,
                  index: number
                ) => (
                  <View
                    key={
                      item.friendRequesterID ??
                      index
                    }
                    style={[
                      styles.requestCard,
                      { backgroundColor: colors.surface },
                    ]}
                  >
                    <TouchableOpacity
                      activeOpacity={0.85}
                      onPress={() =>
                        navigation.navigate(
                          "ConnectionProfile",
                          {
                            id: item
                              ?.friendRequester
                              ?.id,
                          }
                        )
                      }
                      style={
                        styles.requestHeader
                      }
                    >
                      {item
                        ?.friendRequester
                        ?.pictureUrl ? (
                        <Image
                          source={{
                            uri: item
                              .friendRequester
                              .pictureUrl,
                          }}
                          style={
                            styles.avatar
                          }
                        />
                      ) : (
                        <View
                          style={[
                            styles.avatar,
                            styles.avatarPlaceholder,
                            { backgroundColor: colors.primary },
                          ]}
                        >
                          <Text
                            style={
                              styles.avatarText
                            }
                          >
                            {getInitial(
                              item
                                ?.friendRequester
                                ?.name
                            )}
                          </Text>
                        </View>
                      )}

                      <Text
                        style={[
                          styles.requestName,
                          { color: colors.textPrimary },
                        ]}
                      >
                        {item
                          ?.friendRequester
                          ?.name ||
                          "Member"}
                      </Text>
                    </TouchableOpacity>

                    <View
                      style={
                        styles.requestActions
                      }
                    >
                      <TouchableOpacity
                        activeOpacity={0.85}
                        onPress={() =>
                          decline(
                            item
                          )
                        }
                        style={[
                          styles.declineButton,
                          { backgroundColor: colors.surfaceAlt },
                        ]}
                      >
                        <Text
                          style={[
                            styles.declineText,
                            { color: colors.textSecondary },
                          ]}
                        >
                          Decline
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        activeOpacity={0.85}
                        onPress={() =>
                          approve(
                            item
                          )
                        }
                        style={[
                          styles.acceptButton,
                          { backgroundColor: colors.primary },
                        ]}
                      >
                        <Text
                          style={
                            styles.acceptText
                          }
                        >
                          Accept
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              )}
            </>
          ) : null}

          <Text
            style={[
              styles.sectionTitle,
              {
                color: colors.textPrimary,
                marginTop:
                  requests.length >
                  0
                    ? 24
                    : 0,
              },
            ]}
          >
            Announcements
          </Text>

          {announcements.length >
          0 ? (
            announcements.map(
              (
                item: any,
                index: number
              ) => (
                <TouchableOpacity
                  key={
                    item.postId ??
                    index
                  }
                  activeOpacity={0.85}
                  onPress={() =>
                    navigation.navigate(
                      "FeedsDetail",
                      {
                        feed: item,
                      }
                    )
                  }
                  style={[
                    styles.announcementCard,
                    { backgroundColor: colors.surface },
                  ]}
                >
                  <View
                    style={[
                      styles.announcementIcon,
                      { backgroundColor: colors.primaryMuted },
                    ]}
                  >
                    <Bell
                      size={16}
                      color={colors.primary}
                    />
                  </View>

                  <View
                    style={{
                      flex: 1,
                    }}
                  >
                    <View
                      style={
                        styles.announcementHeaderRow
                      }
                    >
                      {item.postCategoryName ? (
                        <Text
                          style={[
                            styles.announcementLabel,
                            { color: colors.primary },
                          ]}
                        >
                          {item.postCategoryName.toUpperCase()}
                        </Text>
                      ) : null}

                      <Text
                        style={[
                          styles.announcementDate,
                          { color: colors.textMuted },
                        ]}
                      >
                        {formatDevotionalDate(
                          item.date
                        )}
                      </Text>
                    </View>

                    <Text
                      style={[
                        styles.announcementTitle,
                        { color: colors.textPrimary },
                      ]}
                    >
                      {item.title}
                    </Text>

                    <Text
                      style={[
                        styles.announcementBody,
                        { color: colors.textSecondary },
                      ]}
                      numberOfLines={2}
                    >
                      {item.content}
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            )
          ) : (
            <Text
              style={[
                styles.emptyText,
                { color: colors.textMuted },
              ]}
            >
              No announcements
              right now.
            </Text>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  topBar: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent:
      "space-between",

    paddingHorizontal: 16,

    paddingTop: 54,

    paddingBottom: 14,
  },

  topBarTitle: {
    fontSize: 16,

    fontWeight: "700",
  },

  sectionTitle: {
    fontSize: 17,

    fontWeight: "700",

    marginBottom: 12,
  },

  requestCard: {
    borderRadius: 14,

    padding: 14,

    marginBottom: 12,
  },

  requestHeader: {
    flexDirection: "row",

    alignItems: "center",

    gap: 12,
  },

  avatar: {
    width: 46,

    height: 46,

    borderRadius: 23,
  },

  avatarPlaceholder: {
    alignItems: "center",

    justifyContent: "center",
  },

  avatarText: {
    color: "#FFFFFF",

    fontWeight: "700",
  },

  requestName: {
    fontSize: 15,

    fontWeight: "700",
  },

  requestActions: {
    flexDirection: "row",

    gap: 10,

    marginTop: 14,
  },

  declineButton: {
    flex: 1,

    alignItems: "center",

    paddingVertical: 11,

    borderRadius: 20,
  },

  declineText: {
    fontSize: 13,

    fontWeight: "700",
  },

  acceptButton: {
    flex: 1,

    alignItems: "center",

    paddingVertical: 11,

    borderRadius: 20,
  },

  acceptText: {
    fontSize: 13,

    fontWeight: "700",

    color: "#FFFFFF",
  },

  announcementCard: {
    flexDirection: "row",

    gap: 12,

    borderRadius: 14,

    padding: 14,

    marginBottom: 12,
  },

  announcementIcon: {
    width: 34,

    height: 34,

    borderRadius: 17,

    alignItems: "center",

    justifyContent: "center",
  },

  announcementHeaderRow: {
    flexDirection: "row",

    justifyContent:
      "space-between",

    marginBottom: 4,
  },

  announcementLabel: {
    fontSize: 10,

    fontWeight: "700",

    letterSpacing: 0.4,
  },

  announcementDate: {
    fontSize: 11,
  },

  announcementTitle: {
    fontSize: 14,

    fontWeight: "700",

    marginBottom: 4,
  },

  announcementBody: {
    fontSize: 13,

    lineHeight: 18,
  },

  emptyText: {
    fontSize: 13,

    textAlign: "center",

    marginTop: 20,
  },
});