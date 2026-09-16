import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  AudioMedia,
} from "../types/media.types";

interface Props {
  audio: AudioMedia;

  onPress: (
    audio: AudioMedia
  ) => void;
}

export default function AudioCard({
  audio,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      onPress={() =>
        onPress(audio)
      }
    >
      <View
        style={
          styles.container
        }
      >
        <Image
          source={{
            uri:
              audio.imagePath ||
              "https://via.placeholder.com/300",
          }}
          style={
            styles.image
          }
        />

        <View
          style={
            styles.content
          }
        >
          <Text
            style={
              styles.title
            }
          >
            {audio.name}
          </Text>

          <Text
            style={
              styles.views
            }
          >
            {audio.viewCount ===
            0
              ? "No views yet"
              : audio.viewCount ===
                  1
                ? "1 View"
                : `${audio.viewCount} Views`}
          </Text>

          {audio.isFree ? (
            <Text
              style={
                styles.free
              }
            >
              FREE
            </Text>
          ) : (
            <Text
              style={
                styles.price
              }
            >
              {
                audio.price
              }
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles =
  StyleSheet.create({
    container: {
      width: "100%",
    },

    image: {
      width: "100%",
      height: 200,
      borderRadius: 10,
    },

    content: {
      marginTop: 10,
    },

    title: {
      fontSize: 12,
      fontWeight:
        "700",
    },

    views: {
      fontSize: 11,
      color:
        "#777",
      marginTop: 2,
    },

    free: {
      color:
        "#E27F06",
      fontWeight:
        "700",
      marginTop: 3,
    },

    price: {
      color:
        "#124191",
      fontWeight:
        "700",
      marginTop: 3,
    },
  });