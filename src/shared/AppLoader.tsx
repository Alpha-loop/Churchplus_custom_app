import {
  ActivityIndicator,
  StyleSheet,
  View,
} from "react-native";

interface AppLoaderProps {
  fullScreen?: boolean;
}

export default function AppLoader({
  fullScreen = false,
}: AppLoaderProps) {
  return (
    <View
      style={[
        styles.container,

        fullScreen &&
          styles.fullScreen,
      ]}
    >
      <ActivityIndicator
        size="large"
        color="#1146B5"
      />
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      justifyContent:
        "center",

      alignItems: "center",

      padding: 20,
    },

    fullScreen: {
      flex: 1,
    },
  });