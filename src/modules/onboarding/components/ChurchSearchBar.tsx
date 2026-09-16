import {
  StyleSheet,
  View,
} from "react-native";

import AppInput from "@/shared/AppInput";
// Replace with your existing input component

interface Props {
  placeholder: string;

  icon?: any;

  value: string;

  onChangeText: (
    text: string
  ) => void;

  marginTop?: number;
}

export default function ChurchSearchInput({
  placeholder,
  icon,
  value,
  onChangeText,
  marginTop = 30,
}: Props) {
  return (
    <View
      style={[
        styles.container,
        {
          marginTop,
        },
      ]}
    >
      <AppInput
        placeholder={
          placeholder
        }
        value={value}
        onChangeText={
          onChangeText
        }
        leftIcon={icon}
      />
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      marginHorizontal: 15,
    },
  });

