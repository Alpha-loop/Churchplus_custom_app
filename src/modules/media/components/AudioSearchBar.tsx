import {
  StyleSheet,
  View,
} from "react-native";

import AppInput from "@/shared/AppInput";
// Replace AppInput with whatever input component
// your new project is already using.

interface Props {
  value: string;

  onChangeText: (
    text: string
  ) => void;
}

export default function AudioSearchBar({
  value,
  onChangeText,
}: Props) {
  return (
    <View style={styles.searchForm}>
      <AppInput
        placeholder="Search for audios"
        value={value}
        onChangeText={
          onChangeText
        }
        leftIcon="search"
      />
    </View>
  );
}

const styles =
  StyleSheet.create({
    searchForm: {
      marginHorizontal: 15,

      borderRadius: 10,

      flexDirection:
        "row",

      marginTop: 20,

      alignItems:
        "center",
    },
  });