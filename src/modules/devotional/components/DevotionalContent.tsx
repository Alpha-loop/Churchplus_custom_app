import {
  Text,
  StyleSheet,
} from "react-native";

import { stripHtml } from "@/utils/text/stripHtml";

interface Props {
  content: string;
}

export default function DevotionalContent({
  content,
}: Props) {
  return (
    <Text style={styles.content}>
      {stripHtml(content)}
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