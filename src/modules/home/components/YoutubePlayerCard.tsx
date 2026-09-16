import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  useState,
} from "react";

import YoutubePlayer from "react-native-youtube-iframe";

import {
  VideoItem,
} from "../types/home.types";

interface YoutubePlayerCardProps {
  videos: VideoItem[];

  loading?: boolean;
}

export default function YoutubePlayerCard({
  videos,

  loading = false,
}: YoutubePlayerCardProps) {
  const [playing, setPlaying] =
    useState(false);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator
          size="large"
          color="#1146B5"
        />
      </View>
    );
  }

  if (
    !videos ||
    videos.length === 0
  ) {
    return null;
  }

  const featuredVideo =
    videos[0];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {featuredVideo.title}
      </Text>

      <YoutubePlayer
        height={225}
        
        play={playing}
        videoId={
          featuredVideo.videoId
        }
        onChangeState={(
          state: any
        ) => {
          if (
            state ===
            "ended"
          ) {
            setPlaying(
              false
            );
          }
        }}
      />
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      marginTop: 25,
      marginBottom: 20
    },

    loader: {
      marginTop: 25,

      alignItems:
        "center",
    },

    title: {
      fontSize: 15,

      fontWeight: "800",

      color:
        "rgba(0,0,0,0.8)",

      marginBottom: 10,
    },
  });