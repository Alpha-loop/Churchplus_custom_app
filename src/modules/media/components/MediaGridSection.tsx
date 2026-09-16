import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import MediaCard from "./MediaCard";

import {
  MediaItem,
} from "../types/media.types";

interface Props {
  searchText: string;

  media: MediaItem[];

  onVideoPress: (
    item: any
  ) => void;

  onAudioPress: (
    item: any
  ) => void;
}

export default function MediaGridSection({
  searchText,

  media,

  onVideoPress,

  onAudioPress,
}: Props) {
  if (
    !media ||
    media.length === 0
  ) {
    return null;
  }

  return (
    <View
      style={styles.container}
    >
      <Text
        style={styles.title}
      >
        {searchText
          ? "Searched Result"
          : "Trending In Media"}
      </Text>

      <View
        style={styles.grid}
      >
        {media.map(
          (item) => (
            <MediaCard
              key={
                "id" in item
                  ? item.id
                  : item.videoId
              }
              item={item}
              onPress={() => {
                if ("id" in item) {
                  onAudioPress(
                    item
                  );
                } else {
                  onVideoPress(
                    item
                  );
                }
              }}
            />
          )
        )}
      </View>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      paddingHorizontal: 15,

      backgroundColor:
        "#F7F7F7",

      marginBottom: 150,

      marginTop: 20,

      paddingTop: 15,

      borderRadius: 15,
    },

    title: {
      fontSize: 15,

      fontWeight: "700",

      color:
        "rgba(0,0,0,0.85)",

      marginBottom: 15,
    },

    grid: {
      flexDirection:
        "row",

      justifyContent:
        "space-between",

      flexWrap: "wrap",

      gap: 10,
    },
  });