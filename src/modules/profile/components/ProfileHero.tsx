import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  UserProfile,
} from "../types/profile.types";

interface Props {
  profile: UserProfile;

  onImagePress: () => void;
}

export default function ProfileHero({
  profile,
  onImagePress,
}: Props) {

  console.log(
    "PROFILE SCREEN:",
    JSON.stringify(profile, null, 2)
  );
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onImagePress}
      >
        <Image
          source={
            profile.pictureUrl
            ? {
                uri:
                  profile.pictureUrl
              }
            : require("../../../assets/img/avatar.png")
        }
          style={styles.avatar}
        />
      </TouchableOpacity>

      <Text style={styles.name}>
        {profile.firstName ?? ""}
        {" "}
        {profile.lastName ?? ""}
      </Text>

      {!!profile.about && (
        <Text style={styles.about}>
          {profile.about}
        </Text>
      )}
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      alignItems: "center",

      padding: 20,
    },

    avatar: {
      width: 100,

      height: 100,

      borderRadius: 50,
    },

    name: {
      marginTop: 10,

      fontSize: 18,

      fontWeight: "700",
    },

    about: {
      marginTop: 5,

      textAlign: "center",

      color: "#555",
    },
  });