import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";

import {
  Headphones,
  Play,
} from "lucide-react-native";

import {
  AudioMedia,
  VideoMedia,
} from "../types/media.types";

import { dateUtils } from "@/utils/date/date.utils";

const { width } =
  Dimensions.get("window");

type MediaItem =
  | AudioMedia
  | VideoMedia;

interface MediaCardProps {
  item: MediaItem;

  onPress: () => void;
}

export default function MediaCard({
  item,
  onPress,
}: MediaCardProps) {
  const isAudio =
    item.typeMedia ===
    "audio";

  const imageSource = isAudio
    ? item.imagePath
    : item.highThumbnailUrl;

  const viewCount = isAudio
    ? item.viewCount
    : item.statistics
        ?.viewCount;

  const date = isAudio
    ? item.dateAdded
    : item.publishedAt;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.container}
    >
      <ImageBackground
        source={{
          uri:
            imageSource ||
            "https://placeholder.com/68x68",
        }}
        style={styles.image}
        imageStyle={
          styles.imageRadius
        }
      >
        <View
          style={styles.overlay}
        >
          <View
            style={styles.iconContainer}
          >
            {isAudio ? (
              <Headphones
                size={28}
                color="#FFFFFF"
              />
            ) : (
              <Play
                size={28}
                color="#FFFFFF"
                fill="#FFFFFF"
              />
            )}
          </View>
        </View>
      </ImageBackground>

      <Text
        numberOfLines={1}
        style={styles.title}
      >
        {item.title || "No title"}
      </Text>

      <Text
        style={styles.meta}
      >
        {dateUtils.relativeDate(
          date
        )}{" "}
        | {viewCount || 0} views
      </Text>
    </TouchableOpacity>
  );
}

const styles =
  StyleSheet.create({
    container: {
      marginBottom: 15,
    },

    image: {
      height: 130,

      width:
        width / 2 - 20,

      justifyContent:
        "center",

      alignItems:
        "center",
    },

    imageRadius: {
      borderRadius: 10,
    },

    overlay: {
      flex: 1,

      width: "100%",

      justifyContent:
        "center",

      alignItems:
        "center",

      backgroundColor:
        "rgba(0,0,0,0.45)",

      borderRadius: 10,
    },

    iconContainer: {
      width: 50,

      height: 50,

      borderRadius: 25,

      justifyContent:
        "center",

      alignItems:
        "center",

      backgroundColor:
        "rgba(255,255,255,0.2)",
    },

    title: {
      fontSize: 12,

      fontWeight: "700",

      color:
        "rgba(0,0,0,0.85)",

      marginTop: 5,

      width:
        width / 2 - 20,
    },

    meta: {
      fontSize: 10,

      color:
        "rgba(0,0,0,0.6)",

      marginTop: 2,
    },
  });