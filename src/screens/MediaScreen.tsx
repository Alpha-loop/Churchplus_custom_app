import {
  useState,
} from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import useMedia from "@/modules/media/hooks/useMedia";

import MediaSearchBar from "../components/MediaSearchBar";

import MediaTypeToggle, {
  MediaTab,
} from "../components/MediaTypeToggle";

import TrendingVideoCard from "../components/TrendingVideoCard";

import AudioListItem from "../components/AudioListItem";

import { useTheme } from "@/theme/ThemeContext";

export default function ModernMediaScreen({
  navigation,
}: any) {
  const { colors } = useTheme();

  const {
    searchText,
    setSearchText,
    filteredMediaVideos,
    allAudios,
  } = useMedia();

  const [
    activeTab,
    setActiveTab,
  ] = useState<MediaTab>(
    "videos"
  );

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
      contentContainerStyle={
        styles.content
      }
      showsVerticalScrollIndicator={
        false
      }
    >
      <MediaSearchBar
        value={searchText}
        onChangeText={
          setSearchText
        }
      />

      <MediaTypeToggle
        active={activeTab}
        onChange={setActiveTab}
      />

      {activeTab ===
      "videos" ? (
        <View>
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
              Trending in Media
            </Text>

            <TouchableOpacity
              onPress={() => {
                console.log(
                  "View all videos pressed — no destination yet"
                );
              }}
            >
              <Text
                style={[
                  styles.viewAll,
                  { color: colors.primary },
                ]}
              >
                View all
              </Text>
            </TouchableOpacity>
          </View>

          {filteredMediaVideos.length >
          0 ? (
            filteredMediaVideos.map(
              video => (
                <TrendingVideoCard
                  key={
                    video.videoId
                  }
                  video={video}
                  onPress={() =>
                    navigation.navigate(
                      "ViewVideoDetails",
                      {
                        data: video,

                        videoDetails:
                          filteredMediaVideos,
                      }
                    )
                  }
                />
              )
            )
          ) : (
            <Text
              style={[
                styles.emptyText,
                { color: colors.textMuted },
              ]}
            >
              {searchText
                ? "No videos match your search."
                : "No videos yet — check back once your church's channel has content."}
            </Text>
          )}
        </View>
      ) : (
        <View>
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
              Recent Audios
            </Text>

            <TouchableOpacity
              onPress={() => {
                console.log(
                  "View all audios pressed — no destination yet"
                );
              }}
            >
              <Text
                style={[
                  styles.viewAll,
                  { color: colors.primary },
                ]}
              >
                View all
              </Text>
            </TouchableOpacity>
          </View>

          {allAudios.length >
          0 ? (
            allAudios.map(
              audio => (
                <AudioListItem
                  key={audio.id}
                  audio={audio}
                  onPress={() => {
                    console.log(
                      "Audio pressed",
                      audio
                    );
                  }}
                />
              )
            )
          ) : (
            <Text
              style={[
                styles.emptyText,
                { color: colors.textMuted },
              ]}
            >
              Audio content isn't
              available yet.
            </Text>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 16,

    gap: 18,
  },

  sectionHeader: {
    flexDirection: "row",

    justifyContent:
      "space-between",

    alignItems: "center",

    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 17,

    fontWeight: "700",
  },

  viewAll: {
    fontSize: 13,

    fontWeight: "600",
  },

  emptyText: {
    fontSize: 13,

    textAlign: "center",

    paddingVertical: 24,
  },
});