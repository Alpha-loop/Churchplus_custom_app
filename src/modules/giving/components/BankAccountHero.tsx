import {
  Image,
  StyleSheet,
} from "react-native";

export default function BankAccountHero() {
  return (
    <Image
      source={require(
        "../../../assets/img/giftbox.png"
      )}
      resizeMode="contain"
      style={styles.image}
    />
  );
}

const styles =
  StyleSheet.create({
    image: {
      alignSelf:
        "center",

      marginBottom: 20,
    },
  });