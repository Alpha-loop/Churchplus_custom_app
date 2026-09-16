import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Devotional }
from "../types/devotional.types";

interface Props {
  devotion: Devotional;

  onPress: (
    devotion: Devotional
  ) => void;
}

export default function PreviousDevotionCard({
  devotion,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      onPress={() =>
        onPress(
          devotion
        )
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
              devotion.mediaUrl,
          }}
          style={
            styles.image
          }
        />

        <Text
          style={
            styles.date
          }
        >
          {devotion.date}
        </Text>

        <Text
          style={
            styles.title
          }
        >
          {devotion.title}
        </Text>

        <Text
          style={
            styles.author
          }
        >
          {devotion.author}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles =
  StyleSheet.create({
    container: {
      width: 121,
    },

    image: {
      width: 121,
      height: 121,
      borderRadius: 10,
    },

    date: {
      marginTop: 5,
      fontSize: 10,
      color: "#666",
    },

    title: {
      marginTop: 3,
      fontSize: 13,
      fontWeight: "600",
    },

    author: {
      marginTop: 3,
      fontSize: 10,
      color: "#666",
    },
  });