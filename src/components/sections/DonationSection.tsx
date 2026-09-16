import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Gift } from "lucide-react-native";

import { useTheme } from "@/theme/ThemeContext";

interface Props {
  title: string;

  body: string;

  ctaLabel: string;

  onPress: () => void;
}

export default function DonationSection({
  title,
  body,
  ctaLabel,
  onPress,
}: Props) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.surfaceAlt },
      ]}
    >
      <View
        style={[
          styles.iconWrap,
          { backgroundColor: colors.dangerMuted },
        ]}
      >
        <Gift
          size={26}
          color="#EA6C3C"
        />
      </View>

      <Text
        style={[
          styles.title,
          { color: colors.textPrimary },
        ]}
      >
        {title}
      </Text>

      <Text
        style={[
          styles.body,
          { color: colors.textSecondary },
        ]}
      >
        {body}
      </Text>

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        style={[
          styles.cta,
          { backgroundColor: colors.primary },
        ]}
      >
        <Text style={styles.ctaText}>
          {ctaLabel.toUpperCase()}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,

    paddingHorizontal: 20,

    alignItems: "center",

    height: 270,
  },

  iconWrap: {
    width: 52,

    height: 52,

    borderRadius: 26,

    alignItems: "center",

    justifyContent: "center",

    marginBottom: 14,
  },

  title: {
    fontSize: 19,

    fontWeight: "700",

    textAlign: "center",
  },

  body: {
    fontSize: 14,

    textAlign: "center",

    lineHeight: 20,

    marginTop: 8,

    marginBottom: 18,
  },

  cta: {
    borderRadius: 24,

    paddingVertical: 14,

    width: "100%",

    alignItems: "center",
  },

  ctaText: {
    color: "#FFFFFF",

    fontWeight: "700",

    fontSize: 13,

    letterSpacing: 0.5,
  },
});