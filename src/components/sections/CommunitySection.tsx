import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  Users,
  Heart,
  MessageCircle,
} from "lucide-react-native";

import { Feed } from "@/modules/home/types/home.types";

import { relativeTime } from "../../screenUtils/relativeTime";

import { useTheme } from "@/theme/ThemeContext";

interface Props {
  feed?: Feed;

  onPress: () => void;
}

export default function CommunitySection({
  feed,
  onPress,
}: Props) {
  const { colors } = useTheme();

  if (!feed) {
    return null;
  }

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        styles.card,
        { backgroundColor: colors.surface },
      ]}
    >
      <View style={styles.headerRow}>
        <View
          style={[
            styles.iconWrap,
            { backgroundColor: colors.surfaceAlt },
          ]}
        >
          <Users
            size={18}
            color={colors.textSecondary}
          />
        </View>

        <View>
          <Text
            style={[
              styles.title,
              { color: colors.textPrimary },
            ]}
          >
            {feed.postCategoryName ||
              "Community Highlight"}
          </Text>

          <Text
            style={[
              styles.time,
              { color: colors.textMuted },
            ]}
          >
            {relativeTime(
              feed._OrderDate
            )}
          </Text>
        </View>
      </View>

      <Text
        style={[
          styles.body,
          { color: colors.textSecondary },
        ]}
        numberOfLines={3}
      >
        {feed.content}
      </Text>

      <View style={styles.footerRow}>
        <View style={styles.stat}>
          <Heart
            size={16}

            color={
              feed.isLiked
                ? "#E0245E"
                : colors.textMuted
            }

            fill={
              feed.isLiked
                ? "#E0245E"
                : "transparent"
            }
          />

          <Text
            style={[
              styles.statText,
              { color: colors.textSecondary },
            ]}
          >
            {feed.likeCount}
          </Text>
        </View>

        <View style={styles.stat}>
          <MessageCircle
            size={16}

            color={colors.textMuted}
          />

          <Text
            style={[
              styles.statText,
              { color: colors.textSecondary },
            ]}
          >
            {feed.comments?.length ?? 0}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,

    paddingHorizontal: 16,

    height: 270,

    paddingVertical: 20,
  },

  headerRow: {
    flexDirection: "row",

    alignItems: "center",

    gap: 10,

    marginBottom: 12,
  },

  iconWrap: {
    width: 38,

    height: 38,

    borderRadius: 19,

    alignItems: "center",

    justifyContent: "center",
  },

  title: {
    fontSize: 14,

    fontWeight: "700",
  },

  time: {
    fontSize: 12,

    marginTop: 2,
  },

  body: {
    fontSize: 14,

    lineHeight: 20,
  },

  footerRow: {
    flexDirection: "row",

    gap: 20,

    marginTop: 14,
  },

  stat: {
    flexDirection: "row",

    alignItems: "center",

    gap: 6,
  },

  statText: {
    fontSize: 13,
  },
});