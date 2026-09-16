import {
  useEffect,
  useState,
} from "react";

import {
  Dimensions,
  StyleProp,
  View,
  ActivityIndicator,
  Image as RNImage,
  ImageStyle,
} from "react-native";

import {
  Image,
  ImageSource,
  ImageContentFit,
} from "expo-image";

interface AutoHeightImageProps {
  source: ImageSource | string;

  width?: number;

  style?: StyleProp<ImageStyle>;

  resizeMode?: ImageContentFit;

  fallbackHeight?: number;
}

export default function AutoHeightImage({
  source,

  width,

  style,

  resizeMode = "cover",

  fallbackHeight = 200,
}: AutoHeightImageProps) {
  const [height, setHeight] =
    useState<number | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const screenWidth =
    Dimensions.get(
      "window"
    ).width;

  const imageWidth =
    width || screenWidth;

  useEffect(() => {
    let mounted = true;

    const calculateImageSize =
      async () => {
        try {
          if (
            typeof source ===
            "string"
          ) {
            RNImage.getSize(
              source,
              (
                intrinsicWidth: number,
                intrinsicHeight: number
              ) => {
                if (!mounted)
                  return;

                const calculatedHeight =
                  Math.round(
                    (intrinsicHeight /
                      intrinsicWidth) *
                      imageWidth
                  );

                setHeight(
                  calculatedHeight
                );

                setLoading(false);
              },
              () => {
                if (!mounted)
                  return;

                setHeight(
                  fallbackHeight
                );

                setLoading(false);
              }
            );
          } else {
            setHeight(
              fallbackHeight
            );

            setLoading(false);
          }
        } catch (error) {
          setHeight(
            fallbackHeight
          );

          setLoading(false);
        }
      };

    calculateImageSize();

    return () => {
      mounted = false;
    };
  }, [
    source,
    imageWidth,
    fallbackHeight,
  ]);

  if (loading) {
    return (
      <View
        style={{
          width: imageWidth,

          height:
            fallbackHeight,

          justifyContent:
            "center",

          alignItems:
            "center",
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Image
      source={
        typeof source ===
        "string"
          ? { uri: source }
          : source
      }
      contentFit={resizeMode}
      transition={200}
      style={[
        {
          width: imageWidth,

          height:
            height ||
            fallbackHeight,
        },

        style,
      ]}
    />
  );
}