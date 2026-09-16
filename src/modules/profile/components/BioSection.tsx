import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import AppInput from "@/shared/AppInput";

interface Props {
  value: string;

  onChangeText: (
    value: string
  ) => void;
}

export default function BioSection({
  value,
  onChangeText,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Bio
      </Text>

      <AppInput
        value={value}
        onChangeText={
          onChangeText
        }
        placeholder="Write your bio here..."
        multiline
        numberOfLines={4}
      />
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      marginTop: 20,
    },

    title: {
      fontSize: 16,

      fontWeight: "700",

      marginBottom: 10,
    },
  });