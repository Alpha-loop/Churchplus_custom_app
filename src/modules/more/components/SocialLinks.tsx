import {
  Image,
  Linking,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  TouchableRipple,
} from "react-native-paper";

import {
  ChurchSocial,
} from "../types/more.types";

interface Props {
  churchSocials: ChurchSocial[];
}

export default function SocialLinks({
  churchSocials,
}: Props) {
  const facebook =
    churchSocials.find(
      social =>
        social.name
          .toLowerCase()
          .includes(
            "facebook"
          )
    );

  const instagram =
    churchSocials.find(
      social =>
        social.name
          .toLowerCase()
          .includes(
            "instagram"
          )
    );

  const twitter =
    churchSocials.find(
      social =>
        social.name
          .toLowerCase()
          .includes(
            "twitter"
          ) ||
        social.name
          .toLowerCase()
          .includes("x")
    );

  console.log(facebook)
  console.log(instagram)
  console.log(twitter)

  return (
    <View
      style={styles.container}
    >
      <Text
        style={styles.title}
      >
        Follow Us on Our
        Socials
      </Text>

      <View
        style={styles.iconsRow}
      >
        {facebook && (
          <TouchableRipple
            rippleColor="rgba(223,239,255,0.74)"
            onPress={() =>
              Linking.openURL(
                facebook.url
              )
            }
          >
            <Image
              source={require(
                "@/assets/img/fb.png"
              )}
              style={
                styles.icon
              }
            />
          </TouchableRipple>
        )}

        {instagram && (
          <TouchableRipple
            rippleColor="rgba(223,239,255,0.74)"
            onPress={() =>
              Linking.openURL(
                instagram.url
              )
            }
          >
            <Image
              source={require(
                "@/assets/img/ig.png"
              )}
              style={
                styles.instagramIcon
              }
            />
          </TouchableRipple>
        )}

        {twitter && (
          <TouchableRipple
            rippleColor="rgba(223,239,255,0.74)"
            onPress={() =>
              Linking.openURL(
                twitter.url
              )
            }
          >
            <Image
              source={require(
                "../../../assets/img/x2-removebg-preview.png"
              )}
              style={
                styles.icon
              }
            />
          </TouchableRipple>
        )}
      </View>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      marginVertical: 60,

      alignItems:
        "center",
    },

    title: {
      fontSize: 12,

      color: "#000",

      textAlign:
        "center",
    },

    iconsRow: {
      flexDirection:
        "row",

      marginTop: 10,

      gap: 12,
    },

    icon: {
      width: 35,

      height: 35,
    },

    instagramIcon: {
      width: 38,

      height: 35,
    },
  });