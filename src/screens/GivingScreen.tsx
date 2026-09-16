import { useState } from "react";

import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  ChevronRight,
  HandCoins,
} from "lucide-react-native";

import useOnlineGiving from "@/modules/giving/hooks/useOnlineGiving";

import EventImagePlaceholder from "../components/events/EventImagePlaceholder";

import { useTheme } from "@/theme/ThemeContext";

const PRESET_AMOUNTS = [
  50, 100, 250,
];

export default function ModernGivingScreen({
  navigation,
}: any) {
  const { colors } = useTheme();

  const {
    categories,
    loading,
  } = useOnlineGiving();

  const [
    selectedAmount,
    setSelectedAmount,
  ] = useState(
    PRESET_AMOUNTS[0]
  );

  const [
    customAmount,
    setCustomAmount,
  ] = useState("");

  const openCategory = (
    category: any
  ) => {
    navigation.navigate(
      "ExternalUrl",
      {
        title: category.name,

        uri: `https://my.churchplus.co/give/${category.id}`,
      }
    );
  };

  const onGiveNow = () => {
    if (categories.length === 0) {
      return;
    }

    openCategory(
      categories[0]
    );
  };

  if (loading) {
    return (
      <View
        style={[
          styles.centerWrap,
          { backgroundColor: colors.background },
        ]}
      >
        <ActivityIndicator
          size="large"
          color={colors.primary}
        />
      </View>
    );
  }

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
      contentContainerStyle={{
        padding: 16,

        paddingBottom: 40,
      }}
      showsVerticalScrollIndicator={
        false
      }
    >
      <View
        style={
          styles.heroWrap
        }
      >
        <EventImagePlaceholder
          height={160}
        />
      </View>

      <Text
        style={[
          styles.title,
          { color: colors.textPrimary },
        ]}
      >
        Giving
      </Text>

      <Text
        style={[
          styles.subtitle,
          { color: colors.textSecondary },
        ]}
      >
        Your generosity
        sustains our
        community and its
        outreach programs.
      </Text>

      <View
        style={
          styles.amountRow
        }
      >
        {PRESET_AMOUNTS.map(
          amount => {
            const active =
              selectedAmount ===
                amount &&
              !customAmount;

            return (
              <TouchableOpacity
                key={amount}
                onPress={() => {
                  setSelectedAmount(
                    amount
                  );

                  setCustomAmount(
                    ""
                  );
                }}
                style={[
                  styles.amountPill,
                  {
                    backgroundColor: active
                      ? colors.primary
                      : colors.surface,
                    borderColor: active
                      ? colors.primary
                      : colors.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.amountPillText,
                    {
                      color: active
                        ? "#FFFFFF"
                        : colors.textSecondary,
                    },
                  ]}
                >
                  ${amount}
                </Text>
              </TouchableOpacity>
            );
          }
        )}

        <TouchableOpacity
          onPress={() =>
            setCustomAmount(
              customAmount ||
                "0"
            )
          }
          style={[
            styles.amountPill,
            {
              backgroundColor:
                customAmount !== ""
                  ? colors.primary
                  : colors.surface,
              borderColor:
                customAmount !== ""
                  ? colors.primary
                  : colors.border,
            },
          ]}
        >
          <Text
            style={[
              styles.amountPillText,
              {
                color:
                  customAmount !== ""
                    ? "#FFFFFF"
                    : colors.textSecondary,
              },
            ]}
          >
            Custom
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onGiveNow}
        disabled={
          categories.length ===
          0
        }
        style={[
          styles.giveButton,
          { backgroundColor: colors.primary },
          categories.length ===
            0 &&
            styles.giveButtonDisabled,
        ]}
      >
        <Text
          style={
            styles.giveButtonText
          }
        >
          Give Now
        </Text>

        <ChevronRight
          size={18}
          color="#FFFFFF"
        />
      </TouchableOpacity>

      <Text
        style={[
          styles.sectionTitle,
          { color: colors.textPrimary },
        ]}
      >
        Where to Direct Your
        Gift
      </Text>

      {categories.length > 0 ? (
        categories.map(
          (category: any) => (
            <TouchableOpacity
              key={
                category.id
              }
              activeOpacity={0.85}
              onPress={() =>
                openCategory(
                  category
                )
              }
              style={[
                styles.fundCard,
                { backgroundColor: colors.surface },
              ]}
            >
              <View
                style={[
                  styles.fundIcon,
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
                  styles.fundName,
                  { color: colors.textPrimary },
                ]}
              >
                {category.name}
              </Text>

              <ChevronRight
                size={18}
                color={colors.textMuted}
              />
            </TouchableOpacity>
          )
        )
      ) : (
        <Text
          style={[
            styles.emptyText,
            { color: colors.textMuted },
          ]}
        >
          No giving funds have
          been set up for this
          church yet.
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  centerWrap: {
    flex: 1,

    alignItems: "center",

    justifyContent: "center",
  },

  heroWrap: {
    borderRadius: 16,

    overflow: "hidden",

    marginBottom: 16,
  },

  title: {
    fontSize: 24,

    fontWeight: "800",
  },

  subtitle: {
    fontSize: 14,

    marginTop: 6,

    marginBottom: 18,

    lineHeight: 20,
  },

  amountRow: {
    flexDirection: "row",

    gap: 8,

    marginBottom: 16,
  },

  amountPill: {
    flex: 1,

    alignItems: "center",

    paddingVertical: 12,

    borderRadius: 20,

    borderWidth: 1,
  },

  amountPillText: {
    fontSize: 14,

    fontWeight: "700",
  },

  giveButton: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    gap: 8,

    borderRadius: 24,

    paddingVertical: 15,

    marginBottom: 28,
  },

  giveButtonDisabled: {
    opacity: 0.5,
  },

  giveButtonText: {
    color: "#FFFFFF",

    fontWeight: "700",

    fontSize: 15,
  },

  sectionTitle: {
    fontSize: 16,

    fontWeight: "700",

    marginBottom: 12,
  },

  fundCard: {
    flexDirection: "row",

    alignItems: "center",

    gap: 12,

    borderRadius: 14,

    padding: 14,

    marginBottom: 10,
  },

  fundIcon: {
    width: 38,

    height: 38,

    borderRadius: 19,

    alignItems: "center",

    justifyContent: "center",
  },

  fundName: {
    flex: 1,

    fontSize: 14,

    fontWeight: "700",
  },

  emptyText: {
    fontSize: 13,

    textAlign: "center",

    paddingVertical: 20,
  },
});