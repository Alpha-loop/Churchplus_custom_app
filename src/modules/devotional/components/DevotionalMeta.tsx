import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import {
  Devotional,
} from "../types/devotional.types";

interface Props {
  devotion: Devotional;
}

export default function DevotionalMeta({
  devotion,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.date}>
        {devotion.date}
      </Text>

      <Text style={styles.title}>
        {devotion.title}
      </Text>

      {!!devotion.bibleVerse && (
        <Text style={styles.verse}>
          {devotion.bibleVerse}
        </Text>
      )}
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      alignItems:
        "center",
    },

    date: {
      color: "#777",
      fontSize: 15,
    },

    title: {
      fontSize: 20,
      fontWeight: "700",
      color: "#124191",
      textAlign: "center",
      marginTop: 8,
    },

    verse: {
      marginTop: 10,
      color: "#666",
    },
  });