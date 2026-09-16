import { useMemo, useState } from "react";

import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  ChevronLeft,
  Search,
  SquarePen,
} from "lucide-react-native";

import useMessages from "@/modules/social/hooks/useMessages";

import { useAuthStore } from "@/store/authStore";

import { useTheme } from "@/theme/ThemeContext";

export default function ModernMessagesScreen({
  navigation,
}: any) {
  const { colors } = useTheme();

  const {
    loading,
    messages,
    refresh,
  } = useMessages();

  const currentUserId =
    useAuthStore(
      state => state.user?.userId
    );

  const [
    searchText,
    setSearchText,
  ] = useState("");

  const [
    unreadOnly,
    setUnreadOnly,
  ] = useState(false);

  const [
    refreshing,
    setRefreshing,
  ] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);

    await refresh();

    setRefreshing(false);
  };

  const getOtherUser = (
    item: any
  ) =>
    item?.sender?.id ===
    currentUserId
      ? item?.reciever
      : item?.sender;

  const filtered = useMemo(
    () =>
      messages.filter(
        (item: any) => {
          if (
            unreadOnly &&
            !(
              item.unreadMessages >
              0
            )
          ) {
            return false;
          }

          if (!searchText) {
            return true;
          }

          const otherUser =
            getOtherUser(item);

          return otherUser?.name
            ?.toLowerCase()
            .includes(
              searchText.toLowerCase()
            );
        }
      ),
    [
      messages,
      searchText,
      unreadOnly,
      currentUserId,
    ]
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
          Messages
        </Text>

        <View
          style={{ width: 22 }}
        />
      </View>

      <View
        style={styles.content}
      >
        <View
          style={[
            styles.searchWrap,
            { backgroundColor: colors.surface },
          ]}
        >
          <Search
            size={16}
            color={colors.textMuted}
          />

          <TextInput
            value={searchText}
            onChangeText={
              setSearchText
            }
            placeholder="Search messages or parishioners..."
            placeholderTextColor={colors.textMuted}
            style={[
              styles.searchInput,
              { color: colors.textPrimary },
            ]}
          />
        </View>

        <View
          style={
            styles.filterRow
          }
        >
          <TouchableOpacity
            onPress={() =>
              setUnreadOnly(
                false
              )
            }
            style={[
              styles.filterPill,
              {
                backgroundColor: !unreadOnly
                  ? colors.primary
                  : colors.surfaceAlt,
              },
            ]}
          >
            <Text
              style={[
                styles.filterText,
                {
                  color: !unreadOnly
                    ? "#FFFFFF"
                    : colors.textSecondary,
                },
              ]}
            >
              All
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              setUnreadOnly(
                true
              )
            }
            style={[
              styles.filterPill,
              {
                backgroundColor: unreadOnly
                  ? colors.primary
                  : colors.surfaceAlt,
              },
            ]}
          >
            <Text
              style={[
                styles.filterText,
                {
                  color: unreadOnly
                    ? "#FFFFFF"
                    : colors.textSecondary,
                },
              ]}
            >
              Unread
            </Text>
          </TouchableOpacity>
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
          <FlatList
            data={filtered}
            keyExtractor={(
              item,
              index
            ) =>
              item.id ??
              index.toString()
            }
            refreshControl={
              <RefreshControl
                refreshing={
                  refreshing
                }
                onRefresh={
                  onRefresh
                }
              />
            }
            contentContainerStyle={{
              paddingBottom: 100,
            }}
            ListEmptyComponent={
              <Text
                style={[
                  styles.emptyText,
                  { color: colors.textMuted },
                ]}
              >
                No conversations
                yet.
              </Text>
            }
            renderItem={({
              item,
            }) => {
              const otherUser =
                getOtherUser(
                  item
                );

              return (
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() =>
                    navigation.navigate(
                      "UserChat",
                      {
                        userId:
                          otherUser?.id,

                        name: otherUser?.name,
                      }
                    )
                  }
                  style={[
                    styles.row,
                    { backgroundColor: colors.surface },
                  ]}
                >
                  {otherUser?.pictureUrl ? (
                    <Image
                      source={{
                        uri: otherUser.pictureUrl,
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
                        {otherUser?.name
                          ?.trim()?.[0]
                          ?.toUpperCase() ||
                          "?"}
                      </Text>
                    </View>
                  )}

                  <View
                    style={
                      styles.rowBody
                    }
                  >
                    <Text
                      style={[
                        styles.name,
                        { color: colors.textPrimary },
                      ]}
                      numberOfLines={1}
                    >
                      {otherUser?.name ||
                        "Member"}
                    </Text>

                    <Text
                      style={[
                        styles.lastMessage,
                        { color: colors.textMuted },
                      ]}
                      numberOfLines={1}
                    >
                      {item?.messages
                        ?.text ||
                        "Start a conversation"}
                    </Text>
                  </View>

                  {item.unreadMessages >
                  0 ? (
                    <View
                      style={[
                        styles.badge,
                        { backgroundColor: colors.primary },
                      ]}
                    >
                      <Text
                        style={
                          styles.badgeText
                        }
                      >
                        {
                          item.unreadMessages
                        }
                      </Text>
                    </View>
                  ) : null}
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() =>
          navigation.navigate(
            "NewChat"
          )
        }
        style={[
          styles.newChatButton,
          { backgroundColor: colors.primary },
        ]}
      >
        <SquarePen
          size={16}
          color="#FFFFFF"
        />

        <Text
          style={
            styles.newChatText
          }
        >
          NEW CHAT
        </Text>
      </TouchableOpacity>
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

  content: {
    flex: 1,

    paddingHorizontal: 16,

    paddingTop: 14,
  },

  searchWrap: {
    flexDirection: "row",

    alignItems: "center",

    gap: 10,

    borderRadius: 14,

    paddingHorizontal: 14,

    height: 46,

    marginBottom: 12,
  },

  searchInput: {
    flex: 1,

    fontSize: 14,
  },

  filterRow: {
    flexDirection: "row",

    gap: 8,

    marginBottom: 12,
  },

  filterPill: {
    paddingHorizontal: 16,

    paddingVertical: 8,

    borderRadius: 20,
  },

  filterText: {
    fontSize: 13,

    fontWeight: "600",
  },

  row: {
    flexDirection: "row",

    alignItems: "center",

    gap: 12,

    borderRadius: 14,

    padding: 12,

    marginBottom: 10,
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

  rowBody: {
    flex: 1,
  },

  name: {
    fontSize: 15,

    fontWeight: "700",
  },

  lastMessage: {
    fontSize: 13,

    marginTop: 2,
  },

  badge: {
    minWidth: 22,

    height: 22,

    borderRadius: 11,

    alignItems: "center",

    justifyContent: "center",

    paddingHorizontal: 6,
  },

  badgeText: {
    color: "#FFFFFF",

    fontSize: 11,

    fontWeight: "700",
  },

  emptyText: {
    fontSize: 13,

    textAlign: "center",

    marginTop: 30,
  },

  newChatButton: {
    position: "absolute",

    right: 16,

    bottom: 24,

    flexDirection: "row",

    alignItems: "center",

    gap: 8,

    borderRadius: 24,

    paddingHorizontal: 18,

    paddingVertical: 14,
  },

  newChatText: {
    color: "#FFFFFF",

    fontWeight: "700",

    fontSize: 13,
  },
});