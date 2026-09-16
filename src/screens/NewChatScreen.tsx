import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { ChevronLeft } from "lucide-react-native";

import useChatFriends from "@/modules/social/hooks/useChatFriends";

import { useTheme } from "@/theme/ThemeContext";

export default function ModernNewChatScreen({
  navigation,
}: any) {
  const { colors } = useTheme();

  const {
    friends,
    loading,
  } = useChatFriends();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <View
        style={styles.topBar}
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
          New Chat
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
        <FlatList
          data={friends}
          keyExtractor={item =>
            item.id
          }
          contentContainerStyle={{
            padding: 16,
          }}
          ListEmptyComponent={
            <Text
              style={[
                styles.emptyText,
                { color: colors.textMuted },
              ]}
            >
              You don't have any
              connections to
              message yet.
            </Text>
          }
          renderItem={({
            item,
          }) => (
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() =>
                navigation.replace(
                  "UserChat",
                  {
                    userId:
                      item.id,

                    name: item.fullName,
                  }
                )
              }
              style={[
                styles.row,
                { borderBottomColor: colors.divider },
              ]}
            >
              {item.photo ? (
                <Image
                  source={{
                    uri: item.photo,
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
                    {item.fullName
                      ?.trim()?.[0]
                      ?.toUpperCase() ||
                      "?"}
                  </Text>
                </View>
              )}

              <Text
                style={[
                  styles.name,
                  { color: colors.textPrimary },
                ]}
              >
                {item.fullName}
              </Text>
            </TouchableOpacity>
          )}
        />
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

  row: {
    flexDirection: "row",

    alignItems: "center",

    gap: 14,

    paddingVertical: 12,

    borderBottomWidth: 1,
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

  name: {
    fontSize: 15,

    fontWeight: "600",
  },

  emptyText: {
    fontSize: 13,

    textAlign: "center",

    marginTop: 30,

    paddingHorizontal: 20,
  },
});