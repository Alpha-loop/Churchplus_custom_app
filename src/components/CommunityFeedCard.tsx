import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Image } from "expo-image";

import { Heart, MessageCircle } from "lucide-react-native";

import { formatDevotionalDate } from "../screenUtils/formatDevotionalDate";

import { useTheme } from "@/theme/ThemeContext";

interface Props {
  item: any;

  churchName?: string;

  onPress: () => void;

  onLike: () => void;
}

const getPosterName = (
  item: any,
  churchName?: string
) => {
  const person =
    item?.posterDetails?.person;

  const fullName = [
    person?.firstName,
    person?.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    fullName ||
    churchName ||
    "Church"
  );
};

const getInitial = (
  name?: string
) =>
  name?.trim()?.[0]?.toUpperCase() ||
  "?";

export default function CommunityFeedCard({
  item,
  churchName,
  onPress,
  onLike,
}: Props) {
  const { colors } = useTheme();

  const posterName =
    getPosterName(
      item,
      churchName
    );

  const posterPhoto =
    item?.posterDetails
      ?.person?.photo;

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
      <View style={styles.header}>
        {posterPhoto ? (
          <Image
              cachePolicy="memory-disk"
            source={{
              uri: posterPhoto,
            }}
            style={styles.avatar}
          />
        ) : (
          <View
            style={[
              styles.avatar,
              { backgroundColor: colors.primary },
            ]}
          >
            <Text
              style={
                styles.avatarText
              }
            >
              {getInitial(
                posterName
              )}
            </Text>
          </View>
        )}

        <View
          style={styles.headerText}
        >
          <Text
            style={[
              styles.name,
              { color: colors.textPrimary },
            ]}
          >
            {posterName}
          </Text>

          <View
            style={
              styles.metaRow
            }
          >
            {item.postCategoryName ? (
              <View
                style={[
                  styles.categoryTag,
                  { backgroundColor: colors.primaryMuted },
                ]}
              >
                <Text
                  style={[
                    styles.categoryTagText,
                    { color: colors.primary },
                  ]}
                >
                  {
                    item.postCategoryName
                  }
                </Text>
              </View>
            ) : null}

            <Text
              style={[
                styles.date,
                { color: colors.textMuted },
              ]}
            >
              {formatDevotionalDate(
                item.date
              )}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
      >
        <Text
          style={[
            styles.content,
            { color: colors.textSecondary },
          ]}
          numberOfLines={5}
        >
          {item.content}
        </Text>

        {item.mediaUrl ? (
          <Image
              cachePolicy="memory-disk"
            source={{
              uri: item.mediaUrl,
            }}
            style={styles.media}
          />
        ) : null}
      </TouchableOpacity>

      <View
        style={[
          styles.footer,
          { borderTopColor: colors.divider },
        ]}
      >
        <TouchableOpacity
          style={styles.stat}
          onPress={onLike}
        >
          <Heart
            size={17}

            color={
              item.isLiked
                ? "#E0245E"
                : colors.textMuted
            }

            fill={
              item.isLiked
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
            {item.likeCount ?? 0}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.stat}
          onPress={onPress}
        >
          <MessageCircle
            size={17}
            color={colors.textMuted}
          />

          <Text
            style={[
              styles.statText,
              { color: colors.textSecondary },
            ]}
          >
            {item.comments
              ?.length ?? 0}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,

    padding: 16,

    marginBottom: 16,

    borderWidth: 1,
  },

  header: {
    flexDirection: "row",

    alignItems: "center",

    gap: 10,

    marginBottom: 12,
  },

  avatar: {
    width: 40,

    height: 40,

    borderRadius: 20,

    alignItems: "center",

    justifyContent: "center",
  },

  avatarText: {
    color: "#FFFFFF",

    fontWeight: "700",

    fontSize: 15,
  },

  headerText: {
    flex: 1,
  },

  metaRow: {
    flexDirection: "row",

    alignItems: "center",

    gap: 8,

    marginTop: 2,
  },

  categoryTag: {
    borderRadius: 6,

    paddingHorizontal: 8,

    paddingVertical: 2,
  },

  categoryTagText: {
    fontSize: 10,

    fontWeight: "700",
  },

  name: {
    fontSize: 14,

    fontWeight: "700",
  },

  date: {
    fontSize: 12,

    marginTop: 2,
  },

  content: {
    fontSize: 14,

    lineHeight: 20,
  },

  media: {
    width: "100%",

    height: 180,

    borderRadius: 12,

    marginTop: 12,
  },

  footer: {
    flexDirection: "row",

    gap: 20,

    marginTop: 14,

    paddingTop: 12,

    borderTopWidth: 1,
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