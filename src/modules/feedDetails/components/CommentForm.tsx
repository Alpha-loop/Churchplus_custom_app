import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import AppButton from "@/shared/AppButton";

interface Props {
  value: string;

  loading: boolean;

  onChangeText: (
    text: string
  ) => void;

  onSubmit: () => void;
}

export default function CommentForm({
  value,
  loading,
  onChangeText,
  onSubmit,
}: Props) {
  return (
    <View
      style={styles.container}
    >
      <Text
        style={styles.title}
      >
        Add Comment
      </Text>

      <TextInput
        multiline
        numberOfLines={5}
        placeholder="Type your comment..."
        value={value}
        onChangeText={
          onChangeText
        }
        style={styles.input}
      />

      <AppButton
        title="Post Comment"
        loading={loading}
        onPress={onSubmit}
      />
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      marginTop: 30,
    },

    title: {
      fontSize: 16,
      fontWeight: "600",
    },

    input: {
      minHeight: 100,

      marginTop: 10,

      marginBottom: 40,

      borderRadius: 12,

      padding: 15,

      borderWidth: 0.5,

      borderColor: '#ccc',

      backgroundColor:
        "rgba(217,217,217,0.2)",

      textAlignVertical:
        "top",
    },
  });