import React from "react";

import {
  Image,
  ImageStyle,
  StyleProp,
  useWindowDimensions,
} from "react-native";

import {
  VideoView,
  useVideoPlayer,
} from "expo-video";

import AutoHeightImage from "@/shared/AutoHeightImage";

interface MediaRendererProps {
  mediaUrl?: string | null;

  type?: "Video" | "Picture";

  style?: StyleProp<ImageStyle>;
}

export default function MediaRenderer({
  mediaUrl,
  type,
  style,
}: MediaRendererProps) {
  const { width } =
    useWindowDimensions();

  if (!mediaUrl) {
    return null;
  }

  if (type === "Video") {
    const player =
      useVideoPlayer(
        mediaUrl,
        (player) => {
          player.play();
        }
      );

    return (
      <VideoView
        player={player}
        style={[
          {
            width: "100%",
            height: 220,
            borderRadius: 12,
          },
          style,
        ]}
        allowsFullscreen
        allowsPictureInPicture
      />
    );
  }

  if (type === "Picture") {
    return (
      <AutoHeightImage
        source={{
          uri: mediaUrl,
        }}
        resizeMode="cover"
        style={[
          {
            width:
              width - 32,
            height: 320,
            // borderRadius: 12,
          },
          style,
        ]}
      />
    );
  }

  return null;
}