import {
  StyleSheet,
  Text,
  View,
} from "react-native";

interface Props {
  content: string;
}

export default function FeedContent({
  content,
}: Props) {
  return (
    <View
      style={
        styles.container
      }
    >
      <Text
        style={
          styles.content
        }
      >
        {content}
      </Text>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      padding: 15,
    },

    content: {
      fontSize: 16,

      lineHeight: 24,
    },
  });