import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  Image,
} from "expo-image";

import {
  Church,
} from "../types/onboarding.types";
import React, { useMemo } from "react";

interface Props {
  church: Church;

  onPress: () => void;
}

const getSafeImageUri = (
  logo?: string
) => {
  if (!logo) {
    return "https://via.placeholder.com/68";
  }

  if (
    logo.startsWith(
      "http"
    )
  ) {
    return logo;
  }

  return `https://churchplusv3coreapi.azurewebsites.net${logo}`;
};

const ChurchCard = ({
  church,
  onPress,
}: Props) => {

  const logo = useMemo(
    () =>
        getSafeImageUri(
            church.churchLogo
        ),
    [church.churchLogo]
  );

  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
    >
      <Image
        source={logo}

        style={styles.logo}

        contentFit="contain"

        cachePolicy="memory-disk"

        transition={200}

        placeholder={require("../../../assets/img/logo_ph.jpg")}
      />

      <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={styles.name}
      >
          {church.churchName}
      </Text>
    </Pressable>
  );
}

const styles =
  StyleSheet.create({
    card: {
      backgroundColor:
        "#FFF",

      width: "30%",

      padding: 5,

      borderRadius: 10,

      marginTop: 10,
    },

    logo: {
      width: 75,

      height: 68,

      alignSelf:
        "center",
    },

    name: {
      fontSize: 11,

      textAlign:
        "center",

      marginTop: 3
    },
  });

export default React.memo(ChurchCard);