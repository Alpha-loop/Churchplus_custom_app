import { View } from "react-native";

import Svg, {
  Circle,
  Path,
} from "react-native-svg";

import type { SocialPlatform } from "@/modules/about/utils/aboutProfile";

import { SOCIAL_BRANDS } from "@/modules/about/utils/socialBrands";

// A social platform's logo as a round icon. Returns null for a
// platform with no logo (LinkedIn, anything unknown) — the caller
// shows its neutral icon instead, see hasSocialIcon().
//
// Purely decorative: the row it sits in already says the platform's
// name in text, so screen readers skip it.
export const hasSocialIcon = (
  platform: SocialPlatform
) => Boolean(SOCIAL_BRANDS[platform]);

export default function SocialIcon({
  platform,
  size = 36,
}: {
  platform: SocialPlatform;
  size?: number;
}) {
  const brand =
    SOCIAL_BRANDS[platform];

  if (!brand) {
    return null;
  }

  if (brand.style === "badge") {
    // X and TikTok are black: on a dark card the circle's edge
    // would vanish, so those get a faint light ring.
    const isBlack =
      brand.color === "#000000";

    return (
      <View
        accessible={false}
        importantForAccessibility="no-hide-descendants"
        style={{
          width: size,

          height: size,

          borderRadius: size / 2,

          backgroundColor:
            brand.color,

          alignItems: "center",

          justifyContent: "center",

          borderWidth: isBlack
            ? 1
            : 0,

          borderColor:
            "rgba(255,255,255,0.28)",
        }}
      >
        <Svg
          width={size * 0.5}
          height={size * 0.5}
          viewBox="0 0 24 24"
        >
          <Path
            d={brand.path}
            fill="#FFFFFF"
          />
        </Svg>
      </View>
    );
  }

  // "disc": the logo is itself a circle with a cut-out. Over a white
  // disc the cut-out ("f", paper plane) stays white on any card
  // colour; without it, a dark card shows through and turns it dark.
  // Radius 12 exactly — smaller clips the bottom of Facebook's "f".
  return (
    <View
      accessible={false}
      importantForAccessibility="no-hide-descendants"
    >
      <Svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
      >
        <Circle
          cx={12}
          cy={12}
          r={12}
          fill="#FFFFFF"
        />

        <Path
          d={brand.path}
          fill={brand.color}
        />
      </Svg>
    </View>
  );
}
