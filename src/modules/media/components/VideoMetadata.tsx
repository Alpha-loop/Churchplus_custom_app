import {
  Text,
  View,
} from "react-native";

import {
  VideoMedia,
} from "../types/media.types";

interface Props {
  video: VideoMedia;
}

export default function VideoMetadata({
  video,
}: Props) {
  return (
    <View>
      <Text
        style={{
          fontSize: 14,
          fontWeight: "600",
          marginTop: 15,
        }}
      >
        {video.title}
      </Text>

      <Text
        style={{
          color: "#666",
          marginTop: 4,
          fontSize: 12,
        }}
      >
        {video.likeCount ??
          0} likes
        {" | "}
        {video.viewCount ??
          0} views
      </Text>
    </View>
  );
}