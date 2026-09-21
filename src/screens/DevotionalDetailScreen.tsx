import {
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Image } from "expo-image";

import {
  ChevronLeft,
  Bookmark,
  Share2,
} from "lucide-react-native";

import useSavedDevotionals from "@/modules/devotional/hooks/useSavedDevotionals";

import { formatDevotionalDate } from "../screenUtils/formatDevotionalDate";

import { useChurchStore } from "@/store/churchStore";

import { useTheme } from "@/theme/ThemeContext";

export default function ModernDevotionalDetailScreen({
  navigation,
  route,
}: any) {
  const { colors } = useTheme();

  const {
    data: devotion,
  } = route.params;

  const fullProfile = useChurchStore(
    state => state.fullProfile
  );

  const {
    isSaved,
    toggleSaved,
  } =
    useSavedDevotionals();

  const saved = isSaved(
    devotion.id
  );

  const onShare = async () => {
    await Share.share({
      title: devotion.title,

      message: `${devotion.title}\n\n${devotion.content}`,
    });
  };

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
          {fullProfile?.churchName ||
            "Faith Connect"}
        </Text>

        <View
          style={
            styles.topBarIcons
          }
        >
          <TouchableOpacity
            onPress={() =>
              toggleSaved(
                devotion.id
              )
            }
            hitSlop={8}
          >
            <Bookmark
              size={20}

              color={
                saved
                  ? colors.primary
                  : colors.textSecondary
              }

              fill={
                saved
                  ? colors.primary
                  : "transparent"
              }
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onShare}
            hitSlop={8}
          >
            <Share2
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
      >
        <View>
          {devotion.mediaUrl ? (
            <Image
              cachePolicy="memory-disk"
              source={{
                uri: devotion.mediaUrl,
              }}
              style={
                styles.heroImage
              }
            />
          ) : (
            <View
              style={[
                styles.heroImage,
                { backgroundColor: colors.placeholder },
              ]}
            />
          )}

          {/* Overlays the hero photo — white text on a dark
              overlay stays correct regardless of theme, same
              pattern as the other photo-caption overlays. */}
          <View
            style={
              styles.heroOverlay
            }
          >
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
                Daily Devotional
              </Text>
            </View>

            <Text
              style={
                styles.heroTitle
              }
            >
              {devotion.title}
            </Text>

            <Text
              style={
                styles.heroDate
              }
            >
              {formatDevotionalDate(
                devotion.date,
                "MMMM D, YYYY"
              )}
            </Text>
          </View>
        </View>

        <View
          style={
            styles.content
          }
        >
          {devotion.memoryVerse ? (
            <View
              style={[
                styles.quoteBox,
                {
                  borderLeftColor: colors.primary,
                  backgroundColor: colors.surfaceAlt,
                },
              ]}
            >
              <Text
                style={[
                  styles.quoteText,
                  { color: colors.textPrimary },
                ]}
              >
                "
                {
                  devotion.memoryVerse
                }
                "
              </Text>

              {devotion.bibleVerse ? (
                <Text
                  style={[
                    styles.quoteRef,
                    { color: colors.textMuted },
                  ]}
                >
                  — {devotion.bibleVerse}
                </Text>
              ) : null}
            </View>
          ) : null}

          <Text
            style={[
              styles.bodyText,
              { color: colors.textSecondary },
            ]}
          >
            {devotion.content}
          </Text>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={onShare}
            style={[
              styles.shareButton,
              { backgroundColor: colors.surfaceAlt },
            ]}
          >
            <Share2
              size={16}
              color={colors.textSecondary}
            />

            <Text
              style={[
                styles.shareButtonText,
                { color: colors.textSecondary },
              ]}
            >
              Share Reflection
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() =>
              toggleSaved(
                devotion.id
              )
            }
            style={[
              styles.saveButton,
              { backgroundColor: colors.primary },
            ]}
          >
            {saved ? (
              <Bookmark
                size={16}
                color="#FFFFFF"
                fill="#FFFFFF"
              />
            ) : (
              <Bookmark
                size={16}
                color="#FFFFFF"
              />
            )}

            <Text
              style={
                styles.saveButtonText
              }
            >
              {saved
                ? "Saved"
                : "Save Entry"}
            </Text>
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
    fontSize: 15,

    fontWeight: "700",

    letterSpacing: 0.3,
  },

  topBarIcons: {
    flexDirection: "row",

    gap: 16,
  },

  heroImage: {
    width: "100%",

    height: 260,
  },

  heroOverlay: {
    position: "absolute",

    bottom: 0,

    left: 0,

    right: 0,

    padding: 18,

    backgroundColor: "rgba(0,0,0,0.35)",
  },

  badge: {
    alignSelf: "flex-start",

    borderRadius: 6,

    paddingHorizontal: 10,

    paddingVertical: 5,

    marginBottom: 10,
  },

  badgeText: {
    color: "#FFFFFF",

    fontSize: 11,

    fontWeight: "700",
  },

  heroTitle: {
    fontSize: 26,

    fontWeight: "800",

    color: "#FFFFFF",
  },

  heroDate: {
    fontSize: 13,

    color: "rgba(255,255,255,0.85)",

    marginTop: 4,
  },

  content: {
    padding: 20,
  },

  quoteBox: {
    borderLeftWidth: 3,

    borderRadius: 10,

    padding: 16,

    marginBottom: 20,
  },

  quoteText: {
    fontSize: 17,

    fontStyle: "italic",

    fontWeight: "600",

    lineHeight: 24,
  },

  quoteRef: {
    fontSize: 13,

    fontWeight: "700",

    marginTop: 10,
  },

  bodyText: {
    fontSize: 15,

    lineHeight: 24,
  },

  shareButton: {
    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    gap: 8,

    borderRadius: 24,

    paddingVertical: 14,

    marginTop: 24,
  },

  shareButtonText: {
    fontSize: 13,

    fontWeight: "700",
  },

  saveButton: {
    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    gap: 8,

    borderRadius: 24,

    paddingVertical: 14,

    marginTop: 12,

    marginBottom: 10,
  },

  saveButtonText: {
    fontSize: 13,

    fontWeight: "700",

    color: "#FFFFFF",
  },
});