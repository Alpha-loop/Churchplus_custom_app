import {
  View,
  Text,
  Image,
  StyleSheet,
} from "react-native";

import { Devotional }
from "../types/devotional.types";

interface Props {
  devotion: Devotional;
}

export default function DevotionalHero({
  devotion,
}: Props) {
  return (
    <View>
      <Image
        source={
          devotion?.mediaUrl
            ? { uri: devotion.mediaUrl }
            : require("../../../assets/img/familydevotion.png")
        }
        style={
          styles.heroImage
        }
      />

      <View
        style={
          styles.content
        }
      >
        <Text
          style={
            styles.date
          }
        >
          {devotion.date}
        </Text>

        <Text
          style={
            styles.readToday
          }
        >
          Read today's Devotion
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
            styles.verse
          }
        >
          {devotion.bibleVerse}
        </Text>
      </View>
    </View>
  );
}

const styles =
  StyleSheet.create({
    heroImage: {
      width: "100%",
      height: 250,
    },

    content: {
      padding: 20,
      backgroundColor:
        "rgba(25,186,255,0.1)",
    },

    date: {
      fontSize: 13,
    },

    readToday: {
      marginTop: 5,
      fontSize: 15,
      fontWeight: "600",
    },

    title: {
      marginTop: 20,
      fontSize: 20,
      fontWeight: "700",
      textAlign: "center",
    },

    verse: {
      marginTop: 10,
      textAlign: "center",
    },
  });