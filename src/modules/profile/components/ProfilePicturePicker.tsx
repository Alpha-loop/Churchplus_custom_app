import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import AppButton from "@/shared/AppButton";

interface Props {
  imageUri?: string;

  onPress: () => void;
}

export default function ProfilePicturePicker({
  imageUri,
  onPress,
}: Props) {
  return (
    <View style={styles.container}>
      <Image
        source={
          imageUri
          ? {
              uri:
                imageUri
            }
          : require("../../../assets/img/avatar.png")
      }
        style={styles.avatar}
      />

      <AppButton
        title="Select Picture"
        onPress={onPress}
        variant="secondary"
      />
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      alignItems: "center",

      marginTop: 20,
    },

    avatar: {
      width: 100,

      height: 100,

      borderRadius: 50,

      marginBottom: 15,
    },
  });