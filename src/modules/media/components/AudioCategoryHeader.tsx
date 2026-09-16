import {
  Text,
  StyleSheet,
} from "react-native";

interface Props {
  title: string;
}

export default function AudioCategoryHeader({
  title,
}: Props) {
  return (
    <Text style={styles.title}>
      {title}
    </Text>
  );
}

const styles =
  StyleSheet.create({
    title: {
      fontSize: 15,
      fontWeight:
        "700",
      marginBottom:
        10,
    },
  });