import {
  Image,
  StyleSheet,
} from "react-native";

interface Props {
  bannerUrl?: string;
}

export default function EventBanner({
  bannerUrl,
}: Props) {
  if (!bannerUrl) {
    return null;
  }

  return (
    <Image
      source={{
        uri: bannerUrl,
      }}
      style={styles.image}
      resizeMode="cover"
    />
  );
}

const styles =
  StyleSheet.create({
    image: {
      width: "100%",
      height: 220,
    },
  });