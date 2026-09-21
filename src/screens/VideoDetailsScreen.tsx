import { useState } from "react";

import {
  Alert,
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
  ThumbsUp,
  Share2,
  Bookmark,
} from "lucide-react-native";

import VideoPlayer from "@/modules/media/components/VideoPlayer";

import useSavedVideos from "@/modules/media/hooks/useSavedVideos";

import useRequireAuth from "@/modules/auth/hooks/useRequireAuth";

import { formatCount } from "../screenUtils/formatCount";

// Real fields only — confirmed from Classic's own working
// VideoDetails screen (VideoMetadata.tsx/VideoDescription.tsx):
// title, likeCount, viewCount, description (sometimes present),
// thumbnailUrl, videoId. There's no poster name, parish/channel
// name, or video-duration field anywhere in the real
// getYouTubeVideos() response — the design's "Fr. Michael
// Thompson", "Saint Mary's Parish", and duration badges on
// related videos are all left out rather than fabricated.
export default function ModernVideoDetailsScreen({
  navigation,
  route,
}: any) {
  const {
    data,
    videoDetails = [],
  } = route.params;

  const { requireAuth } =
    useRequireAuth();

  const { isSaved, toggleSaved } =
    useSavedVideos();

  const [
    descriptionExpanded,
    setDescriptionExpanded,
  ] = useState(false);

  const related = (
    videoDetails || []
  ).filter(
    (v: any) =>
      v.videoId !== data.videoId
  );

  const saved = isSaved(
    data.videoId
  );

  const onLike = () =>
    requireAuth(
      () =>
        Alert.alert(
          "Coming Soon",
          "Liking videos isn't available yet."
        ),
      {
        message:
          "Sign in to like this video.",
      }
    );

  const onSave = () =>
    requireAuth(
      () =>
        toggleSaved(
          data.videoId
        ),
      {
        message:
          "Sign in to save this video.",
      }
    );

  const onShare = async () => {
    try {
      await Share.share({
        title: data.title,

        message: `${data.title}\n\nhttps://www.youtube.com/watch?v=${data.videoId}`,

        url: `https://www.youtube.com/watch?v=${data.videoId}`,
      });
    } catch (error) {
      console.log(
        "VIDEO SHARE ERROR:",
        error
      );
    }
  };

  const onSelectRelated = (
    video: any
  ) => {
    navigation.replace(
      "ViewVideoDetails",
      {
        data: video,

        videoDetails,
      }
    );
  };

  return (
    <View style={styles.container}>
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
            color="rgba(17, 17, 17, 0.8)"
          />
        </TouchableOpacity>

        <Text
          style={
            styles.topBarTitle
          }
        >
          Video
        </Text>

        <View
          style={{ width: 22 }}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
      >
        <VideoPlayer
          videoId={
            data.videoId
          }
        />

        <View
          style={
            styles.content
          }
        >
          <Text
            style={
              styles.title
            }
          >
            {data.title}
          </Text>

          <Text
            style={
              styles.stats
            }
          >
            {formatCount(
              data.likeCount
            ) || 0}{" "}
            likes ·{" "}
            {formatCount(
              data.viewCount
            ) || 0}{" "}
            views
          </Text>

          <View
            style={
              styles.actionsRow
            }
          >
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={
                onLike
              }
              style={
                styles.actionButton
              }
            >
              <ThumbsUp
                size={16}
                color="rgba(17, 17, 17, 0.7)"
              />

              <Text
                style={
                  styles.actionText
                }
              >
                Like
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={
                onShare
              }
              style={
                styles.actionButton
              }
            >
              <Share2
                size={16}
                color="rgba(17, 17, 17, 0.7)"
              />

              <Text
                style={
                  styles.actionText
                }
              >
                Share
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={
                onSave
              }
              style={
                styles.actionButton
              }
            >
              <Bookmark
                size={16}

                color={
                  saved
                    ? "#1D3AA8"
                    : "rgba(17, 17, 17, 0.7)"
                }

                fill={
                  saved
                    ? "#1D3AA8"
                    : "transparent"
                }
              />

              <Text
                style={[
                  styles.actionText,
                  saved && {
                    color:
                      "#1D3AA8",
                  },
                ]}
              >
                {saved
                  ? "Saved"
                  : "Save"}
              </Text>
            </TouchableOpacity>
          </View>

          {data.description ? (
            <View
              style={
                styles.descriptionCard
              }
            >
              <Text
                style={
                  styles.descriptionText
                }
                numberOfLines={
                  descriptionExpanded
                    ? undefined
                    : 3
                }
              >
                {
                  data.description
                }
              </Text>

              <TouchableOpacity
                onPress={() =>
                  setDescriptionExpanded(
                    !descriptionExpanded
                  )
                }
              >
                <Text
                  style={
                    styles.showMoreText
                  }
                >
                  {descriptionExpanded
                    ? "Show less"
                    : "Show more"}
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {related.length > 0 ? (
            <View
                style={{
                    marginVertical: 50,
                }}
            >
              <Text
                style={
                  styles.sectionTitle
                }
              >
                Related Videos
              </Text>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={
                  false
                }
                
              >
                {related.map(
                  (
                    video: any
                  ) => (
                    <TouchableOpacity
                      key={
                        video.videoId
                      }
                      activeOpacity={0.85}
                      onPress={() =>
                        onSelectRelated(
                          video
                        )
                      }
                      style={
                        styles.relatedCard
                      }
                    >
                      {video.thumbnailUrl ? (
                        <Image
              cachePolicy="memory-disk"
                          source={{
                            uri: video.thumbnailUrl,
                          }}
                          style={
                            styles.relatedThumbnail
                          }
                        />
                      ) : (
                        <View
                          style={[
                            styles.relatedThumbnail,
                            styles.relatedThumbnailPlaceholder,
                          ]}
                        />
                      )}

                      <Text
                        style={
                          styles.relatedTitle
                        }
                        numberOfLines={2}
                      >
                        {
                          video.title
                        }
                      </Text>

                      <Text
                        style={
                          styles.relatedViews
                        }
                      >
                        {formatCount(
                          video.viewCount
                        ) || 0}{" "}
                        views
                      </Text>
                    </TouchableOpacity>
                  )
                )}
              </ScrollView>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#FFFFFF",
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

    color: "rgba(17, 17, 17, 0.9)",
  },

  content: {
    padding: 16,

    paddingBottom: 32,
  },

  title: {
    fontSize: 18,

    fontWeight: "800",

    color: "rgba(17, 17, 17, 0.92)",

    marginBottom: 6,
  },

  stats: {
    fontSize: 13,

    color: "rgba(0,0,0,0.5)",

    marginBottom: 16,
  },

  actionsRow: {
    flexDirection: "row",

    gap: 10,

    marginBottom: 18,
  },

  actionButton: {
    flex: 1,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    gap: 6,

    backgroundColor: "#F4F3FA",

    borderRadius: 20,

    paddingVertical: 10,
  },

  actionText: {
    fontSize: 13,

    fontWeight: "700",

    color: "rgba(17, 17, 17, 0.75)",
  },

  descriptionCard: {
    backgroundColor: "#F4F3FA",

    borderRadius: 14,

    padding: 14,

    marginBottom: 22,
  },

  descriptionText: {
    fontSize: 14,

    color: "rgba(17, 17, 17, 0.75)",

    lineHeight: 20,
  },

  showMoreText: {
    fontSize: 13,

    fontWeight: "700",

    color: "#1D3AA8",

    marginTop: 6,
  },

  sectionTitle: {
    fontSize: 16,

    fontWeight: "700",

    color: "rgba(17, 17, 17, 0.9)",

    marginBottom: 12,
  },

  relatedCard: {
    width: 220,

    marginRight: 14,
  },

  relatedThumbnail: {
    width: 220,

    height: 130,

    borderRadius: 12,
  },

  relatedThumbnailPlaceholder: {
    backgroundColor: "#1F2937",
  },

  relatedTitle: {
    fontSize: 14,

    fontWeight: "700",

    color: "rgba(17, 17, 17, 0.85)",

    marginTop: 10,
  },

  relatedViews: {
    fontSize: 13,

    color: "rgba(0,0,0,0.5)",

    marginTop: 3,
  },
});