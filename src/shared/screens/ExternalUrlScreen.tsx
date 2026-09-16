import {
  useState,
} from "react";

import {
  ActivityIndicator,
  StyleSheet,
  View,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import AppHeader from "@/shared/AppHeader";

import WebViewLoader from "../../modules/webview/components/WebViewLoader";

export default function ExternalUrlScreen({
  navigation,
  route,
}: any) {
  const {
    title,
    uri,
  } = route.params;

  const [
    loading,
    setLoading,
  ] = useState(true);

  return (
    <SafeAreaView
      style={
        styles.container
      }
      edges={[
        "left",
        "right",
        "bottom",
      ]}
    >
      <AppHeader
        title={title}
        onBackPress={() =>
          navigation.goBack()
        }
      />

      <WebViewLoader
        uri={uri}
        onLoaded={() =>
          setLoading(false)
        }
      />

      {loading && (
        <View
          style={
            styles.loader
          }
        >
          <ActivityIndicator
            size="large"
            color="#1146B5"
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,

      backgroundColor:
        "#FFFFFF",
    },

    loader: {
      position:
        "absolute",

      top: 0,

      left: 0,

      right: 0,

      bottom: 0,

      justifyContent:
        "center",

      alignItems:
        "center",

      backgroundColor:
        "#FFFFFF",
    },
  });