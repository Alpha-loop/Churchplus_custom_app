import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import TrendingMessageCard from "./TrendingMessageCard";

import {
  VideoItem,
} from "../types/home.types";

interface Props {
  videos: VideoItem[];

  navigation: any;
}

export default function TrendingMessagesSection({
  videos,
  navigation,
}: Props) {
  console.log(
    "TRENDING VIDEOS COUNT:",
    videos?.length
  );

  console.log(
    "FIRST VIDEO:",
    videos?.[0]
  );

  if (
    !videos ||
    videos.length === 0
  ) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Trending Messages
      </Text>

      <FlatList
        horizontal
        data={videos}
        keyExtractor={(
          item,
          index
        ) =>
          item.videoId ??
          index.toString()
        }
        showsHorizontalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.list
        }
        renderItem={({
          item,
        }) => (
          <TrendingMessageCard
            navigation={
              navigation
            }
            data={item}
            videoDetails={
              videos
            }
          />
        )}
      />
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      marginTop: 20,
    },

    title: {
      fontSize: 15,

      fontWeight: "800",

      color:
        "rgba(0,0,0,0.8)",

      marginBottom: 10,
    },

    list: {
      // gap: 2,
    },
  });