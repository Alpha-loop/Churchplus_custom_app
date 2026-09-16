import {
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

interface Props {
  imageSource: any;

  onPress: () => void;
}

export default function PaymentOptionCard({
  imageSource,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
    >
      <Image
        source={imageSource}
        resizeMode="contain"
        style={styles.image}
      />
    </TouchableOpacity>
  );
}

const styles =
  StyleSheet.create({
    card: {
      marginBottom: 15,
    },

    image: {
      width: "100%",
      height: 60,
    },
  });