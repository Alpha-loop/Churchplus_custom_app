import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Image } from "expo-image";

import {
  ArrowRight,
} from "lucide-react-native";

import { useTheme } from "@/theme/ThemeContext";

interface Props {
  devotional?: {
    title: string;

    mediaUrl: string;
  };

  onPress: () => void;
}

// Renders nothing when there's no devotional for today — same
// "hide the section instead of showing an empty card" behavior
// Classic's Home uses.
export default function DevotionSection({
  devotional,
  onPress,
}: Props) {
  const { colors } = useTheme();

  if (!devotional) {
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
      <View style={styles.imageContainer}>
        <Image
              cachePolicy="memory-disk"
          source={{
            uri: devotional.mediaUrl,
          }}
          style={styles.image}
        />

        {/* Overlays a photo, not a themed surface — stays dark
            regardless of theme, same as a caption tag on a photo
            would in either light or dark mode. */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            Today's Devotion
          </Text>
        </View>
      </View>

      <View style={styles.body}>
        <Text
          style={[
            styles.quote,
            { color: colors.textPrimary },
          ]}
          numberOfLines={3}
        >
          {devotional.title}
        </Text>

        <View style={styles.readRow}>
          <Text
            style={[
              styles.readLink,
              { color: colors.primary },
            ]}
          >
            Read Reflection • 4 Min
          </Text>

          <ArrowRight
            size={14}
            color={colors.primary}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,

    overflow: "hidden",
  },

  imageContainer: {
    paddingHorizontal: 0,
  },

  image: {
    width: "100%",

    height: 270,
  },

  badge: {
    position: "absolute",

    top: 14,

    left: 14,

    backgroundColor: "rgba(0,0,0,0.55)",

    paddingHorizontal: 10,

    paddingVertical: 5,

    borderRadius: 6,
  },

  badgeText: {
    color: "#FFFFFF",

    fontSize: 11,

    fontWeight: "700",

    letterSpacing: 0.5,

    textTransform: "uppercase",
  },

  body: {
    paddingHorizontal: 16,
    paddingVertical: 30,

  },

  quote: {
    fontSize: 15,

    fontStyle: "italic",

    lineHeight: 21,
  },

  readRow: {
    flexDirection: "row",

    alignItems: "center",

    gap: 6,

    marginTop: 12,
  },

  readLink: {
    fontWeight: "600",

    fontSize: 14,
  },
});