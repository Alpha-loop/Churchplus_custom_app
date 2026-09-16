import {
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import { Search } from "lucide-react-native";

import { useTheme } from "@/theme/ThemeContext";

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
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.wrap,
        { backgroundColor: colors.surfaceAlt },
      ]}
    >
      <Search
        size={18}
        color={colors.textMuted}
      />

      <TextInput
        value={value}
        onChangeText={
          onChangeText
        }
        placeholder="Search sermons, hymns, or prayers..."
        placeholderTextColor={colors.textMuted}
        style={[
          styles.input,
          { color: colors.textPrimary },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",

    alignItems: "center",

    gap: 10,

    borderRadius: 14,

    paddingHorizontal: 14,

    height: 46,
  },

  input: {
    flex: 1,

    fontSize: 14,
  },
});