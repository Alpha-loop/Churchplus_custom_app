import {
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

interface Props {
  value: boolean;

  onChange: (
    value: boolean
  ) => void;
}

export default function ProfileVisibilityToggle({
  value,
  onChange,
}: Props) {
  return (
    <View style={styles.container}>
      <Text>
        Make profile searchable
      </Text>

      <Switch
        value={value}
        onValueChange={
          onChange
        }
      />
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flexDirection:
        "row",

      justifyContent:
        "space-between",

      alignItems:
        "center",

      marginHorizontal:
        20,

      marginBottom: 20,
    },
  });