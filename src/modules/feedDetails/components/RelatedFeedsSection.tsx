import {
  StyleSheet,
  Text,
  View,
} from "react-native";

interface Props {
  feeds: any[];

  onFeedPress: (
    feed: any
  ) => void;
}

export default function RelatedFeedsSection({
  feeds,
  onFeedPress,
}: Props) {
  if (
    !feeds ||
    feeds.length === 0
  ) {
    return null;
  }

  return (
    <View
      style={styles.container}
    >
      <Text
        style={styles.title}
      >
        Also from Feeds
      </Text>

      {/* We'll render feed cards here next */}
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      marginTop: 30,
    },

    title: {
      fontSize: 18,

      fontWeight: "700",

      marginBottom: 15,
    },
  });