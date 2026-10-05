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

import {
  BibleFontSize,
  useBibleSettingsStore,
} from "@/modules/bible/store/bibleSettingsStore";

const SIZE_OPTIONS: {
  key: BibleFontSize;
  label: string;
  displaySize: number;
}[] = [
  { key: "small", label: "Small", displaySize: 14 },
  { key: "medium", label: "Medium", displaySize: 17 },
  { key: "large", label: "Large", displaySize: 20 },
  { key: "xlarge", label: "Extra Large", displaySize: 24 },
];

const FontSizeSheet = forwardRef<
  BottomSheetModal,
  {}
>((_props, ref) => {
  const { colors } = useTheme();

  const snapPoints = useMemo(
    () => ["40%"],
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

  const fontSize = useBibleSettingsStore(
    state => state.fontSize
  );

  const setFontSize = useBibleSettingsStore(
    state => state.setFontSize
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
          Text Size
        </Text>

        {SIZE_OPTIONS.map(
          option => (
            <TouchableOpacity
              key={option.key}
              activeOpacity={0.8}
              onPress={() => {
                setFontSize(
                  option.key
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
              <Text
                style={{
                  fontSize:
                    option.displaySize,

                  color: colors.textPrimary,
                }}
              >
                {option.label}
              </Text>

              {fontSize ===
              option.key ? (
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

export default FontSizeSheet;

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
});
