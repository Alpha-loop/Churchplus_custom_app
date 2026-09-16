import {
  StyleSheet,
  View,
} from "react-native";

import {
  Search,
} from "lucide-react-native";

import AppInput from "@/shared/AppInput";

interface Props {
  value: string;

  onChangeText: (
    text: string
  ) => void;
}

export default function MediaSearchBar({
  value,

  onChangeText,
}: Props) {
  return (
    <View
      style={styles.container}
    >
      <AppInput
        placeholder="Search media"
        value={value}
        onChangeText={
          onChangeText
        }
        leftIcon={
          <Search
            size={18}
            color="#666"
          />
        }
      />
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      marginHorizontal: 15,

      marginTop: 10,
    },
  });