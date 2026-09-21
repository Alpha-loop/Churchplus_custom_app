import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Image } from "expo-image";

import { ChevronLeft, Clock } from "lucide-react-native";

import useDevotionalLibrary from "@/modules/devotional/hooks/useDevotionalLibrary";

import { Devotional } from "@/modules/devotional/types/devotional.types";

import { estimateReadTime } from "../screenUtils/estimateReadTime";

import { formatDevotionalDate } from "../screenUtils/formatDevotionalDate";

import { useTheme } from "@/theme/ThemeContext";

export default function ModernDevotionalsScreen({
  navigation,
}: any) {
  const { colors } = useTheme();

  const {
    devotionals,
    loading,
  } =
    useDevotionalLibrary();

  const today: Devotional | undefined =
    devotionals[0];

  const previous: Devotional[] =
    devotionals.slice(1);

  const openDevotional = (
    devotion: Devotional
  ) => {
    navigation.navigate(
      "TodayDevotional",
      {
        data: devotion,
      }
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.topBar}>
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
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={
          styles.content
        }
        showsVerticalScrollIndicator={
          false
        }
      >
      <Text
        style={[
          styles.title,
          { color: colors.textPrimary },
        ]}
      >
        Devotionals
      </Text>

      <Text
        style={[
          styles.subtitle,
          { color: colors.textSecondary },
        ]}
      >
        Daily reflections to
        guide your spiritual
        journey.
      </Text>

      {today ? (
        <>
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.textPrimary },
            ]}
          >
            Today's Reflection
          </Text>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
              openDevotional(
                today
              )
            }
            style={[
              styles.heroCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            {today.mediaUrl ? (
              <View>
                <Image
              cachePolicy="memory-disk"
                  source={{
                    uri: today.mediaUrl,
                  }}
                  style={
                    styles.heroImage
                  }
                />

                {/* Overlays a photo, stays light regardless of
                    theme — same as other photo caption tags. */}
                <View
                  style={
                    styles.dateBadge
                  }
                >
                  <Text
                    style={
                      styles.dateBadgeText
                    }
                  >
                    {formatDevotionalDate(
                      today.date,
                      "MMM D"
                    ).toUpperCase()}
                  </Text>
                </View>
              </View>
            ) : null}

            <View
              style={
                styles.heroBody
              }
            >
              {today.bibleVerse ? (
                <Text
                  style={[
                    styles.verseLabel,
                    { color: colors.primary },
                  ]}
                >
                  {today.bibleVerse.toUpperCase()}
                </Text>
              ) : null}

              <Text
                style={[
                  styles.heroTitle,
                  { color: colors.textPrimary },
                ]}
              >
                {today.title}
              </Text>

              <Text
                style={[
                  styles.heroExcerpt,
                  { color: colors.textSecondary },
                ]}
                numberOfLines={2}
              >
                {today.content}
              </Text>

              {estimateReadTime(
                today.content
              ) ? (
                <View
                  style={
                    styles.readRow
                  }
                >
                  <Clock
                    size={13}
                    color={colors.textMuted}
                  />

                  <Text
                    style={[
                      styles.readText,
                      { color: colors.textMuted },
                    ]}
                  >
                    {estimateReadTime(
                      today.content
                    )}
                  </Text>
                </View>
              ) : null}
            </View>
          </TouchableOpacity>
        </>
      ) : null}

      {previous.length > 0 ? (
        <>
          <View
            style={
              styles.sectionHeader
            }
          >
            <Text
              style={[
                styles.sectionTitle,
                { color: colors.textPrimary },
              ]}
            >
              Previous Devotions
            </Text>
          </View>

          <View
            style={styles.list}
          >
            {previous.map(
              devotion => (
                <TouchableOpacity
                  key={
                    devotion.id
                  }
                  activeOpacity={0.85}
                  onPress={() =>
                    openDevotional(
                      devotion
                    )
                  }
                  style={[
                    styles.row,
                    { borderBottomColor: colors.divider },
                  ]}
                >
                  <View
                    style={
                      styles.rowBody
                    }
                  >
                    <Text
                      style={[
                        styles.rowMeta,
                        { color: colors.primary },
                      ]}
                    >
                      {formatDevotionalDate(
                        devotion.date,
                        "MMM D"
                      ).toUpperCase()}
                      {devotion.bibleVerse
                        ? `  •  ${devotion.bibleVerse}`
                        : ""}
                    </Text>

                    <Text
                      style={[
                        styles.rowTitle,
                        { color: colors.textPrimary },
                      ]}
                      numberOfLines={1}
                    >
                      {
                        devotion.title
                      }
                    </Text>

                    {estimateReadTime(
                      devotion.content
                    ) ? (
                      <View
                        style={
                          styles.readRow
                        }
                      >
                        <Clock
                          size={12}
                          color={colors.textMuted}
                        />

                        <Text
                          style={[
                            styles.readText,
                            { color: colors.textMuted },
                          ]}
                        >
                          {estimateReadTime(
                            devotion.content
                          )}
                        </Text>
                      </View>
                    ) : null}
                  </View>

                  {devotion.mediaUrl ? (
                    <Image
              cachePolicy="memory-disk"
                      source={{
                        uri: devotion.mediaUrl,
                      }}
                      style={
                        styles.rowThumb
                      }
                    />
                  ) : null}
                </TouchableOpacity>
              )
            )}
          </View>
        </>
      ) : null}

      {!loading &&
      !today &&
      previous.length ===
        0 ? (
        <Text
          style={[
            styles.emptyText,
            { color: colors.textMuted },
          ]}
        >
          No devotionals have
          been posted yet.
        </Text>
      ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    paddingHorizontal: 16,

    paddingTop: 54,

    paddingBottom: 8,
  },

  container: {
    flex: 1,
  },

  content: {
    padding: 20,
  },

  title: {
    fontSize: 28,

    fontWeight: "800",
  },

  subtitle: {
    fontSize: 14,

    marginTop: 6,

    marginBottom: 22,
  },

  sectionTitle: {
    fontSize: 17,

    fontWeight: "700",

    marginBottom: 12,
  },

  sectionHeader: {
    flexDirection: "row",

    justifyContent:
      "space-between",

    alignItems: "center",

    marginTop: 26,
  },

  heroCard: {
    borderRadius: 16,

    overflow: "hidden",

    borderWidth: 1,
  },

  heroImage: {
    width: "100%",

    height: 190,
  },

  dateBadge: {
    position: "absolute",

    top: 14,

    left: 14,

    backgroundColor: "rgba(255,255,255,0.75)",

    borderRadius: 8,

    paddingHorizontal: 10,

    paddingVertical: 5,
  },

  dateBadgeText: {
    fontSize: 11,

    fontWeight: "700",

    color: "rgba(17, 17, 17, 0.8)",

    letterSpacing: 0.5,
  },

  heroBody: {
    padding: 16,
  },

  verseLabel: {
    fontSize: 11,

    fontWeight: "700",

    letterSpacing: 0.4,

    marginBottom: 6,
  },

  heroTitle: {
    fontSize: 19,

    fontWeight: "800",
  },

  heroExcerpt: {
    fontSize: 13,

    lineHeight: 19,

    marginTop: 8,
  },

  readRow: {
    flexDirection: "row",

    alignItems: "center",

    gap: 6,

    marginTop: 10,
  },

  readText: {
    fontSize: 12,
  },

  list: {
    marginTop: 4,
  },

  row: {
    flexDirection: "row",

    alignItems: "center",

    paddingVertical: 14,

    borderBottomWidth: 1,
  },

  rowBody: {
    flex: 1,

    marginRight: 12,
  },

  rowMeta: {
    fontSize: 12,

    fontWeight: "600",
  },

  rowTitle: {
    fontSize: 15,

    fontWeight: "700",

    marginTop: 4,
  },

  rowThumb: {
    width: 56,

    height: 56,

    borderRadius: 10,
  },

  emptyText: {
    fontSize: 13,

    textAlign: "center",

    paddingVertical: 30,
  },
});