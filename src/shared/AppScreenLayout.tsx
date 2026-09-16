import {
  ReactNode,
} from "react";

import {
  RefreshControl,
  ScrollView,
  StyleSheet,
} from "react-native";

import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import {
  ViewStyle,
} from "react-native";

interface AppScreenLayoutProps {
  children: ReactNode;

  refreshing?: boolean;

  onRefresh?: () => void;

  contentStyle?: ViewStyle;

  // Set to false for screens whose content is itself a scrollable
  // list (FlatList/SectionList) — wrapping a vertical list in this
  // component's own ScrollView triggers React Native's
  // "VirtualizedLists should never be nested inside plain
  // ScrollViews with the same orientation" warning and breaks the
  // list's windowing/virtualization. Defaults to true for screens
  // with plain (non-list) scrollable content.
  scrollable?: boolean;
}

export default function AppScreenLayout({
  children,

  refreshing = false,

  onRefresh,

  contentStyle,

  scrollable = true,
}: AppScreenLayoutProps) {
  const insets = useSafeAreaInsets();

  if (!scrollable) {
    return (
      <SafeAreaView
        style={[styles.container, contentStyle]}
        edges={["bottom"]}
      >
        {children}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, contentStyle]}
      edges={["bottom"]}
    >
      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={{
          paddingBottom: insets.bottom,
          flexGrow: 1,
        }}
        refreshControl={
          onRefresh ? (
            <RefreshControl
              refreshing={
                refreshing
              }
              onRefresh={
                onRefresh
              }
            />
          ) : undefined
        }
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,

      backgroundColor:
        "#F8F9FC",

      // backgroundColor: 'green'
    },

    // content: {
    //   paddingBottom: 40,
    // },
  });