import { forwardRef, useCallback, useMemo } from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import { Check } from "lucide-react-native";

import { useTheme } from "@/theme/ThemeContext";

import { BIBLE_VERSIONS } from "@/modules/bible/data/versions";

import { useBibleSettingsStore } from "@/modules/bible/store/bibleSettingsStore";

const BibleVersionSheet = forwardRef<
  BottomSheetModal,
  {}
>((_props, ref) => {
  const { colors } = useTheme();

  const snapPoints = useMemo(
    () => ["45%"],
    []
  );

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  const selected = useBibleSettingsStore(
    state => state.version
  );

  const setSelected = useBibleSettingsStore(
    state => state.setVersion
  );

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      backdropComponent={
        renderBackdrop
      }
      enablePanDownToClose
      backgroundStyle={{
        backgroundColor: colors.surface,
      }}
      handleIndicatorStyle={{
        backgroundColor: colors.border,
      }}
    >
      <BottomSheetView
        style={styles.container}
      >
        <Text
          style={[
            styles.title,
            { color: colors.textPrimary },
          ]}
        >
          Bible Version
        </Text>

        {BIBLE_VERSIONS.map(
          version => (
            <TouchableOpacity
              key={version.id}
              activeOpacity={0.8}
              onPress={() => {
                setSelected(
                  version.id
                );

                if (
                  ref &&
                  "current" in ref
                ) {
                  ref.current?.dismiss();
                }
              }}
              style={[
                styles.row,
                { borderBottomColor: colors.divider },
              ]}
            >
              <View>
                <Text
                  style={[
                    styles.abbreviation,
                    { color: colors.textPrimary },
                  ]}
                >
                  {
                    version.abbreviation
                  }
                </Text>

                <Text
                  style={[
                    styles.name,
                    { color: colors.textMuted },
                  ]}
                >
                  {version.name}
                </Text>
              </View>

              {selected ===
              version.id ? (
                <Check
                  size={20}
                  color={colors.primary}
                />
              ) : null}
            </TouchableOpacity>
          )
        )}
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default BibleVersionSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 20,
  },

  title: {
    textAlign: "center",

    fontSize: 17,

    fontWeight: "700",

    marginBottom: 20,
  },

  row: {
    flexDirection: "row",

    justifyContent:
      "space-between",

    alignItems: "center",

    paddingVertical: 14,

    borderBottomWidth: 1,
  },

  abbreviation: {
    fontSize: 14,

    fontWeight: "700",

    marginBottom: 2,
  },

  name: {
    fontSize: 12,
  },
});
