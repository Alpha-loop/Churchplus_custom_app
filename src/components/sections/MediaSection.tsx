import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  Play,
  Share2,
  Bookmark,
} from "lucide-react-native";

import { formatCount } from "../../screenUtils/formatCount";

import { useTheme } from "@/theme/ThemeContext";

interface Props {
  video?: {
    title?: string;

    description?: string;

    thumbnailUrl?: string;

    statistics?: {
      viewCount?: string;
    };

    viewCount?: string;
  };

  onPress: () => void;

  onShare: () => void;
}

const formatViews = (
  count?: string
) => {
  const n = formatCount(count);

  return n ? `${n} Views` : null;
};

export default function MediaSection({
  video,
  onPress,
  onShare,
}: Props) {
  const { colors } = useTheme();

  if (!video) {
    return null;
  }

  const thumbnail =
    video.thumbnailUrl;

  const views = formatViews(
    video.statistics
      ?.viewCount ??
      video.viewCount
  );

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.surface },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        style={[
          styles.thumbnailWrap,
          { backgroundColor: colors.placeholder },
        ]}
      >
        {thumbnail ? (
          <Image
            source={{
              uri: thumbnail,
            }}
            style={styles.thumbnail}
          />
        ) : null}

        <View
          style={styles.playOverlay}
        >
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
      </TouchableOpacity>

      <View style={styles.body}>
        <Text
          style={[
            styles.caption,
            { color: colors.textPrimary },
          ]}
          numberOfLines={2}
        >
          {video.title}
        </Text>

        <View
          style={styles.footerRow}
        >
          {views ? (
            <Text
              style={[
                styles.views,
                { color: colors.textMuted },
              ]}
            >
              {views}
            </Text>
          ) : (
            <View />
          )}

          <View
            style={styles.iconRow}
          >
            <TouchableOpacity
              onPress={onShare}
            >
              <Share2
                size={18}

                color={colors.textMuted}
              />
            </TouchableOpacity>

            <Bookmark
              size={18}

              color={colors.textMuted}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,

    overflow: "hidden",
  },

  thumbnailWrap: {
    width: "100%",

    height: 270,

    position: "relative",
  },

  thumbnail: {
    width: "100%",

    height: 270,
  },

  playOverlay: {
    ...StyleSheet.absoluteFillObject,

    alignItems: "center",

    justifyContent: "center",
  },

  playButton: {
    width: 52,

    height: 52,

    borderRadius: 26,

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
    padding: 16,
  },

  caption: {
    fontSize: 15,

    lineHeight: 21,
  },

  footerRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginTop: 12,
  },

  views: {
    fontSize: 13,
  },

  iconRow: {
    flexDirection: "row",

    gap: 16,
  },
});