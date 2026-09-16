import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  ChevronLeft,
  Check,
  Sun,
  Moon,
  Smartphone,
} from "lucide-react-native";

import { useTheme } from "@/theme/ThemeContext";

// Logout lives directly in the side drawer (ModernMenuDrawer/
// ModernHeader) instead of here. Dark mode preference is the
// first real thing to live on this screen.
const THEME_OPTIONS: {
  key: "system" | "light" | "dark";
  label: string;
  Icon: typeof Sun;
}[] = [
  {
    key: "system",
    label: "Follow System",
    Icon: Smartphone,
  },
  {
    key: "light",
    label: "Light",
    Icon: Sun,
  },
  {
    key: "dark",
    label: "Dark",
    Icon: Moon,
  },
];

export default function SettingsScreen({
  navigation,
}: any) {
  const {
    colors,
    preference,
    setPreference,
  } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            colors.background,
        },
      ]}
    >
      <View
        style={[
          styles.topBar,
          {
            backgroundColor:
              colors.surface,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.goBack()
          }
          hitSlop={8}
        >
          <ChevronLeft
            size={22}
            color={
              colors.textPrimary
            }
          />
        </TouchableOpacity>

        <Text
          style={[
            styles.topBarTitle,
            {
              color:
                colors.textPrimary,
            },
          ]}
        >
          Settings
        </Text>

        <View
          style={{ width: 22 }}
        />
      </View>

      <View
        style={
          styles.content
        }
      >
        <Text
          style={[
            styles.sectionLabel,
            {
              color:
                colors.textMuted,
            },
          ]}
        >
          APPEARANCE
        </Text>

        <View
          style={[
            styles.card,
            {
              backgroundColor:
                colors.surface,
              borderColor:
                colors.border,
            },
          ]}
        >
          {THEME_OPTIONS.map(
            (
              { key, label, Icon },
              index
            ) => {
              const active =
                preference === key;

              return (
                <TouchableOpacity
                  key={key}
                  activeOpacity={0.8}
                  onPress={() =>
                    setPreference(
                      key
                    )
                  }
                  style={[
                    styles.row,
                    index > 0 && {
                      borderTopWidth: 1,
                      borderTopColor:
                        colors.divider,
                    },
                  ]}
                >
                  <Icon
                    size={18}
                    color={
                      active
                        ? colors.primary
                        : colors.textSecondary
                    }
                  />

                  <Text
                    style={[
                      styles.rowLabel,
                      {
                        color: active
                          ? colors.primary
                          : colors.textPrimary,

                        fontWeight: active
                          ? "700"
                          : "600",
                      },
                    ]}
                  >
                    {label}
                  </Text>

                  {active ? (
                    <Check
                      size={18}
                      color={
                        colors.primary
                      }
                    />
                  ) : null}
                </TouchableOpacity>
              );
            }
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  topBar: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent:
      "space-between",

    paddingHorizontal: 16,

    paddingTop: 54,

    paddingBottom: 14,
  },

  topBarTitle: {
    fontSize: 16,

    fontWeight: "700",
  },

  content: {
    padding: 16,
  },

  sectionLabel: {
    fontSize: 11,

    fontWeight: "700",

    letterSpacing: 0.5,

    marginBottom: 10,

    marginLeft: 4,
  },

  card: {
    borderRadius: 14,

    borderWidth: 1,

    overflow: "hidden",
  },

  row: {
    flexDirection: "row",

    alignItems: "center",

    gap: 12,

    paddingVertical: 14,

    paddingHorizontal: 14,
  },

  rowLabel: {
    flex: 1,

    fontSize: 15,
  },
});