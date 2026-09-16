import {
  StyleSheet,
  Text,
  View,
} from "react-native";

interface Props {
  details: string;
}

export default function CustomAboutContent({
  details,
}: Props) {
  return (
    <View
      style={
        styles.container
      }
    >
      <Text
        style={
          styles.text
        }
      >
        {details}
      </Text>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      margin: 15,
    },

    text: {
      fontSize: 13,

      lineHeight: 19,
    },
  });