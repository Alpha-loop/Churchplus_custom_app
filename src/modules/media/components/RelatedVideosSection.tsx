import {
  Text,
  View,
} from "react-native";

import RelatedVideoCard
from "./RelatedVideoCard";

export default function RelatedVideosSection({
  videos,
  currentVideoId,
  onSelect,
}: any) {
  const related =
    videos.filter(
      (video: any) =>
        video.videoId !==
        currentVideoId
    );

  return (
    <View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "700",
          marginBottom: 10,
        }}
      >
        More Videos
      </Text>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        {related.map(
          (video: any) => (
            <RelatedVideoCard
              key={
                video.videoId
              }
              video={video}
              onPress={
                onSelect
              }
            />
          )
        )}
      </View>
    </View>
  );
}