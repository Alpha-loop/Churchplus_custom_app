import {
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  VideoMedia,
} from "../types/media.types";

interface Props {
  video: VideoMedia;

  onPress: (
    video: VideoMedia
  ) => void;
}

export default function RelatedVideoCard({
  video,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      onPress={() =>
        onPress(video)
      }
    >
      <View
        style={{
          marginTop: 10,
          width: Dimensions.get("window").width / 2 - 20,
        }}
      >
        <Image
          source={{
            uri:
              video.mediumThumbnailUrl ||
              video.highThumbnailUrl ||
              video.thumbnailUrl,
          }}
          style={{
            width: 180,
            height: 130,
            borderRadius: 10,
          }}
        />

        <Text
          numberOfLines={2}
          style={{
            marginTop: 10,
            fontWeight: "600",
            fontSize: 14,
          }}
        >
          {video.title}
        </Text>

        <Text
          style={{
            color: "#666",
            fontSize: 12,
          }}
        >
          {video.likeCount ?? 0}
          {" "}likes |{" "}
          {video.viewCount ?? 0}
          {" "}views
        </Text>
      </View>
    </TouchableOpacity>
  );
}