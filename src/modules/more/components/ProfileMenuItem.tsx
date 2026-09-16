import {
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  TouchableRipple,
} from "react-native-paper";

interface Props {
  fullName?: string;

  pictureUrl?: string;

  onPress: () => void;
}

export default function ProfileMenuItem({
  fullName,
  pictureUrl,
  onPress,
}: Props) {
  return (
    <TouchableRipple
      rippleColor="rgba(223,239,255,0.74)"
      onPress={onPress}
    >
      <View style={styles.row}>
        <Image
          source={
            pictureUrl
              ? {
                  uri: pictureUrl,
                }
              : require(
                  "../../../assets/img/avatar.png"
                )
          }
          style={styles.avatar}
        />

        <Text style={styles.name}>
          {fullName ||
            "My Profile"}
        </Text>
      </View>
    </TouchableRipple>
  );
}

const styles =
  StyleSheet.create({
    row: {
      flexDirection: "row",

      alignItems: "center",

      gap: 10,

      paddingVertical: 10,

      paddingLeft: 20,
    },

    avatar: {
      width: 25,

      height: 25,

      borderRadius: 50,
    },

    name: {
      fontSize: 14,

      color: "#000",
    },
  });