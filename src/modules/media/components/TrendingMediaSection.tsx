import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import SermonVideoCard from "./SermonVideoCard";

import {
  VideoMedia,
} from "../types/media.types";

interface Props {
  searchText: string;

  churchMedia: VideoMedia[];

  onVideoPress: (
    item: VideoMedia
  ) => void;
}

export default function TrendingMediaSection({
  searchText,

  churchMedia,

  onVideoPress,
}: Props) {
  /**
   * Hide section during search
   */
  if (searchText !== "") {
    return null;
  }

  /**
   * Empty state
   */
  if (
    !churchMedia ||
    churchMedia.length === 0
  ) {
    return (
      <View
        style={styles.container}
      >
        <Text
          style={
            styles.emptyText
          }
        >
          No media video to
          display yet
        </Text>
      </View>
    );
  }

  return (
    <View
      style={styles.container}
    >
      <FlatList
        horizontal
        data={churchMedia}
        keyExtractor={(
          item
        ) => item.videoId}
        renderItem={({
          item,
        }) => (
          <SermonVideoCard
            item={item}
            onPress={() =>
              onVideoPress(
                item
              )
            }
          />
        )}
        contentContainerStyle={
          styles.list
        }
        showsHorizontalScrollIndicator={
          false
        }
      />
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      marginHorizontal: 15,

      marginTop: 20,
    },

    list: {
      gap: 15,
    },

    emptyText: {
      fontSize: 14,

      color:
        "rgba(0,0,0,0.6)",
    },
  });