import {
  Text,
  StyleSheet,
} from "react-native";

interface Props {
  verse?: string;

  reference?: string;
}

export default function MemoryVerseCard({
  verse,
  reference,
}: Props) {
  if (!verse) {
    return null;
  }

  return (
    <Text style={styles.text}>
      “{verse}”
      {" "}
      <Text
        style={
          styles.reference
        }
      >
        {reference}
      </Text>
    </Text>
  );
}

const styles =
  StyleSheet.create({
    text: {
      marginTop: 20,
      lineHeight: 28,
      fontSize: 18,
      textAlign: "center",
      color: "#555",
    },

    reference: {
      color: "#124191",
      fontWeight:
        "700",
    },
  });