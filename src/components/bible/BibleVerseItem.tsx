import { Text } from "react-native";

import { useTheme } from "@/theme/ThemeContext";

interface Props {
  number: number;

  text: string;

  fontSize: number;

  lineHeight: number;
}

export default function BibleVerseItem({
  number,
  text,
  fontSize,
  lineHeight,
}: Props) {
  const { colors } = useTheme();

  return (
    <Text
      style={{
        fontSize,

        lineHeight,

        marginBottom: 14,

        color: colors.textPrimary,
      }}
    >
      <Text
        style={{
          fontWeight: "700",

          color: colors.primary,
        }}
      >
        {number}{" "}
      </Text>

      {text}
    </Text>
  );
}
