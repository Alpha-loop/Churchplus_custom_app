import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Image } from "expo-image";

import { Play } from "lucide-react-native";

import { VideoMedia } from "@/modules/media/types/media.types";

import { formatCount } from "../screenUtils/formatCount";
import { relativeTime } from "../screenUtils/relativeTime";

import { useTheme } from "@/theme/ThemeContext";

interface Props {
  video: VideoMedia;

  onPress: () => void;
}

export default function TrendingVideoCard({
  video,
  onPress,
}: Props) {
  const { colors } = useTheme();

  const thumbnail =
    video.mediumThumbnailUrl ||
    video.highThumbnailUrl ||
    video.thumbnailUrl;

  const views = formatCount(
    video.viewCount
  );

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}
    >
      <View
        style={[
          styles.thumbnailWrap,
          { backgroundColor: colors.placeholder },
        ]}
      >
        {thumbnail ? (
          <Image
              cachePolicy="memory-disk"
            source={{
              uri: thumbnail,
            }}
            style={styles.thumbnail}
          />
        ) : null}

        <View style={styles.playOverlay}>
          <View
            style={[
              styles.playButton,
              { backgroundColor: colors.surface },
            ]}
          >
            <Play
              size={22}

              color={colors.primary}

              fill={colors.primary}
            />
          </View>
        </View>
      </View>

      <View style={styles.body}>
        <Text
          style={[
            styles.title,
            { color: colors.textPrimary },
          ]}
          numberOfLines={2}
        >
          {video.title}
        </Text>

        {views ||
        video.publishedAt ? (
          <Text
            style={[
              styles.meta,
              { color: colors.textMuted },
            ]}
          >
            {[
              views
                ? `${views} views`
                : null,
              relativeTime(
                video.publishedAt
              ) || null,
            ]
              .filter(Boolean)
              .join(" • ")}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,

    overflow: "hidden",

    marginBottom: 16,

    borderWidth: 1,
  },

  thumbnailWrap: {
    width: "100%",

    height: 180,

    position: "relative",
  },

  thumbnail: {
    width: "100%",

    height: "100%",
  },

  playOverlay: {
    ...StyleSheet.absoluteFillObject,

    alignItems: "center",

    justifyContent: "center",
  },

  playButton: {
    width: 48,

    height: 48,

    borderRadius: 24,

    alignItems: "center",

    justifyContent: "center",

    shadowColor: "#000",

    shadowOpacity: 0.15,

    shadowRadius: 6,

    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 3,
  },

  body: {
    padding: 14,
  },

  title: {
    fontSize: 15,

    fontWeight: "600",
  },

  meta: {
    fontSize: 12,

    marginTop: 6,
  },
});