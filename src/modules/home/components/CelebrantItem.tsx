import {
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import {
  useNavigation,
} from "@react-navigation/native";

import {
  Celebrant,
} from "../types/home.types";

interface Props {
  celebrant: Celebrant;

  allCelebrants: Celebrant[];
}

export default function CelebrantItem({
  celebrant,
  allCelebrants,
}: Props) {
  const navigation =
    useNavigation<any>();

  const isBirthday =
    celebrant.celebration
      ?.toLowerCase() ===
    "birthday";

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(
          "Celebrants",
          {
            data:
              allCelebrants,
          }
        )
      }
    >
      <Image
        source={
          celebrant.photo
            ? {
                uri: celebrant.photo,
              }
            : require("../../../assets/img/avatar.png")
        }
        resizeMode="cover"
        style={styles.avatar}
      />

      <Image
        source={
          isBirthday
            ? require("../../../assets/img/birthday_cake.png")
            : require("../../../assets/img/wedding_anniversary.png")
        }
        resizeMode="contain"
        style={
          styles.badge
        }
      />
    </TouchableOpacity>
  );
}

const styles =
  StyleSheet.create({
    avatar: {
      width: 70,

      height: 70,

      borderRadius: 35,
    },

    badge: {
      width: 24,

      height: 24,

      position:
        "absolute",

      right: -4,

      bottom: -2,
    },
  });