import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  Play,
} from "lucide-react-native";

import {
  VideoMedia,
} from "../types/media.types";

import { dateUtils } from "@/utils/date/date.utils";

interface Props {
  item: VideoMedia;

  onPress: () => void;
}

export default function SermonVideoCard({
  item,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.container}
    >
      <ImageBackground
        source={{
          uri:
            item.highThumbnailUrl,
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
            style={
              styles.playButton
            }
          >
            <Play
              size={26}
              color="#FFFFFF"
              fill="#FFFFFF"
            />
          </View>
        </View>
      </ImageBackground>

      <Text
        numberOfLines={2}
        style={styles.title}
      >
        {item.title}
      </Text>

      <View
        style={styles.metaRow}
      >
        <Text
          style={styles.meta}
        >
          {dateUtils.relativeDate(
            item.publishedAt
          )}{" "}
          |{" "}
          {
            item.statistics
              ?.viewCount
          }{" "}
          views
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles =
  StyleSheet.create({
    container: {
      position:
        "relative",

      marginBottom: 15,

      width: 210,
    },

    image: {
      height: 120,

      width: 210,

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

    playButton: {
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
      color: "#000",

      fontWeight: "600",

      fontSize: 13,

      marginTop: 5,

      lineHeight: 18,
    },

    metaRow: {
      flexDirection:
        "row",

      alignItems:
        "center",

      marginTop: 4,
    },

    meta: {
      fontSize: 10,

      color:
        "rgba(0,0,0,0.6)",
    },
  });