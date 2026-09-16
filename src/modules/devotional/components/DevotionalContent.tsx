import {
  Text,
  StyleSheet,
} from "react-native";

interface Props {
  content: string;
}

export default function DevotionalContent({
  content,
}: Props) {
  return (
    <Text style={styles.content}>
      {content}
    </Text>
  );
}

const styles =
  StyleSheet.create({
    content: {
      marginTop: 25,
      lineHeight: 24,
      color: "#444",
    },
  });