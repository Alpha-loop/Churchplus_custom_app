import {
  Text,
  View,
} from "react-native";

import {
  AudioMedia,
} from "../types/media.types";

interface Props {
  audio: AudioMedia;
}

export default function AudioMetadata({
  audio,
}: Props) {
  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight:
            "700",
        }}
      >
        {audio.name}
      </Text>

      <Text
        style={{
          marginTop: 5,
          color:
            "#666",
        }}
      >
        {(audio.viewCount ??
          0) === 0
          ? "No views yet"
          : `${audio.viewCount} views`}
      </Text>

      {audio.isFree ? (
        <Text
          style={{
            color:
              "#E27F06",
            fontWeight:
              "700",
            marginTop: 5,
          }}
        >
          FREE
        </Text>
      ) : (
        <Text
          style={{
            color:
              "#124191",
            fontWeight:
              "700",
            marginTop: 5,
          }}
        >
          {audio.price}
        </Text>
      )}
    </View>
  );
}