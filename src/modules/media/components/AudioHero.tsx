import {
  Image,
  StyleSheet,
} from "react-native";

interface Props {
  imagePath?: string;
}

export default function AudioHero({
  imagePath,
}: Props) {
  return (
    <Image
      source={{
        uri:
          imagePath ||
          "https://via.placeholder.com/500",
      }}
      resizeMode="cover"
      style={styles.image}
    />
  );
}

const styles =
  StyleSheet.create({
    image: {
      width: "100%",
      height: 250,
      borderRadius: 10,
    },
  });