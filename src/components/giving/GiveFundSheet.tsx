import {
  forwardRef,
  useCallback,
} from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";

import {
  ChevronRight,
  HandCoins,
} from "lucide-react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme } from "@/theme/ThemeContext";

import type { GiveFund } from "@/modules/giving/hooks/useGiveAction";

interface Props {
  funds: GiveFund[];

  onSelect: (
    fund: GiveFund
  ) => void;
}

// Shown only when a church has more than one fund — with a single
// fund, "Give" goes straight to its page instead.
const GiveFundSheet = forwardRef<
  BottomSheetModal,
  Props
>(({ funds, onSelect }, ref) => {
  const { colors } = useTheme();

  const insets =
    useSafeAreaInsets();

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

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={["50%", "85%"]}
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
      <BottomSheetScrollView
        contentContainerStyle={{
          padding: 20,

          paddingBottom:
            24 + insets.bottom,
        }}
      >
        <Text
          style={[
            styles.title,
            { color: colors.textPrimary },
          ]}
        >
          Where would you like to
          give?
        </Text>

        {funds.map(fund => (
          <TouchableOpacity
            key={fund.id}
            activeOpacity={0.85}
            onPress={() =>
              onSelect(fund)
            }
            style={[
              styles.row,
              { borderBottomColor: colors.divider },
            ]}
          >
            <View
              style={[
                styles.icon,
                { backgroundColor: colors.primaryMuted },
              ]}
            >
              <HandCoins
                size={18}
                color={colors.primary}
              />
            </View>

            <Text
              style={[
                styles.name,
                { color: colors.textPrimary },
              ]}
              numberOfLines={2}
            >
              {fund.name}
            </Text>

            <ChevronRight
              size={18}
              color={colors.textMuted}
            />
          </TouchableOpacity>
        ))}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
});

export default GiveFundSheet;

const styles = StyleSheet.create({
  title: {
    textAlign: "center",

    fontSize: 17,

    fontWeight: "700",

    marginBottom: 12,
  },

  row: {
    flexDirection: "row",

    alignItems: "center",

    gap: 12,

    paddingVertical: 14,

    borderBottomWidth: 1,
  },

  icon: {
    width: 38,

    height: 38,

    borderRadius: 19,

    alignItems: "center",

    justifyContent: "center",
  },

  name: {
    flex: 1,

    fontSize: 15,

    fontWeight: "600",
  },
});
